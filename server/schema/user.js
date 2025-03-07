const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

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
      match: /^\+(\d{1,4})\s?(\d{1,15})$/,
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
    isBanned: {
      type: Boolean,
      default: false,
    },
    banExpiresAt: {
      type: Date,
      default: null,
    },
    verificationCode: { type: String, default: null },
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

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
});

userSchema.statics.login = async function (username, password) {
  const user = await this.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

userSchema.methods.generateToken = function () {
  const payload = { id: this._id, role: this.role };
  const secret = JWT_SECRET || "default_secret_key";
  const options = { expiresIn: "6h" };
  return jwt.sign(payload, secret, options);
};

userSchema.statics.decodeToken = function (token) {
  const secret = JWT_SECRET || "default_secret_key";
  const decode = jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return err;
    }
    return decoded;
  });
  return decode;
};

module.exports = userSchema;
