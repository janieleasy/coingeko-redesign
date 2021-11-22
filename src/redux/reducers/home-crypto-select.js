import { actionTypes } from '../actions/home-crypto-select';
import CryptoSelectData from '../../fixture/crypto-select-data.json';

const initialSate = CryptoSelectData;

// eslint-disable-next-line import/prefer-default-export
export function homeCryptoSelect(state = initialSate, action) {
  const { type, params, value } = action;

  switch (type) {
    case actionTypes.UPDATE_HOME_CRYPTO_SELECT:
      return {
        ...state,
        [params]: state[params].map((i) =>
          i.name === value ? { ...i, checked: true } : { ...i, checked: false }
        ),
      };
    default:
      return state;
  }
}
