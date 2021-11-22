import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Skeleton from '../../components/Skeleton';

import '../../css/crypto-item.css';
import './results.css';

export default function SearchResults({ name, cryptos, num, button }) {
  const handleClear = () => {
    button([]);
  };

  return (
    <>
      <div className="search-crypto-list-header">
        <span className="list-title">{name}</span>
        {button && (
          <button className="clear-btn" type="button" onClick={handleClear}>
            clear
          </button>
        )}
      </div>
      <div className="search-crypto-list-body">
        {cryptos && cryptos.length === 0
          ? Array(num)
              .fill(0)
              .map((_, idx) => <SkeletonItem key={idx} />)
          : cryptos?.map((crypto) => (
              <CryptoItem key={crypto.id} crypto={crypto} />
            ))}
      </div>
    </>
  );
}

function SkeletonItem() {
  return (
    <div className="skeleton-crypto-item-container">
      <Skeleton width="24px" height="24px" className="skeleton-crypto-img" />
      <Skeleton width="32%" height="24px" />
      <Skeleton width="10%" height="24px" className="search-skeleton-right" />
    </div>
  );
}

function CryptoItem({ crypto }) {
  const handleStorage = (crypto) => {
    const storage = JSON.parse(localStorage.getItem('search-history'));

    const filterStorage = storage.filter((item) => item.id !== crypto.id);
    const newStorage = [...filterStorage, crypto];

    if (newStorage.length > 3) {
      newStorage.shift();
    }

    localStorage.setItem('search-history', JSON.stringify(newStorage));
  };

  return (
    <div className="crypto-item-container search-crypto-item-container">
      <Link
        className="crypto-link"
        to={`/crypto/${crypto.id}`}
        onClick={() => handleStorage(crypto)}
      >
        <img
          className="crypto-image"
          src={crypto.small ? crypto.small : crypto.image}
          alt="crypto"
        />
        <span className="crypto-symbol">{crypto.symbol}</span>
        <span className="crypto-name">{crypto.name}</span>
        {crypto.market_cap_rank && (
          <span className="crypto-rank">#{crypto.market_cap_rank}</span>
        )}
      </Link>
    </div>
  );
}

SearchResults.propTypes = {
  name: PropTypes.string.isRequired,
  cryptos: PropTypes.array,
  num: PropTypes.number,
  button: PropTypes.func,
};

CryptoItem.propTypes = {
  crypto: PropTypes.object.isRequired,
};
