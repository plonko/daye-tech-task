import { KNOWN_MALFORMED_TAMPON_KEYS } from "./constants";
var parser = require("fast-xml-parser");

export function processMalformedTamponKey(
  data,
  keyList = KNOWN_MALFORMED_TAMPON_KEYS
) {
  return data.map(dataObject => {
    const { price, currency, productImage, id } = dataObject;
    const malformedKey = Object.keys(dataObject).filter(elem =>
      keyList.includes(elem)
    );
    if (malformedKey.length) {
      const key = malformedKey[0];
      return {
        id,
        tampons: dataObject[key],
        price,
        currency,
        productImage
      };
    } else {
      return dataObject;
    }
  });
}

function isValidDataType(data) {
  return Array.isArray(data);
}

function isValidXML(data) {
  return parser.validate(data);
}

function parseXML(data) {
  const jsonObj = parser.parse(data);
  const { tapons } = jsonObj;
  const { tampon } = tapons;

  if (!Array.isArray(tampon)) {
    return [tampon];
  } else {
    return tampon;
  }
}

function cleanXmlDataValue(data) {
  // var xml = "<root>Hello xml2js!</root>";
  // var strin = "godday";
  // var arr = [{ b: 2 }, { a: 1 }];

  try {
    if (typeof data === "undefined") {
      return null;
    }

    if (isValidDataType(data)) {
      return data;
    } else if (isValidXML(data)) {
      return parseXML(data);
    } else {
      throw new Error("Unknown buggy data in response");
    }
  } catch (error) {
    console.error(error);
  }
}

export function processXmlToJson(data) {
  return data.map(dataObject => {
    const { tampons, ...rest } = dataObject;
    const jsonParsedData = cleanXmlDataValue(tampons);
    const jsonParsedDataWithIds = addIds(jsonParsedData);
    return {
      tampons: jsonParsedDataWithIds,
      ...rest
    };
  });
}

export function addIds(data) {
  return data.map((dataObject, index) => ({ ...dataObject, id: index + 1 }));
}
