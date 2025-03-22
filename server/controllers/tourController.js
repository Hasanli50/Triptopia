const formatObj = require("../utils/formatObj.js");
const Tour = require("../models/tour.js");
const User = require("../models/user.js");
const Booking = require("../models/booking.js");
const Review = require("../models/review.js");
const Notification = require("../models/notification.js");
const { cloudinary } = require("../config/profileImageCloudinary.js");

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

    if (tour.images && tour.images.length > 0) {
      for (let image of tour.images) {
        const publicId = extractPublicId(image);
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

    const tour = new Tour({
      categoryId,
      title,
      description,
      price,
      location,
      duration,
      available_dates,
      itinerary,
      images: req.file.path,
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

    const tour = await Tour.findById(id);
    if (!tour) {
      return res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }

    const newData = {
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
    };

    if (req.files && req.files.length > 0) {
      if (tour.images && tour.images.length > 0) {
        for (let image of tour.images) {
          const publicId = extractPublicId(image);
          await cloudinary.uploader.destroy(`uploads/${publicId}`, (error) => {
            if (error) {
              throw new Error("Failed to delete image from Cloudinary");
            }
          });
        }
      }

      const imageUploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "uploads" })
      );
      const uploadResults = await Promise.all(imageUploadPromises);
      newData.images = uploadResults.map((result) => result.secure_url);
    }

    const updatedTour = await Tour.findByIdAndUpdate(id, newData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      message: "Tour successfully updated!",
      status: "success",
      data: updatedTour,
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
