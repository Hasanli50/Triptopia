const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    tourId: { type: Schema.Types.ObjectId, ref: "Tour" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },
    payment_status: {
      type: String,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  { timestamps: true }
);

module.exports = bookingSchema;
