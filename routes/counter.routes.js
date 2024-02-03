const express = require("express");
const router = express.Router();
const counterController = require("../controllers/counter.controller");

router.get("/", counterController.getCounter);
router.post("/increment", counterController.incrementCounter);
router.post("/decrement", counterController.decrementCounter);

module.exports = router;
