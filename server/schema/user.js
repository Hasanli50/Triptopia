const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
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
    fcmToken: { type: String },
    phone_number: {
      type: String,
      match: /^\+(\d{1,4})\s?(\d{1,15})$/,
    },
    favorites: {
      type: [Schema.Types.ObjectId],
      ref: "Tour",
      default: [],
    },
    travel_history: {
      type: [Schema.Types.ObjectId],
      ref: "Review",
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
    verificationCodeExpires: { type: Date, default: null },
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

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

userSchema.methods.generateAccessToken = function () {
  const payload = { id: this._id, role: this.role };
  return jwt.sign(payload, process.env.JWT_SECRET || "default_secret_key", {
    expiresIn: "1h",
  });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = { id: this._id, role: this.role };
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret", {
    expiresIn: "20d",
  });
};

userSchema.methods.generateTokens = function () {
  return {
    accessToken: this.generateAccessToken(),
    refreshToken: this.generateRefreshToken(),
  };
};

userSchema.statics.decodeToken = function (token, type = "access") {
  const secret =
    type === "access"
      ? process.env.JWT_SECRET || "default_secret_key"
      : process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret";

  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return err;
  }
};

module.exports = userSchema;
