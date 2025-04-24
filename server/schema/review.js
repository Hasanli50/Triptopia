const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    tourId: { type: Schema.Types.ObjectId, ref: "Tour" },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    review: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = reviewSchema;
