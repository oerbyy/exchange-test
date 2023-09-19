export function getPercentDifference(a: number, b: number): number {
  const percDiff = 100 * Math.abs((a - b) / ((a + b) / 2));

  return percDiff;
}
