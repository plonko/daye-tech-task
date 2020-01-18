import { CURRENCY_SYMBOLS } from "./constants";

export function getCurrencySymbol(countryKey, symbolDict = CURRENCY_SYMBOLS) {
  if (symbolDict[countryKey] === undefined) {
    return symbolDict.GBP;
  }

  return symbolDict[countryKey];
}
