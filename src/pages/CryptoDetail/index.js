import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Close } from '../../icons';

import { Nav } from '../../components/Nav';
import { Tab } from '../../components/Tab';
import Skeleton from '../../components/Skeleton';

import ErrorBoundary from '../../services/errorBoundary';

import PriceChart from '../../containers/CryptoDetail_Price';
import PlaceholderPage from '../../containers/placeholder-page';

import useFetchApi from '../../hooks/usefetchApi';

import '../../css/crypto-item.css';
import './index.css';

export default function Coin() {
  const { cryptoId } = useParams();
  const history = useHistory();

  const currency = useSelector((state) => state.currencySwitch);
  const currencyName = currency.name;

  const [crypto, setCrypto] = useState(null);

  const { data: cryptoData } = useFetchApi(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyName}&ids=${cryptoId}&price_change_percentage=1h%2C24h%2C7d%2C30d%2C200d%2C1y%2Call`
  );

  useEffect(() => {
    setCrypto(cryptoData[0]);
  }, [cryptoData]);

  return (
    <>
      <header>
        <Nav>
          <Nav.Item className="left detail-nav-item">
            {crypto ? <CryptoItem crypto={crypto} /> : <SkeletonItem />}
          </Nav.Item>
          <Nav.Item className="right">
            <button type="button" onClick={() => history.goBack()}>
              <Close />
            </button>
          </Nav.Item>
        </Nav>
      </header>
      <main>
        <ErrorBoundary>
          <Tab>
            <Tab.Pane name="price chart">
              {crypto ? (
                <PriceChart crypto={crypto} />
              ) : (
                <Skeleton width="100%" height="calc(100vh - 113px)" />
              )}
            </Tab.Pane>
            <Tab.Pane name="exchanges">
              <PlaceholderPage placeholder="exchanges" />
            </Tab.Pane>
            <Tab.Pane name="porfolio">
              <PlaceholderPage placeholder="porfolio" />
            </Tab.Pane>
            <Tab.Pane name="info">
              <PlaceholderPage placeholder="info" />
            </Tab.Pane>
          </Tab>
        </ErrorBoundary>
      </main>
    </>
  );
}

function SkeletonItem() {
  return (
    <div className="skeleton-crypto-item-container">
      <Skeleton width="24px" height="24px" className="skeleton-crypto-img" />
      <Skeleton width="36%" height="24px" />
    </div>
  );
}

function CryptoItem({ crypto }) {
  const { image, symbol, name } = crypto;
  return (
    <>
      <img className="crypto-image" src={image} alt="crypto" />
      <span className="crypto-symbol">{symbol}</span>
      <span className="crypto-name">{name}</span>
    </>
  );
}

CryptoItem.propTypes = {
  crypto: PropTypes.object.isRequired,
};
