// DONE: Add Material UI
// DONE: Setup Redux Ducks
// DONE: Clean data before it goes into store
// DONE: Add error catching for unknown buggy data
// TODO: Tests for buggy/clean data
// TODO: Component tests
// DONE: Style products
// DONE: Hook up filters
// DONE: Tidy up propTypes
// DONE: Add ID to product in store, replace index
// DONE: constants file for URL etc
// DONE: Add loading state
// TODO: Use Redux hooks?
// TODO: Make data processing funcs chainable?
// TODO: Delete malformed key instead of copying all properties
// TODO: Make filter lists from data?
// TODO: Error boundaries

import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import CssBaseline from "@material-ui/core/CssBaseline";

import {
  getProductsData,
  productsLoadingSelector,
  productsErrorSelector,
  productsSelector,
  productsFilteredByKeyword
} from "./redux/modules/products";
import { updateFilterKeywords } from "./redux/modules/filters";
import ProductList from "./components/ProductList";

const App = props => {
  const {
    getProducts,
    products,
    filteredProducts,
    setFilterKeywords,
    isLoading,
    isError
  } = props;

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <Fragment>
      <CssBaseline />
      <ProductList
        products={filteredProducts.length ? filteredProducts : products}
        setFilterKeywords={setFilterKeywords}
        isLoading={isLoading}
        isError={isError}
      />
    </Fragment>
  );
};

App.propTypes = {
  products: ProductList.propTypes.products,
  filteredProducts: ProductList.propTypes.products,
  setFilterKeywords: PropTypes.func,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired
};

App.defaultProps = {
  products: [],
  filteredProducts: [],
  setFilterKeywords: () => {}
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
    },
    setFilterKeywords: keywords => {
      dispatch(updateFilterKeywords(keywords));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
