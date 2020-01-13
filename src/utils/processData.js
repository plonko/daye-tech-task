import { MALFORMED_TAMPON_KEYS } from "./constants";

export function processMalformedTamponKey(data) {
  return data.map(dataObject => {
    const { price, currency, productImage, id } = dataObject;
    const malformedKey = Object.keys(dataObject).filter(elem =>
      MALFORMED_TAMPON_KEYS.includes(elem)
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

export function processXmlToJson(data) {
  return data.map(dataObject => ({ ...dataObject, price: 0 }));
}

export function addIds(data) {
  return data.map((dataObject, index) => ({ ...dataObject, id: index + 1 }));
}
