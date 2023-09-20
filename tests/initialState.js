export const initialState = {
  counter: {
    rates: [
      {
        ccy: 'EUR',
        base_ccy: 'UAH',
        buy: '40.50000',
        sale: '41.50000',
      },
      {
        ccy: 'USD',
        base_ccy: 'UAH',
        buy: '37.50000',
        sale: '38.10000',
      },
    ],
    ratesOriginal: [
      {
        ccy: 'EUR',
        base_ccy: 'UAH',
        buy: '40.50000',
        sale: '41.50000',
      },
      {
        ccy: 'USD',
        base_ccy: 'UAH',
        buy: '37.50000',
        sale: '38.10000',
      },
    ],
    sellCurrency: 'UAH',
    buyCurrency: 'EUR',
    sellAmount: 0,
    buyAmount: 0,
  },
};
