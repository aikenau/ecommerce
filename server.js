const express = require("express");
const connectDB = require("./config/db"); // Require the new db config file
const cors = require("cors");
const counterRoutes = require("./routes/counter.routes");
const userRoutes = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 5001;

// Connect to MongoDB (could be extracted to a file in /config)
connectDB(); // Establish connection to the database

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Nice Use routes
app.use("/api/counter", counterRoutes);
app.use("/api/user", userRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "404: Page not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  const message = err.message || "An error occurred";
  res.status(statusCode).json({ message: message, error: err });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
