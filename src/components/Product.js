import React from "react";
import PropTypes from "prop-types";

const Product = ({ price, tampons, id }) => {
  return (
    <div>
      {price}
      <br></br>
      id: {id}
      <br></br>
      data: {tampons[0].size}
    </div>
  );
};

Product.propTypes = {
  id: PropTypes.number.isRequired,
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
};

export default Product;
