import { MALFORMED_TAMPON_KEYS } from "./constants";

export function processMalformedTamponKey(data) {
  return data.map(dataObject => {
    const { price, currency, productImage } = dataObject;
    const malformedKey = Object.keys(dataObject).filter(elem =>
      MALFORMED_TAMPON_KEYS.includes(elem)
    );
    if (malformedKey.length) {
      const key = malformedKey[0];
      return {
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
