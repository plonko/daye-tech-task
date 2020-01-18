import { KNOWN_MALFORMED_TAMPON_KEYS } from "./constants";
import {
  processMalformedTamponKey,
  addIds,
  processXmlToJson
} from "./processData";

describe("addIds", () => {
  test("Should add 1-indexed IDs", () => {
    const dataWithoutKeys = [
      {
        price: null
      },
      {
        price: null
      }
    ];
    const expected = [
      {
        id: 1,
        price: null
      },
      {
        id: 2,
        price: null
      }
    ];
    const actual = addIds(dataWithoutKeys);

    expect(actual).toEqual(expect.objectContaining(expected));
  });
});

describe("processMalformedTamponKey", () => {
  test("Should replace known malformed keys with the correct keys", () => {
    const dataWithKnownMalformedKey = [
      {
        price: null,
        tapons: [{ amount: null }]
      }
    ];
    const expected = [
      {
        price: null,
        tampons: [{ amount: null }]
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
        tampons: [{ amount: null }]
      }
    ];
    const expected = [
      {
        price: null,
        tampons: [{ amount: null }]
      }
    ];
    const actual = processMalformedTamponKey(
      dataWithCorrectKey,
      KNOWN_MALFORMED_TAMPON_KEYS
    );

    expect(actual).toMatchObject(expected);
  });
});

describe("processXmlToJson", () => {
  test("Should transform XML tampon data to JSON", () => {
    const dataWithXML = [
      {
        price: null,
        tampons:
          "<tapons><tampon><size>small</size><coating>none</coating><amount>12</amount></tampon></tapons>"
      }
    ];
    const expected = [
      {
        tampons: [{ size: "small", coating: "none", amount: 12, id: 1 }],
        price: null
      }
    ];
    const actual = processXmlToJson(dataWithXML);

    expect(actual).toMatchObject(expected);
  });

  test("Should transform XML tampon array data to JSON", () => {
    const dataWithXMLArray = [
      {
        price: null,
        tampons:
          "<tapons><tampon><size>regular</size><coating>none</coating><amount>10</amount></tampon><tampon><size>regular</size><coating>CBD</coating><amount>2</amount></tampon></tapons>"
      }
    ];
    const expected = [
      {
        tampons: [
          { size: "regular", coating: "none", amount: 10, id: 1 },
          { size: "regular", coating: "CBD", amount: 2, id: 2 }
        ],
        price: null
      }
    ];
    const actual = processXmlToJson(dataWithXMLArray);

    expect(actual).toMatchObject(expected);
  });

  test("Should not transform tampon data already in JSON", () => {
    const expected = [
      {
        price: null,
        tampons: [
          {
            size: "small",
            coating: "none",
            amount: 8
          },
          {
            size: "small",
            coating: "CBD",
            amount: 4
          }
        ]
      }
    ];
    const actual = processXmlToJson(expected);

    expect(actual).toMatchObject(expected);
  });
});
