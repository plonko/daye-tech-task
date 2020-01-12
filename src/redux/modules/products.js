import axios from "axios";

// Actions
const PRODUCTS_DATA_LOADING = "products/PRODUCTS_DATA_LOADING";
const PRODUCTS_DATA_SUCCESS = "products/PRODUCTS_DATA_SUCCESS";
const PRODUCTS_DATA_ERROR = "products/PRODUCTS_DATA_ERROR";

const initialState = {
  loading: false,
  error: null,
  products: []
};

export const productsLoadingSelector = state => state.products.loading;
export const productsErrorSelector = state => state.products.error;
export const productsSelector = state => state.products.products;

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
// const errorUrl = "https://github.com/axios/axiosss";
const url = "https://front-end-test-bvhzjr6b6a-uc.a.run.app";

export function getProductsData(hotelCode) {
  return async dispatch => {
    try {
      dispatch(productsDataLoading());

      const request = await axios({
        method: "get",
        url: `${url}`
      });

      dispatch(productsDataSuccess(request.data));
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
