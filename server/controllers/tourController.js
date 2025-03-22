const formatObj = require("../utils/formatObj.js");
const Tour = require("../models/tour.js");
const User = require("../models/user.js");
const Booking = require("../models/booking.js");
const Review = require("../models/review.js");
const Notification = require("../models/notification.js");
const { cloudinary } = require("../config/profileImageCloudinary.js");
const { extractPublicIdImages } = require("../utils/publicId.js");

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
      data: allTour.map(formatObj),
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
    res.status(500).json({
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
      res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    if (!tour) {
      res.status(404).json({
        message: "Tour not found",
        status: "fail",
        data: {},
      });
    }

    if (tour.images && tour.images.length > 0) {
      for (let image of tour.images) {
        const publicId = extractPublicIdImages(image);
        await cloudinary.uploader.destroy(`uploads/${publicId}`, (error) => {
          if (error) {
            throw new Error("Failed to delete image from Cloudinary");
          }
        });
      }
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
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const createTour = async (req, res) => {
  try {
    const {
      tour_guide,
      categoryId,
      title,
      description,
      price,
      location,
      duration,
      available_dates,
      itinerary,
      max_group_size,
      min_group_size,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (user.role !== "host") {
      return res.status(404).json({
        message: "User must be host!",
        status: "fail",
        data: {},
      });
    }

    const tour = new Tour({
      categoryId,
      userId: user._id,
      title,
      description,
      price,
      location,
      duration,
      available_dates,
      itinerary,
      images: req.files.map((file) => file.path),
      tour_guide,
      max_group_size,
      min_group_size,
    });

    await tour.save();

    res.status(200).json({
      message: "Tour successfully created!",
      status: "success",
      data: formatObj(tour),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

// after deleting default value
const updateTour = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      categoryId,
      title,
      description,
      price,
      location,
      duration,
      available_dates,
      itinerary,
      tour_guide,
      max_group_size,
      min_group_size,
    } = req.body;

    const newData = {
      ...req.body,
    };

    if (req.files) {
      newData.images = req.files.map((file) => file.path);
    }

    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });

    if (req.files && req.files.length > 0) {
      if (tour.images && tour.images.length > 0) {
        for (let imageUrl of tour.images) {
          const publicId = extractPublicIdImages(imageUrl);
          await cloudinary.uploader.destroy(`uploads/${publicId}`, (error) => {
            if (error) {
              throw new Error("Failed to delete image from Cloudinary");
            }
          });
        }
      }
    }

    res.status(200).json({
      message: "Tour successfully updated!",
      status: "success",
      data: formatObj(updatedTour),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

module.exports = {
  getAllTour,
  getTourById,
  deleteTour,
  createTour,
  updateTour,
};
