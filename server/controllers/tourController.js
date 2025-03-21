const formatObj = require("../utils/formatObj.js");
const Tour = require("../models/tour.js");
const User = require("../models/user.js");
const Booking = require("../models/booking.js");
const Review = require("../models/review.js");
const Notification = require("../models/notification.js");

const getAllTour = async (req, res) => {
  try {
    const allTour = await Tour.find({});

    if (allTour.length === 0) {
      res.status(404).json({
        message: "Tours not found!",
        status: "fail",
        data: {},
      });
    }
    res.status(200).json({
      message: "Tours successfully found!",
      status: "success",
      data: formatObj(allTour),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const getTourById = async (req, res) => {
  try {
    const { id } = req.params;
    const tour = await Tour.findById(id);

    if (!tour) {
      return res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Tour successfully found!",
      status: "success",
      data: formatObj(tour),
    });
  } catch (error) {
    req.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const deleteTour = async (req, res) => {
  try {
    const { id: tourId } = req.params;
    const { id } = req.user;
    const tour = await Tour.findByIdAndDelete(tourId);
    const user = await User.findById(id);

    if (!user) {
      req.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    if (!tour) {
      req.status(404).json({
        message: "Tour not found",
        status: "fail",
        data: {},
      });
    }

    user.favorites.filter((fav) => fav !== tourId);
    await user.save();

    await Booking.deleteMany({ tourId });
    await Review.deleteMany({ tourId });
    await Notification.deleteMany({ tourId });

    res.status(200).json({
      message: "Tour successfully deleted",
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

const createTour = async (req, res) => {
  try {
  } catch (error) {
    req.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const updateTour = async (req, res) => {
  try {
  } catch (error) {
    req.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};
