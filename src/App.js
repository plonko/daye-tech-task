import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";

import {
  getProductsData,
  productsLoadingSelector,
  productsErrorSelector,
  productsSelector
} from "./products";

const App = props => {
  const { getProducts, products } = props;
  console.log(props);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <main>
      <Button variant="contained" color="primary">
        Hello World
      </Button>
      {products && products.map(product => console.log(product))}
    </main>
  );
};

App.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape())
};

App.defaultProps = {
  products: []
};

const mapStateToProps = state => ({
  products: productsSelector(state)
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
