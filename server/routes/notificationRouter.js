const {
  createNotificationAndSendPush,
  deleteNotification,
} = require("../controllers/notificationController");
const createNotificationValidator = require("../middlewares/notification/createNotification.js");
const express = require("express");
const router = express.Router();

router.delete("/:id", deleteNotification);
router.post("/", createNotificationValidator, createNotificationAndSendPush);

module.exports = router;
