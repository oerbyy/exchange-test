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
