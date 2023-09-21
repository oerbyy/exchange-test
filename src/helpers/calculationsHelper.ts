import {EditableCellProps} from '../components/EditableCell';
import {RATE_PERCENT_LIMIT} from './../app/constants';
import {ExchangeType} from './../app/enums';

export function getPercentDifference(a: number, b: number): number {
  const percDiff = 100 * Math.abs((a - b) / ((a + b) / 2));

  return percDiff;
}

export function getBuyAmount(sellAmount: number, sellRate: number): number {
  return sellAmount / sellRate;
}

export function getSellAmount(buyAmount: number, sellRate: number): number {
  return buyAmount * sellRate;
}

export function isRateWithinLimits(
  {exchangeType, rateValue, rateLabel}: EditableCellProps,
  ratesOriginal: CurrencyDTO[]
): boolean {
  const [base_ccy, ccy] = rateLabel.split('/');
  const originalRate = ratesOriginal.find((rate) => rate.base_ccy === base_ccy && rate.ccy === ccy);
  console.log('originalRate', originalRate);

  if (!originalRate) return false;

  const rateOriginalValue =
    exchangeType === ExchangeType.Buy ? originalRate.buy : originalRate.sale;

  const difference = getPercentDifference(rateOriginalValue, rateValue);
  console.log("rateOriginalValue, rateValue", rateOriginalValue, rateValue)
  console.log('difference', difference);

  return difference <= RATE_PERCENT_LIMIT;
}
