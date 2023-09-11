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

declare interface SellToBuyRatesDTO {
  [key: string]: CurrencyDTO;
}

declare interface ConvertAvailabilityDTO {
  [key: string]: string[];
}
