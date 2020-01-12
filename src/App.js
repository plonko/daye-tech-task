import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
  products: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
      productImage: PropTypes.string.isRequired,
      tampons: PropTypes.arrayOf(
        PropTypes.shape({
          size: PropTypes.string.isRequired,
          coating: PropTypes.string.isRequired,
          amount: PropTypes.number.isRequired
        }).isRequired
      ).isRequired
    }).isRequired
  )
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
    getProducts: language => {
      dispatch(getProductsData(language));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
