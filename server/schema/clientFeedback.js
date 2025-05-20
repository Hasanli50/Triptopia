const mongoose = require("mongoose");
const { Schema } = mongoose;

const clientFeedbackSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    review: { type: String },
    rating: { type: Number, min: 1, max: 5, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = clientFeedbackSchema;
