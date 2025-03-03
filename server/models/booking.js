const mongoose = require("mongoose");
const bookingSchema = require("../schema/booking.js");

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
