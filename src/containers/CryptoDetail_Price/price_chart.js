import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PeriodContext } from '../../context/detail-price';

import Skeleton from '../../components/Skeleton';

import useFetchApi from '../../hooks/usefetchApi';
import { fTickName, fTooltipDate } from '../../services/detailChartFormat';
import { fPrice } from '../../services/cryptoFormat';
import './price_chart.css';

export default function Chart() {
  const { timePeriod } = useContext(PeriodContext);

  const currency = useSelector((state) => state.currencySwitch);
  const currencySym = currency.name === 'usd' ? '$' : '₿';

  const { cryptoId } = useParams();

  const [chartURL, setChartURL] = useState('');
  const [prices, setPrices] = useState([]);

  const { data: chartList } = useFetchApi(chartURL);

  useEffect(() => {
    if (!timePeriod) return;

    const { param, query } = timePeriod;
    const { name } = currency;

    setChartURL(
      `https://api.coingecko.com/api/v3/coins/${cryptoId}${param}?vs_currency=${name}${query}`
    );
  }, [timePeriod, currency, cryptoId]);

  useEffect(() => {
    if (!timePeriod) return;

    const { period } = timePeriod;

    let temp = [];
    chartList?.prices?.forEach((i) => {
      const time = i[0];
      const value = i[1];
      const name = fTickName(time, period);

      temp = [...temp, { name, time, value }];
    });

    setPrices(temp);
  }, [chartList, timePeriod]);

  if (prices.length === 0) {
    return (
      <div className="detail-chart-container">
        <Skeleton width="100%" height="230px" />
      </div>
    );
  }

  return (
    <div className="detail-chart-container">
      <ResponsiveContainer width="100%" height={230}>
        <AreaChart data={prices}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15ce4e" stopOpacity={0.4} />
              <stop offset="85%" stopColor="#15ce4e" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            dataKey="value"
            stroke="#15ce4e"
            fill="url(#color)"
            activeDot={{ stoke: 'var(--bg-color)', strokeWidth: 2, r: 5 }}
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={<CustomizeAxisTick />}
          />
          <YAxis
            dataKey="value"
            axisLine={false}
            tickLine={false}
            mirror
            tick={{ fontSize: '12px' }}
            tickCount={4}
            type="number"
            domain={['auto', 'auto']}
            tickFormatter={(number) => fPrice(number, currencySym)}
            padding={{ top: 24, bottom: 24 }}
          />
          <Tooltip
            content={<CustomizeToolTip />}
            cursor={{ stroke: 'var(--theme-color)', strokeDasharray: '5' }}
          />
          <CartesianGrid opacity={0.5} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

function CustomizeAxisTick({ x, y, payload }) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize="10px">
      {payload.value}
    </text>
  );
}

function CustomizeToolTip({ active, payload }) {
  const currency = useSelector((state) => state.currencySwitch);
  const currencySym = currency.name === 'usd' ? '$' : '₿';

  if (active && payload && payload.length) {
    const tooltipTime = payload[0]?.payload?.time;
    const tooltipValue = payload[0]?.payload?.value;

    return (
      <div className="detail-tooltip-container">
        <span className="detail-tooltip-current-price">
          {fPrice(tooltipValue, currencySym)}
        </span>
        <span className="detail-tooltip-current-time">
          {fTooltipDate(tooltipTime)}
        </span>
      </div>
    );
  }
  return null;
}

CustomizeAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object,
};

CustomizeToolTip.propTypes = {
  active: PropTypes.any,
  payload: PropTypes.any,
};
