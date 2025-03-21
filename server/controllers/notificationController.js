const admin = require("firebase-admin");
const Notification = require("../models/notification.js");
const Tour = require("../models/tour.js");
const User = require("../models/user.js");
const formatObj = require("../utils/formatObj.js");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const createNotificationAndSendPush = async (req, res) => {
  try {
    const { tourId } = req.params;
    const { message } = req.body;
    const newNotification = new Notification({
      tourId,
      message,
    });

    await newNotification.save();

    const tour = await Tour.findById(tourId);

    if (!tour) {
      return res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }

    const users = await User.find({ _id: { $in: tour.userIds } });

    const tokens = users.map((user) => user.fcmToken).filter((token) => token);

    if (tokens.length === 0) {
      return res.status(404).json({
        message: "No FCM tokens found for users in the tour.",
        status: "fail",
        data: {},
      });
    }

    const payload = {
      notification: {
        title: "New Notification from Triptopia",
        body: message,
      },
    };

    const response = await admin.messaging().sendToDevice(tokens, payload);
    console.log("Push notification sent to users:", response);
    res.status(200).json({
      message: "Notification created and sent successfully",
      status: "success",
      data: formatObj(newNotification),
    });
  } catch (err) {
    req.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByIdAndDelete(id);

    if (!notification) {
      return res.status(404).json({
        message: "Notificaion not found!",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Notification successfully deleted",
      status: "success",
      data: {},
    });
  } catch (error) {
    req.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};
