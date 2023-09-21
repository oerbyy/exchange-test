import {FAKE_ERROR_PERIOD} from '../app/constants';

// On each 5th api request - imitate server error (create counter, store it in
// localStorage). After - reset value in localStortage.
export const isFakeServerError = (): boolean => {
  const resetLsCounter = () => localStorage.setItem(FETCH_COUNTER, '1');

  const FETCH_COUNTER = 'fetch_counter';
  const fetchCount = localStorage.getItem(FETCH_COUNTER);

  if (!fetchCount) {
    resetLsCounter();
    return false;
  }

  if (+fetchCount >= FAKE_ERROR_PERIOD) {
    resetLsCounter();
    return true;
  }

  localStorage.setItem(FETCH_COUNTER, `${+fetchCount + 1}`);
  return false;
};
