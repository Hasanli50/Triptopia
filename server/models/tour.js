const mongoose = require("mongoose");
const tourSchema = require("../schema/tour.js");

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
