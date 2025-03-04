const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    categoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "user", "host"],
      default: "user",
    },
    profile_image: { type: String, required: true },
    earnings: { type: Number, min: 0, default: 0 },
    phone_number: {
      type: String,
      match: /^(070|050|055|010|077)\s\d{3}\s\d{2}\s\d{2}$/,
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: "Tour",
    },
    travel_history: {
      type: [
        {
          tourId: { type: Schema.Types.ObjectId, ref: "Tour" },
          rating: { type: Number, default: 0, min: 0, max: 5 },
          date: { type: Date, default: Date.now },
          review: { type: String, default: "" },
        },
      ],
      default: [],
    },
    isFrozen: {
      type: Boolean,
      default: false,
    },
    isBan: {
      type: Boolean,
      default: false,
    },
    banExpiresAt: {
      type: Date,
      default: null,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
