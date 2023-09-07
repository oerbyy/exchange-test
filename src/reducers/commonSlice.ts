import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CommonState {
  rates: CurrencyDTO[];
  ratesOriginal: CurrencyDTO[];
}

const initialState: CommonState = {
  rates: [],
  ratesOriginal: [],
};

export const commonSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setOriginalRates: (state: CommonState, action: PayloadAction<CurrencyDTO[]>) => {
      state.rates = action.payload;
      state.ratesOriginal = action.payload;
    },
  },
});

export const {setOriginalRates} = commonSlice.actions;

export default commonSlice.reducer;

// Selectors
const selectRates = (state: {counter: CommonState}) => state.counter.ratesOriginal;

export const selectAvailableCurrencies = createSelector([selectRates], (rates) => {
  if (!rates || rates.length === 0) {
    return [];
  }

  const currencies = new Set<string>();

  rates.forEach((el) => {
    currencies.add(el.base_ccy);
    currencies.add(el.ccy);
  });

  return Array.from(currencies);
});
