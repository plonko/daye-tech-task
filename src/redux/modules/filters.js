const UPDATE_FILTER_KEYWORD = "products/UPDATE_FILTER_KEYWORD";

const initialState = {
  keyword: []
};

export const productFilterKeywordSelector = state => state.filters.keyword;

export function updateFilterKeyword(keyword) {
  return {
    type: UPDATE_FILTER_KEYWORD,
    payload: {
      keyword
    }
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER_KEYWORD:
      return {
        ...state,
        keyword: action.payload.keyword
      };
    default:
      return state;
  }
}
