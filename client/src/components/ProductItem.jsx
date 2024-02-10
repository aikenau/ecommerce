import React from "react";

const ProductItem = ({ product, addToCart }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <p>£{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;
