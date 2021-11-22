import React, { useState } from 'react';

import PropTypes from 'prop-types';

import CurrentPrice from './price_currentprice';
import Chart from './price_chart';
import PriceChangePercentage from './price_changepercentage';
import CryptoStats from './price_stats';
import PurchaseBtn from './price_purchasebtn';

import { PeriodContext } from '../../context/detail-price';

export default function PriceChart({ crypto }) {
  const [timePeriod, setTimePeriod] = useState(null);

  return (
    <>
      <CurrentPrice {...crypto} />

      <PeriodContext.Provider value={{ timePeriod, setTimePeriod }}>
        <Chart />
        <PriceChangePercentage {...crypto} />
      </PeriodContext.Provider>

      <CryptoStats {...crypto} />
      <PurchaseBtn />
    </>
  );
}

PriceChart.propTypes = {
  crypto: PropTypes.object.isRequired,
};
