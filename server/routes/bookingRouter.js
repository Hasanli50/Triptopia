const express = require("express");
const router = express.Router();
const {
  getById,
  createBooking,
  updateBooking,
} = require("../controllers/bookingController.js");

router.get("/:id", getById);
router.post("/", createBooking);
router.patch("/:id", updateBooking);

module.exports = router;
