import { CURRENCY_SYMBOLS } from "./constants";

export function getCurrencySymbol(countryKey) {
  if (CURRENCY_SYMBOLS[countryKey] === undefined) {
    return CURRENCY_SYMBOLS.GBP;
  }

  return CURRENCY_SYMBOLS[countryKey];
}
