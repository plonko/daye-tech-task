import { KNOWN_MALFORMED_TAMPON_KEYS } from "./constants";
import { processMalformedTamponKey } from "./processData";

const testString = "test";

describe("processMalformedTamponKey", () => {
  test("Should replace known malformed keys with the correct keys", () => {
    const dataWithKnownMalformedKey = [
      {
        price: null,
        tapons: [
          {
            amount: null
          }
        ]
      }
    ];
    const expected = [
      {
        price: null,
        tampons: [
          {
            amount: null
          }
        ]
      }
    ];
    const actual = processMalformedTamponKey(
      dataWithKnownMalformedKey,
      KNOWN_MALFORMED_TAMPON_KEYS
    );
    expect(actual).toMatchObject(expected);
  });

  test("Should not replace correct keys", () => {
    const dataWithCorrectKey = [
      {
        price: null,
        tampons: [
          {
            amount: null
          }
        ]
      }
    ];
    const expected = [
      {
        price: null,
        tampons: [
          {
            amount: null
          }
        ]
      }
    ];
    const actual = processMalformedTamponKey(
      dataWithCorrectKey,
      KNOWN_MALFORMED_TAMPON_KEYS
    );
    expect(actual).toMatchObject(expected);
  });
});
