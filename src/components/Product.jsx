import React from "react";
import PropTypes from "prop-types";

const Product = ({ price, currency, productImage, tampons, id }) => {
  return (
    <div>
      <div>price: {price}</div>
      <div>currency: {currency}</div>
      <div>
        productImage: <img src={productImage} alt="" width="200" />
      </div>
      {tampons.map(tampon => {
        return (
          <i key={tampon.id}>
            <div>size: {tampon.size}</div>
            <div>coating: {tampon.coating}</div>
            <div>amount: {tampon.amount}</div>
          </i>
        );
      })}
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
      id: PropTypes.number.isRequired,
      size: PropTypes.string.isRequired,
      coating: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired
    }).isRequired
  ).isRequired
};

export default Product;
