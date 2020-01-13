import axios from "axios";
import { createSelector } from "reselect";
import { API_URL } from "../../utils/constants";
import {
  addIds,
  processMalformedTamponKey,
  processXmlToJson
} from "../../utils/processData";
import { productFilterKeywordSelector } from "./filters";

// Actions
const PRODUCTS_DATA_LOADING = "products/PRODUCTS_DATA_LOADING";
const PRODUCTS_DATA_SUCCESS = "products/PRODUCTS_DATA_SUCCESS";
const PRODUCTS_DATA_ERROR = "products/PRODUCTS_DATA_ERROR";

const initialState = {
  loading: false,
  error: null,
  filterKeyword: null,
  products: []
};

export const productsLoadingSelector = state => state.products.loading;
export const productsErrorSelector = state => state.products.error;
export const productsSelector = state => state.products.products;

export const productsFilteredByKeyword = createSelector(
  [productsSelector, productFilterKeywordSelector],
  (products, keyword) => {
    return products.filter(product => {
      return product.tampons.some(tampon => {
        return Object.values(tampon).some(term => {
          return keyword.includes(term);
        });
      });
    });
  }
);

// Action Creators
export function productsDataLoading() {
  return { type: PRODUCTS_DATA_LOADING };
}

export function productsDataSuccess(products) {
  return {
    type: PRODUCTS_DATA_SUCCESS,
    payload: {
      products
    }
  };
}

export function productsDataError(error) {
  return {
    type: PRODUCTS_DATA_ERROR,
    payload: {
      error
    }
  };
}

export function getProductsData() {
  return async dispatch => {
    try {
      dispatch(productsDataLoading());

      const request = await axios({
        method: "get",
        url: `${API_URL}`
      });

      const dataWithIds = addIds(request.data);
      const dataWithCleanKeys = processMalformedTamponKey(dataWithIds);
      const dataWithCleanJson = processXmlToJson(dataWithCleanKeys);

      dispatch(productsDataSuccess(dataWithCleanJson));
    } catch (error) {
      console.error("Response error", error);
      dispatch(productsDataError(true));
    }
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case PRODUCTS_DATA_LOADING:
      return {
        ...state,
        loading: true
      };
    case PRODUCTS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        products: action.payload.products
      };
    case PRODUCTS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      };
    default:
      return state;
  }
}
