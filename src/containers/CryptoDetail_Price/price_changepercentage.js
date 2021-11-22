import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { PeriodContext } from '../../context/detail-price';
import { fPercentage } from '../../services/cryptoFormat';
import './price_changepercentage.css';

export default function PriceChangePercentage({
  price_change_percentage_1h_in_currency: priceChangePercentage1hInCurrency,
  price_change_percentage_24h_in_currency: priceChangePercentage24hInCurrency,
  price_change_percentage_7d_in_currency: priceChangePercentage7dInCurrency,
  price_change_percentage_30d_in_currency: priceChangePercentage30dInCurrency,
  price_change_percentage_200d_in_currency: priceChangePercentage200dInCurrency,
  price_change_percentage_1y_in_currency: priceChangePercentage1yInCurrency,
  atl_change_percentage: atlChangePercentage,
}) {
  const { setTimePeriod } = useContext(PeriodContext);

  const to = Math.floor(Date.now() / 1000);
  const from = Math.floor((Date.now() - 3600000) / 1000);

  const priceChangePercentageList = [
    {
      period: '1h',
      change: fPercentage(priceChangePercentage1hInCurrency),
      sign: Math.sign(priceChangePercentage1hInCurrency),
      param: '/market_chart/range',
      query: `&from=${from}&to=${to}`,
      checked: false,
    },
    {
      period: '24h',
      change: fPercentage(priceChangePercentage24hInCurrency),
      sign: Math.sign(priceChangePercentage24hInCurrency),
      param: '/market_chart',
      query: '&days=1',
      checked: true,
    },
    {
      period: '7d',
      change: fPercentage(priceChangePercentage7dInCurrency),
      sign: Math.sign(priceChangePercentage7dInCurrency),
      param: '/market_chart',
      query: '&days=7',
      checked: false,
    },
    {
      period: '1m',
      change: fPercentage(priceChangePercentage30dInCurrency),
      sign: Math.sign(priceChangePercentage30dInCurrency),
      param: '/market_chart',
      query: '&days=30&interval=daily',
      checked: false,
    },
    {
      period: '6m',
      change: fPercentage(priceChangePercentage200dInCurrency),
      sign: Math.sign(priceChangePercentage200dInCurrency),
      param: '/market_chart',
      query: '&days=200&interval=daily',
      checked: false,
    },
    {
      period: '1y',
      change: fPercentage(priceChangePercentage1yInCurrency),
      sign: Math.sign(priceChangePercentage1yInCurrency),
      param: '/market_chart',
      query: '&days=365&interval=daily',
      checked: false,
    },
    {
      period: 'max',
      change: fPercentage(atlChangePercentage),
      sign: Math.sign(atlChangePercentage),
      param: '/market_chart',
      query: '&days=max&interval=daily',
      checked: false,
    },
  ];
  console.log(priceChangePercentageList);

  const [periodList, setPeriodList] = useState([]);

  useEffect(() => {
    setPeriodList(priceChangePercentageList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const [selected] = periodList.filter((i) => i.checked);
    setTimePeriod(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [periodList]);

  const handleChange = (event) => {
    const { value } = event.target;
    const newperiodList = periodList.map((i) =>
      i.period === value ? { ...i, checked: true } : { ...i, checked: false }
    );
    setPeriodList(newperiodList);
  };

  return (
    <div className="detail-price-change-percentage-container">
      {periodList.map(({ period, change, sign, checked }) => (
        <div key={period} className="detail-pcp-item">
          <input
            type="radio"
            id={period}
            value={period}
            checked={checked}
            onChange={handleChange}
            className="detail-pcp-input"
          />
          <label className="detail-pcp-label" htmlFor={period}>
            {period}
          </label>
          <span
            className="detail-pcp-change"
            style={
              change ? { color: sign === -1 ? '#eb5757' : '#15ce4e' } : null
            }
          >
            {change || '-'}
          </span>
        </div>
      ))}
    </div>
  );
}

PriceChangePercentage.propTypes = {
  price_change_percentage_1h_in_currency: PropTypes.number,
  price_change_percentage_24h_in_currency: PropTypes.number,
  price_change_percentage_7d_in_currency: PropTypes.number,
  price_change_percentage_30d_in_currency: PropTypes.number,
  price_change_percentage_200d_in_currency: PropTypes.number,
  price_change_percentage_1y_in_currency: PropTypes.number,
  atl_change_percentage: PropTypes.number,
};
