// TODO: Make filter lists from data
// TODO: Clean data before it goes into store
// TODO: Add error catching for unknown buggy data
// TODO: Tests for buggy/clean data
// TODO: Component tests
// TODO: Hook up filters
// DONE: Tidy up propTypes
// TODO: Add ID to product in store, replace index
// DONE: constants file for URL etc
// TODO: Add loading state
// TODO: Use Redux hooks?
// TODO: Make data processing funcs chainable

import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  getProductsData,
  productsLoadingSelector,
  productsErrorSelector,
  productsSelector
} from "./redux/modules/products";
import FilterableProductList from "./components/FilterableProductList";

const App = props => {
  const { getProducts, products } = props;
  console.log(props);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Fragment>
      <CssBaseline />
      <FilterableProductList products={products} />
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
