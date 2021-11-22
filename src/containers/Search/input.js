import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './input.css';

export default function SearchInput({ searchTerm, setSearchTerm }) {
  const [isShow, setIsShow] = useState(true);
  const [placeholder, setPlaceholder] = useState('search');

  const handleCancel = () => {
    setIsShow(false);
    setSearchTerm('');
  };

  return (
    <div className="search-input-container">
      <input
        className="search-inputbox"
        placeholder={placeholder}
        value={searchTerm}
        onClick={() => setIsShow(true)}
        onChange={({ target }) => setSearchTerm(target.value)}
        onFocus={() => setPlaceholder('')}
        onBlur={() => setPlaceholder('search')}
      />
      {isShow && (
        <button className="search-btn" type="button" onClick={handleCancel}>
          cancel
        </button>
      )}
    </div>
  );
}

SearchInput.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
};
