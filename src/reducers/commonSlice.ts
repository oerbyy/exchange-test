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

      // TODO: add recalculations on amounts instead of reset
      state.buyAmount = 0;
      state.sellAmount = 0;
    },

    swapCurrencies: (
      state: CommonState,
      action: PayloadAction<{sellCurrency: string; buyCurrency: string}>
    ) => {
      const {sellCurrency, buyCurrency} = action.payload;
      state.sellCurrency = buyCurrency;
      state.buyCurrency = sellCurrency;
    },

    updateAmount: (
      state: CommonState,
      action: PayloadAction<{sellAmount: number; buyAmount: number}>
    ) => {
      const {sellAmount, buyAmount} = action.payload;
      state.sellAmount = sellAmount;
      state.buyAmount = buyAmount;
    },

    updateRate: (
      state: CommonState,
      action: PayloadAction<{exchangeType: ExchangeType; rateLabel: string; rateValue: number}>
    ) => {
      const {exchangeType, rateLabel, rateValue} = action.payload;
      const [base_ccy, ccy] = rateLabel.split('/');

      const updatedRates = state.rates.map((rate) => {
        const updatedRate = {...rate};

        if (rate.base_ccy === base_ccy && rate.ccy === ccy) {
          if (exchangeType === ExchangeType.Buy) updatedRate.buy = rateValue;
          if (exchangeType === ExchangeType.Sell) updatedRate.sale = rateValue;
        }

        return updatedRate;
      });

      state.rates = updatedRates;
    },
  },
});

export const {setOriginalRates, updateCurrency, swapCurrencies, updateAmount, updateRate} =
  commonSlice.actions;

export default commonSlice.reducer;

// Selectors
const selectRates = (state: {counter: CommonState}) => state.counter.rates;

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

export const selectSellToBuyRates = createSelector([selectRates], (rates) => {
  if (!rates || rates.length === 0) {
    return {};
  }

  let res: SellToBuyRatesDTO = {};

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

export const selectConvertAvailability = createSelector(
  [selectSellToBuyRates],
  (rates: SellToBuyRatesDTO) => {
    if (!rates || Object.keys(rates).length === 0) {
      return {};
    }

    let res: ConvertAvailabilityDTO = {};

    Object.keys(rates).forEach((el) => {
      const [from, to] = el.split('/');

      if (!res[from]) res[from] = [];

      res[from].push(to);
    });

    return res;
  }
);
