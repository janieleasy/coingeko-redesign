export const actionTypes = {
  SWITCH_CURRENCY: 'switch_currency',
};

export function switchCurrency() {
  return { type: actionTypes.SWITCH_CURRENCY };
}
