import { getCurrencySymbol } from "./getCurrencySymbol";

describe("getCurrencySymbol", () => {
  test("Should return £ by default", () => {
    const actual = getCurrencySymbol();
    const expected = "£";

    expect(actual).toEqual(expected);
  });

  test("Should return $ when passed 'USD'", () => {
    const actual = getCurrencySymbol("USD");
    const expected = "$";

    expect(actual).toEqual(expected);
  });
});
