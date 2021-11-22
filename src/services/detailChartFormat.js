function toAroundTime(time, min) {
  return Math.round(time / (60000 * min)) * 60000 * min;
}

export function fTickName(time, period) {
  if (period === '1h') {
    const min = 10;
    const newTime = toAroundTime(time, min);
    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    return new Date(newTime).toLocaleString(undefined, options);
  }
  if (period === '24h') {
    const min = 60;
    const newTime = toAroundTime(time, min);
    const options = { hour: 'numeric', minute: 'numeric', hour12: false };
    return new Date(newTime).toLocaleString(undefined, options);
  }
  if (period === '7d') {
    const min = 60 * 24;
    const newTime = toAroundTime(time, min);
    const options = { month: 'short', day: 'numeric' };
    return new Date(newTime).toLocaleString(undefined, options);
  }
  if (period === '1m') {
    const min = 60 * 24 * 2;
    const newTime = toAroundTime(time, min);
    const options = { month: 'short', day: 'numeric' };
    return new Date(newTime).toLocaleString(undefined, options);
  }
  if (period === '6m') {
    const min = 60 * 24 * 14;
    const newTime = toAroundTime(time, min);
    const options = { month: 'short', day: 'numeric' };
    return new Date(newTime).toLocaleString(undefined, options);
  }
  if (period === '1y') {
    const min = 60 * 24 * 30;
    const newTime = toAroundTime(time, min);
    const options = { month: 'short', day: 'numeric' };
    return new Date(newTime).toLocaleString(undefined, options);
  }
  if (period === 'max') {
    const min = 60 * 24 * 365;
    const newTime = toAroundTime(time, min);
    const options = { year: 'numeric' };
    return new Date(newTime).toLocaleString(undefined, options);
  }
}

export function fTooltipDate(number) {
  if (!number) return;

  const date = new Date(number);

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  };
  return new Intl.DateTimeFormat(undefined, options).format(date);
}
