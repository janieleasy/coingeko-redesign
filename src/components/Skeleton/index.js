import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

export default function Skeleton({ width, height, className }) {
  return (
    <div
      className={className ? `skeleton-item ${className}` : 'skeleton-item'}
      style={{ width, height }}
    />
  );
}

Skeleton.propTypes = {
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  className: PropTypes.any,
};
