import {format, formatPrefix} from 'd3-format';
import {utcFormat} from 'd3-time-format';
import {daysToMonths, isYear} from './date';

export const formatNumber = format(',.0f');
export const formatNumber1 = format(',.1f');
export const formatNumber2 = format(',.2f');
export const formatNumber1Nice = format(',.1~f');
export const formatNumber2Nice = format(',.2~f');
export const formatPercent = format(',.0%');
export const formatPercent1 = format(',.1%');
export const formatPercent2 = format(',.2%');

// Includes a non-breaking space between the day and year.
export const formatDate = utcFormat('%B %-d, %Y');
export const formatFixedDate = utcFormat('%b %d, %Y');
export const formatShortDate = utcFormat('%b %-d, %Y');
// Includes a non-breaking space between the month and day.
export const formatCalendarDate = utcFormat('%B %-d');
export const formatShortCalendarDate = utcFormat('%b %-d');
export const formatYear = utcFormat('%Y');
export const formatShortMonth = utcFormat('%b');
export const formatDateAxis = (date) =>
  isYear(date) ? formatYear(date) : formatShortMonth(date);

export const formatMonths = (days) => `${formatNumber(daysToMonths(days))}`;

export const formatNumberM1 = formatPrefix('.1~', 1e6);

export const formatLargeNumber = (value) =>
  value >= 1000000 ? formatNumberM1(value) : formatNumber(value);

export const formatLargeNumberVerbose = (value) =>
  value >= 1000000
    ? `${formatNumber1Nice(value / 1000000)} million`
    : formatNumber(value);

export const formatWhenEmpty = (format, empty) => (value) => {
  if (value) {
    return format(value);
  }
  return typeof empty === 'function' ? empty(value) : empty;
};

export const formatNA = (format) => formatWhenEmpty(format, 'N/A');

export function splitFirstWord(children, edge = 'start') {
  const isStart = edge === 'start';
  if (typeof children !== 'string') {
    return [null, children];
  }
  const index = isStart ? children.indexOf(' ') : children.lastIndexOf(' ');
  if (index === -1) {
    return [null, children];
  }
  const start = children.slice(0, index);
  const end = children.slice(index);
  return isStart ? [start, end] : [end, start];
}
