const mongoose = require("mongoose");
const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    userIds: { type: [Schema.Types.ObjectId], ref: "User" },
    tourId: { type: Schema.Types.ObjectId, ref: "Tour" },
    message: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = notificationSchema;
