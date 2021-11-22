import toNonExponential from './toNonExponential';

export function fPrice(num, sym) {
  if (!num) return;

  const numString = num.toString();

  if (numString.includes('e')) {
    const nonExponential = toNonExponential(num);
    return `${sym}${nonExponential}`;
  }

  if (num >= 1 || num === 0) {
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 };

    const withTwoDigits = new Intl.NumberFormat(undefined, options).format(num);
    return `${sym}${withTwoDigits}`;
  }

  return `${sym}${num}`;
}

export function fPercentage(num) {
  if (!num && num !== 0) return;

  let options;
  if (num >= 100) {
    options = { minimumFractionDigits: 0, maximumFractionDigits: 0 };
  } else {
    options = { minimumFractionDigits: 1, maximumFractionDigits: 1 };
  }

  const withOneDigit = new Intl.NumberFormat(undefined, options).format(num);
  return `${withOneDigit}%`;
}

export function fCompact(num, sym) {
  if (!num) return;

  const options = {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
  };
  const numFormat = new Intl.NumberFormat(undefined, options).format(num);
  return `${sym}${numFormat}`;
}
