const express = require("express");
const router = express.Router();
const {
  getById,
  createBooking,
  updateBooking,
} = require("../controllers/bookingController.js");
const { verifyToken } = require("../config/verifyToken.js");

router.get("/:id", getById); //+
router.post("/", verifyToken, createBooking); //+
router.patch("/:id", updateBooking); //+

module.exports = router;
