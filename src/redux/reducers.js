import { combineReducers } from "redux";

import products from "./modules/products";
import filters from "./modules/filters";

const rootReducer = combineReducers({
  products,
  filters
});

export default rootReducer;
