import React, { useState, useEffect } from "react";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message || "Something went wrong!");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {products.length > 0 ? (
        products.map((product) => (
          <ProductItem key={product._id} product={product} />
        ))
      ) : (
        <div>No products available</div>
      )}
    </div>
  );
};

export default ProductList;
