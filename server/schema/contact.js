const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    message: { type: String, required: true },
    response: {
      type: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = contactSchema;
