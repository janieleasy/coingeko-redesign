import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { fPrice, fPercentage } from '../../services/cryptoFormat';
import './price_currentprice.css';

export default function CurrentPrice({
  current_price: currentPrice,
  price_change_percentage_24h: priceChangePercentage24h,
}) {
  const currency = useSelector((state) => state.currencySwitch);
  const currencySym = currency.name === 'usd' ? '$' : '₿';

  const sign = Math.sign(priceChangePercentage24h);

  return (
    <div className="detail-current-price-container">
      <span
        className="detail-current-price"
        style={{ color: currentPrice || 'var(--text-secondary)' }}
      >
        {currentPrice ? fPrice(currentPrice, currencySym) : `${currencySym} --`}
      </span>
      <span
        className="detail-price-change-percentage"
        style={
          priceChangePercentage24h
            ? { color: sign === -1 ? '#eb5757' : '#15ce4e' }
            : null
        }
      >
        {priceChangePercentage24h
          ? fPercentage(priceChangePercentage24h)
          : null}
      </span>
    </div>
  );
}

CurrentPrice.propTypes = {
  current_price: PropTypes.number,
  price_change_percentage_24h: PropTypes.number,
};
