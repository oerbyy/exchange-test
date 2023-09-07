declare interface CurrencyDTO {
  ccy: string;
  base_ccy: string;
  buy: number;
  sale: number;
}

declare interface ExchangeCurrencyDTO {
  currency: string;
  exchangeType: ExchangeType;
}
