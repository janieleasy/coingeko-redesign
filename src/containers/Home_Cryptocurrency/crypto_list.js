import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Skeleton from '../../components/Skeleton';
import { LoadMore, Loading } from '../../components/LoadMore';

import { fPrice, fPercentage, fCompact } from '../../services/cryptoFormat';

import useFetchApi from '../../hooks/usefetchApi';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

import '../../css/crypto-item.css';
import './crypto_list.css';

export default function HomeCryptoList() {
  const selects = useSelector((state) => state.homeCryptoSelect);
  const currency = useSelector((state) => state.currencySwitch);

  const querys = useMemo(
    () => ({
      currencyquery: currency.query,
      orderquery: selects.order.filter((i) => i.checked)[0].query,
      perpagequery: selects.totalpage.filter((i) => i.checked)[0].query,
      periodquery: selects.timeperiod.filter((i) => i.checked)[0].query,
    }),
    [selects, currency]
  );

  const totalpagenum = selects.totalpage.filter((i) => i.checked)[0].num;

  const [cryptoURL, setCryptoURL] = useState('');
  const [cryptos, setCryptos] = useState([]);
  const [page, setPage] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setCryptos([]);
    setPage(2);
    setHasMore(true);

    const { currencyquery, orderquery, perpagequery, periodquery } = querys;

    setCryptoURL(
      `https://api.coingecko.com/api/v3/coins/markets?${currencyquery}${orderquery}${perpagequery}&page=1&sparkline=false${periodquery}`
    );
  }, [querys]);

  const { data: cryptoList, loadmore } = useFetchApi(cryptoURL);

  useEffect(() => {
    const newCryptoList = cryptoList.filter((i) =>
      cryptos.find((c) => c.id === i.id) ? null : i
    );
    console.log(newCryptoList);
    setCryptos((prev) => [...prev, ...newCryptoList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cryptoList]);

  const load = useCallback(() => {
    if (totalpagenum && page > totalpagenum) {
      setHasMore(false);
      return;
    }

    const { currencyquery, orderquery, perpagequery, periodquery } = querys;

    setCryptoURL(
      `https://api.coingecko.com/api/v3/coins/markets?${currencyquery}${orderquery}${perpagequery}&page=${page}&sparkline=false${periodquery}`
    );

    setPage((prev) => prev + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, totalpagenum]);

  const loadEl = useRef(null);
  const loader = useRef(load);

  useEffect(() => {
    loader.current = load;
  }, [load]);

  useIntersectionObserver({ target: loadEl, onIntersect: loader });

  const currencySym = currency.name === 'usd' ? '$' : '₿';
  const period = selects.timeperiod.filter((i) => i.checked)[0].name;

  return (
    <>
      <CryptoTitle period={period} />
      <div className="home-crypto-list-container">
        {cryptos && cryptos.length === 0
          ? Array(20)
              .fill(0)
              .map((_, idx) => <SkeletonItem key={idx} />)
          : cryptos.map((crypto) => (
              <CryptoItem
                key={crypto.id}
                crypto={crypto}
                currencySym={currencySym}
                period={period}
              />
            ))}
      </div>
      <LoadMore>
        {loadmore && <Loading />}
        {!loadmore && hasMore && <div ref={loadEl} />}
        {!hasMore && <span className="home-crypto-nodata">no more data</span>}
      </LoadMore>
    </>
  );
}

function CryptoTitle({ period }) {
  return (
    <div className="crypto-item-container home-crypto-title home-crypto-item-container">
      <span className="home-crypto-name">name</span>
      <span className="crypto-rank">#</span>
      <span className="crypto-price">price</span>
      <span className="crypto-change">{period}</span>
      <span className="crypto-marketcap">market cap</span>
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className="skeleton-crypto-item-container home-skeleton-item-container">
      <Skeleton width="24px" height="24px" className="skeleton-crypto-img" />
      <Skeleton width="12%" height="24px" />
      <Skeleton width="6%" height="24px" />
      <Skeleton width="22%" height="24px" />
      <Skeleton width="11%" height="24px" />
      <Skeleton width="15%" height="24px" />
    </div>
  );
}

function CryptoItem({ crypto, currencySym, period }) {
  const {
    image,
    symbol,
    market_cap_rank: rank,
    current_price: price,
    market_cap: marketcap,
  } = crypto;

  const periodChange = crypto[`price_change_percentage_${period}_in_currency`];
  const periodChangeSign = Math.sign(periodChange);

  const priceConEl = useRef(null);
  const priceTextEl = useRef(null);

  useEffect(() => {
    const conWidth = priceConEl.current.offsetWidth;
    const textWidth = priceTextEl.current.offsetWidth + 8;

    if (conWidth - textWidth < 0) {
      const scale = Math.floor((conWidth / textWidth) * 14);
      priceTextEl.current.style.fontSize = `${scale}px`;
    }
  }, []);

  return (
    <div className="crypto-item-container home-crypto-item-container">
      <Link to={`/crypto/${crypto.id}`} className="crypto-link">
        <span className="home-crypto-name">
          <img className="crypto-image" src={image} alt="crypto" />
          <span className="crypto-symbol">{symbol}</span>
        </span>
        <span className="crypto-rank">{rank || '-'}</span>
        <span className="crypto-price" ref={priceConEl}>
          <span ref={priceTextEl}>
            {price ? fPrice(price, currencySym) : '-'}
          </span>
        </span>
        <span
          className="crypto-change"
          style={
            periodChange
              ? { color: periodChangeSign === -1 ? '#eb5757' : '#15ce4e' }
              : null
          }
        >
          {periodChange ? fPercentage(periodChange) : '-'}
        </span>
        <span className="crypto-marketcap">
          {marketcap ? fCompact(marketcap, currencySym) : `${currencySym}0.00`}
        </span>
      </Link>
    </div>
  );
}

CryptoTitle.propTypes = {
  period: PropTypes.string.isRequired,
};

CryptoItem.propTypes = {
  crypto: PropTypes.object.isRequired,
  currencySym: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
};
