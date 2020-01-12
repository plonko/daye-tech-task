import React from "react";
import PropTypes from "prop-types";

const Product = props => {
  const { product } = props;
  return <div>{product.price}</div>;
};

Product.propTypes = {};

export default Product;
