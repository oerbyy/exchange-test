// import {ExchangeCurrencyDTO, CurrencyDTO} from '../typings/Dto';
import {ExchangeType} from './../app/enums';
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CommonState {
  rates: CurrencyDTO[];
  ratesOriginal: CurrencyDTO[];
  sellCurrency: string;
  buyCurrency: string;
  sellAmount: number;
  buyAmount: number;
}

const initialState: CommonState = {
  rates: [],
  ratesOriginal: [],
  sellCurrency: '',
  buyCurrency: '',
  sellAmount: 0,
  buyAmount: 0,
};

export const commonSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setOriginalRates: (state: CommonState, action: PayloadAction<CurrencyDTO[]>) => {
      state.rates = action.payload;
      state.ratesOriginal = action.payload;
    },

    updateCurrency: (state: CommonState, action: PayloadAction<ExchangeCurrencyDTO>) => {
      const {currency, exchangeType} = action.payload;
      if (exchangeType === ExchangeType.Sell) state.sellCurrency = currency;
      if (exchangeType === ExchangeType.Buy) state.buyCurrency = currency;
    },

    updateAmount: (
      state: CommonState,
      action: PayloadAction<{sellAmount: number; buyAmount: number}>
    ) => {
      const {sellAmount, buyAmount} = action.payload;
      state.sellAmount = sellAmount;
      state.buyAmount = buyAmount;
    },
  },
});

export const {setOriginalRates, updateCurrency, updateAmount} = commonSlice.actions;

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

export const selectSelToBuyRates = createSelector([selectRates], (rates) => {
  console.log('rates', rates);
  if (!rates || rates.length === 0) {
    return {};
  }

  let res = {};
  rates.forEach((el) => {
    const id = `${el.base_ccy}/${el.ccy}`;
    const idReverted = `${el.ccy}/${el.base_ccy}`;

    res = {
      ...res,
      [id]: {
        ...el,
      },
      [idReverted]: {
        buy: 1 / Number(el.sale),
        sale: 1 / Number(el.buy),
        base_ccy: el.ccy,
        ccy: el.base_ccy,
      },
    };
  });

  return res;
});
