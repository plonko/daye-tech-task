const UPDATE_FILTER_KEYWORDS = "products/UPDATE_FILTER_KEYWORDS";

const initialState = {
  keywords: []
};

export const productFilterKeywordSelector = state => state.filters.keywords;

export function updateFilterKeywords(keywords) {
  return {
    type: UPDATE_FILTER_KEYWORDS,
    payload: {
      keywords
    }
  };
}

// Reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FILTER_KEYWORDS:
      return {
        ...state,
        keywords: action.payload.keywords
      };
    default:
      return state;
  }
}
