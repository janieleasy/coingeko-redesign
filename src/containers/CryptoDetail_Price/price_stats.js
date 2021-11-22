import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { fPrice } from '../../services/cryptoFormat';
import { fPriceNoDig, fCompactLong } from '../../services/detailStatsFormat';
import './price_stats.css';

export default function CryptoStats({
  market_cap_rank: marketCapRank,
  market_cap: marketCap,
  fully_diluted_valuation: fullyDilutedValuation,
  total_volume: totalVolume,
  high_24h: high24h,
  low_24h: low24h,
  circulating_supply: circulatingSupply,
  total_supply: totalSupply,
  ath,
  ath_change_percentage: athChangePercentage,
  ath_date: athDate,
  atl,
  atl_change_percentage: atlChangePercentage,
  atl_date: atlDate,
}) {
  const currency = useSelector((state) => state.currencySwitch);
  const currencySym = currency.name === 'usd' ? '$' : '₿';

  const cryptoStatsList = [
    { title: 'market cap rank', value: marketCapRank },
    { title: 'market cap', value: fPriceNoDig(marketCap, currencySym) },
    {
      title: 'full diluted valuation',
      value: fPriceNoDig(fullyDilutedValuation, currencySym),
    },
    { title: 'trading volume', value: fPriceNoDig(totalVolume, currencySym) },
    { title: '24h high', value: fPrice(high24h, currencySym) },
    { title: '24h low', value: fPrice(low24h, currencySym) },
    { title: 'available supply', value: fCompactLong(circulatingSupply) },
    { title: 'total supply', value: fCompactLong(totalSupply) },
    { title: 'all-time high', value: fPrice(ath, currencySym) },
    { title: 'since all-time high', value: `${athChangePercentage}%` },
    { title: 'all-time high date', value: athDate.substr(0, 10) },
    { title: 'all-time low', value: fPrice(atl, currencySym) },
    { title: 'since all-time low', value: `${atlChangePercentage}%` },
    { title: 'all-time low date', value: atlDate.substr(0, 10) },
  ];

  return (
    <div className="detail-crypto-stats-list-container">
      {cryptoStatsList.map(({ title, value }, idx) => (
        <div key={idx} className="detail-crypto-stats-item">
          <span className="detail-crypto-stats-name">{title}</span>
          <span className="detail-crypto-stats-value">{value || '?'}</span>
        </div>
      ))}
    </div>
  );
}

CryptoStats.propTypes = {
  market_cap_rank: PropTypes.number,
  market_cap: PropTypes.number,
  fully_diluted_valuation: PropTypes.number,
  total_volume: PropTypes.number,
  high_24h: PropTypes.number,
  low_24h: PropTypes.number,
  circulating_supply: PropTypes.number,
  total_supply: PropTypes.number,
  ath: PropTypes.number,
  ath_change_percentage: PropTypes.number,
  ath_date: PropTypes.string,
  atl: PropTypes.number,
  atl_change_percentage: PropTypes.number,
  atl_date: PropTypes.string,
};
