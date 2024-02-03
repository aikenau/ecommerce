const Counter = require("../models/counter.model");

exports.getCounter = async (req, res) => {
  // Assuming there's only one counter document
  const counter = await Counter.findOne();
  res.json({ value: counter ? counter.value : 0 });
};

exports.incrementCounter = async (req, res) => {
  const counter = await Counter.findOneAndUpdate(
    {},
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );
  res.json({ value: counter.value });
};

exports.decrementCounter = async (req, res) => {
  const counter = await Counter.findOneAndUpdate(
    {},
    { $inc: { value: -1 } },
    { new: true, upsert: true }
  );
  res.json({ value: counter.value });
};
