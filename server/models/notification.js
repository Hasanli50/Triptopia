const mongoose = require("mongoose");
const notificationSchema = require("../schema/notification.js");

const Notification = mongoose.model("Notification", notificationSchema);

module.exports = Notification;
