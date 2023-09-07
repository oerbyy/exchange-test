const API_PRIVATBANK_CURRENCIES =
  'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

// FIXME: use proxy to bypass CORS error of third-party API
export const API_PRIVATBANK_CURRENCIES_PROXIED = `https://api.allorigins.win/raw?url=${encodeURIComponent(
  API_PRIVATBANK_CURRENCIES
)}`;

export const FAKE_ERROR_PERIOD = 5;
