// src/App.jsx
import React, { useState } from "react";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import "./App.css";

const initialProducts = [
  { id: 1, name: "Product 1", price: 100 },
  // Add more products as needed
];

function App() {
  const [products] = useState(initialProducts);

  return (
    <div className="App">
      <NavBar />
      <main>
        <ProductList products={products} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
