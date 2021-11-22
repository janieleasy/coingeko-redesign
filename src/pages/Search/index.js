import React, { useState, useEffect, useMemo } from 'react';

import { Nav } from '../../components/Nav';
import { Back } from '../../icons';

import SearchInput from '../../containers/Search/input';
import SearchResults from '../../containers/Search/results';

import useFetchApi from '../../hooks/usefetchApi';
import coinsData from '../../fixture/coins-list.json';
import './index.css';

export default function Search() {
  // search results
  const [searchTerm, setSearchTerm] = useState('');
  const [searchURL, setSearchURL] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [noResult, setNoResult] = useState(false);

  const filteredData = useMemo(() => {
    if (!searchTerm) return;

    return coinsData.filter(
      (i) =>
        !Object.values(i.symbol)
          .join('')
          .toLowerCase()
          .indexOf(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  useEffect(() => {
    console.log(filteredData);

    if (!filteredData) return;

    let temp = [];

    filteredData.forEach((i) => {
      const { id } = i;
      temp = [...temp, id];
    });

    const ids = temp.join(',');

    if (!ids) {
      setNoResult(true);
      return;
    }

    setNoResult(false);
    setSearchURL(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&per_page=250&page=1&sparkline=false`
    );
  }, [filteredData]);

  const { data: resultList } = useFetchApi(searchURL);

  useEffect(() => {
    resultList.sort((a, b) => a.market_cap_rank - b.market_cap_rank);

    setSearchResult(resultList.slice(0, 20));
  }, [resultList]);

  // history results
  const [history, setHistory] = useState(null);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('search-history'));

    if (storage) {
      setHistory(storage);
    } else {
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('search-history', JSON.stringify(history));
  }, [history]);

  // trending results
  const [trending, setTrending] = useState([]);

  const { data: trendingList } = useFetchApi(
    `https://api.coingecko.com/api/v3/search/trending`
  );

  useEffect(() => {
    if (!trendingList) return;

    let temp = [];

    const { coins } = trendingList;
    coins?.forEach(({ item }) => {
      temp = [...temp, { ...item }];
    });

    setTrending(temp);
  }, [trendingList]);

  return (
    <>
      <header>
        <Nav>
          <Nav.Item className="left">
            <Nav.Link to="/home" icon={<Back />} />
          </Nav.Item>
          <Nav.Item className="mid search-nav-item">Search</Nav.Item>
        </Nav>
      </header>
      <main>
        <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div className="search-crypto-list-container">
          {searchTerm &&
            (noResult ? (
              <p className="search-crypto-noresult">no results</p>
            ) : (
              <SearchResults name="coins" cryptos={searchResult} num={20} />
            ))}

          {!searchTerm && (
            <SearchResults name="trending" cryptos={trending} num={7} />
          )}

          {!searchTerm && history?.length !== 0 && (
            <SearchResults
              name="recent searches"
              cryptos={history}
              button={setHistory}
            />
          )}
        </div>
      </main>
    </>
  );
}
