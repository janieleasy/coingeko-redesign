import React from 'react';
import CryptoSelect from './crypto_select';
import CryptoList from './crypto_list';

export default function Cryptocurrency() {
  return (
    <>
      <CryptoSelect />
      <CryptoList />
    </>
  );
}
