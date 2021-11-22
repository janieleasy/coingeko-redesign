export const actionTypes = {
  UPDATE_HOME_CRYPTO_SELECT: 'update_home_crypto_select',
};

export function updateHomeCryptoSelect(params, value) {
  return { type: actionTypes.UPDATE_HOME_CRYPTO_SELECT, params, value };
}
