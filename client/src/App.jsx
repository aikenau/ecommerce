import React, { useEffect, useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // Fetch the initial counter value from the server
    fetch("https://dry-badlands-60590-6ecef3395fc5.herokuapp.com/api/counter")
      .then((response) => response.json())
      .then((data) => setCounter(data.value));
  }, []);

  // Function to increment the counter
  const incrementCounter = () => {
    fetch(
      "https://dry-badlands-60590-6ecef3395fc5.herokuapp.com/api/counter/increment",
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => setCounter(data.value));
  };

  // Function to decrement the counter
  const decrementCounter = () => {
    fetch(
      "https://dry-badlands-60590-6ecef3395fc5.herokuapp.com/api/counter/decrement",
      { method: "POST" }
    )
      .then((response) => response.json())
      .then((data) => setCounter(data.value));
  };

  return (
    <div>
      <h2>Counter: {counter}</h2>
      <button onClick={incrementCounter}>Increment</button>
      <button onClick={decrementCounter}>Decrement</button>
    </div>
  );
}

export default App;
