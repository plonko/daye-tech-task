import { combineReducers } from "redux";

import products from "./modules/products";

const rootReducer = combineReducers({
  products
});

export default rootReducer;
