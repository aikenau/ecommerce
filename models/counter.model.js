const mongoose = require("mongoose");

const CounterSchema = new mongoose.Schema({
  value: { type: Number, default: 0 },
});

module.exports = mongoose.model("Counter", CounterSchema);
