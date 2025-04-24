const {
  createNotificationAndSendPush,
  deleteNotification,
} = require("../controllers/notificationController");
const express = require("express");
const router = express.Router();
const createNotificationValidator = require("../middlewares/notification/createNotification.js");

router.delete("/:id", deleteNotification);
router.post("/", createNotificationValidator, createNotificationAndSendPush);

module.exports = router;
