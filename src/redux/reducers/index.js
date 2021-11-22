import { combineReducers } from 'redux';
import { homeCryptoSelect } from './home-crypto-select';
import { currencySwitch } from './currency-switch';

export default combineReducers({ homeCryptoSelect, currencySwitch });
