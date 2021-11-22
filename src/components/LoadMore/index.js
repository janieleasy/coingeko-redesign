import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export function LoadMore({ children }) {
  return <div className="loadmore-container">{children}</div>;
}

export function Loading() {
  return (
    <div className="loading">
      <span className="line" />
      <span className="line" />
      <span className="line" />
    </div>
  );
}

LoadMore.propTypes = {
  children: PropTypes.any,
};
