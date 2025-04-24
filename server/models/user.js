const mongoose = require("mongoose");
const userSchema = require("../schema/user.js");

const User = mongoose.model("User", userSchema);

module.exports = User;
