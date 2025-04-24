const mongoose = require("mongoose");
const reviewSchema = require("../schema/review.js");

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
