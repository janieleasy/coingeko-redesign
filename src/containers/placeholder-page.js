import React from 'react';
import PropTypes from 'prop-types';
import './placeholder-page.css';

export default function PlaceholderPage({ placeholder }) {
  return (
    <div className="placehoder-page-container">
      <h1>{placeholder}</h1>
    </div>
  );
}

PlaceholderPage.propTypes = {
  placeholder: PropTypes.string.isRequired,
};
