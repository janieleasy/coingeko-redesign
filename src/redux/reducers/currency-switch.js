import { actionTypes } from '../actions/currency-switch';

const storage = JSON.parse(localStorage.getItem('currency'));

let initialSate;

if (storage) {
  initialSate = storage;
} else {
  initialSate = { name: 'usd', query: 'vs_currency=usd' };
  localStorage.setItem('currency', JSON.stringify(initialSate));
}

// eslint-disable-next-line import/prefer-default-export
export function currencySwitch(state = initialSate, action) {
  let currencyObj;
  switch (action.type) {
    case actionTypes.SWITCH_CURRENCY:
      if (state.name === 'usd') {
        currencyObj = { name: 'btc', query: 'vs_currency=btc' };
        localStorage.setItem('currency', JSON.stringify(currencyObj));
        return currencyObj;
      }

      currencyObj = { name: 'usd', query: 'vs_currency=usd' };
      localStorage.setItem('currency', JSON.stringify(currencyObj));
      return currencyObj;

    default:
      return state;
  }
}
