import toNonExponential from './toNonExponential';

export function fPriceNoDig(num, sym) {
  if (!num) return '?';

  const numString = num.toString();

  if (numString.includes('e')) {
    const nonExponential = toNonExponential(num);
    return `${sym}${nonExponential}`;
  }

  const resultNum = new Intl.NumberFormat(undefined).format(num);

  return `${sym}${resultNum}`;
}

export function fCompactLong(number) {
  if (!number) return '?';
  const options = {
    notation: 'compact',
    compactDisplay: 'long',
    maximumFractionDigits: 1,
  };
  const numFormat = new Intl.NumberFormat(undefined, options).format(number);
  return numFormat;
}
