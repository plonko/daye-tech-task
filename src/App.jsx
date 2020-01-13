// TODO: Make filter lists from data
// DONE: Clean data before it goes into store
// DONE: Add error catching for unknown buggy data
// TODO: Tests for buggy/clean data
// TODO: Component tests
// DONE: Style products
// TODO: Hook up filters
// DONE: Tidy up propTypes
// DONE: Add ID to product in store, replace index
// DONE: constants file for URL etc
// TODO: Add loading state
// TODO: Use Redux hooks?
// TODO: Make data processing funcs chainable?
// TODO: Delete malformed key instead of copying all properties
// TODO: Error boundaries

import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  getProductsData,
  productsLoadingSelector,
  productsErrorSelector,
  productsSelector,
  productsFilteredByKeyword
} from "./redux/modules/products";
import FilterableProductList from "./components/FilterableProductList";

const App = props => {
  const { getProducts, products, filteredProducts } = props;
  console.log(filteredProducts);
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Fragment>
      <CssBaseline />
      <FilterableProductList products={filteredProducts} />
    </Fragment>
  );
};

App.propTypes = {
  products: FilterableProductList.propTypes.products
};

App.defaultProps = {
  products: []
};

const mapStateToProps = state => ({
  products: productsSelector(state),
  filteredProducts: productsFilteredByKeyword(state),
  isLoading: productsLoadingSelector(state),
  isError: productsErrorSelector(state)
});

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => {
      dispatch(getProductsData());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
