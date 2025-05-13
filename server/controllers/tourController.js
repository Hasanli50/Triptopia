const formatObj = require("../utils/formatObj.js");
const Tour = require("../models/tour.js");
const User = require("../models/user.js");
const Booking = require("../models/booking.js");
const Review = require("../models/review.js");
const Notification = require("../models/notification.js");
const { cloudinary } = require("../config/profileImageCloudinary.js");
const { extractPublicIdImages } = require("../utils/publicId.js");
const Category = require("../models/category.js");

const getAllTours = async (req, res) => {
  try {
    const allTour = await Tour.find({})
      .populate("categoryId", "name")
      .populate("reviewIds");

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

//date problem
const getTourByValues = async (req, res) => {
  try {
    const { destination, startDate, endDate, travelers, budget, tourType } =
      req.query;

    if (!destination) {
      return res.status(400).json({
        message: "Destination is required!",
        status: "fail",
        data: {},
      });
    }
    if (!startDate) {
      return res.status(400).json({
        message: "Start date is required!",
        status: "fail",
        data: {},
      });
    }
    if (!endDate) {
      return res.status(400).json({
        message: "End date is required!",
        status: "fail",
        data: {},
      });
    }
    if (!travelers) {
      return res.status(400).json({
        message: "Number of travelers is required!",
        status: "fail",
        data: {},
      });
    }
    if (!budget) {
      return res.status(400).json({
        message: "Budget is required!",
        status: "fail",
        data: {},
      });
    }
    if (!tourType) {
      return res.status(400).json({
        message: "Tour type is required!",
        status: "fail",
        data: {},
      });
    }

    console.log(new Date(startDate), new Date(endDate));

    const category = await Category.findOne({ name: tourType });

    if (category.length === 0) {
      return res.status(404).json({
        message: "Tour type not found!",
        status: "fail",
        data: {},
      });
    }
    //date problem
    const tours = await Tour.find({
      location: { $regex: destination, $options: "i" },
      available_dates: {
        $elemMatch: {
          start_date: { $lte: new Date(endDate) },
          end_date: { $gte: new Date(startDate) },
        },
      },
      $expr: {
        $lt: [
          { $add: ["$number_of_people", Number(travelers)] },
          "$max_group_size",
        ],
      },
      price: { $lte: Number(budget) },
      categoryId: category._id,
    });

    console.log("Tours found:", tours);

    if (tours.length === 0) {
      return res.status(404).json({
        message: "No tours found matching the criteria!",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Tours successfully found!",
      status: "success",
      data: tours.map(formatObj),
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

const getTourRating = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findById(id).populate("reviewIds");

    if (!tour) {
      return res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }

    const reviews = tour.reviewIds.map((review) => review.rating);
    const totalRating = reviews.reduce((acc, rating) => acc + rating, 0);
    const averageRating = totalRating / reviews.length || 0;
    const rating = averageRating.toFixed(1);

    res.status(200).json({
      message: "Tour rating successfully found!",
      status: "success",
      data: {
        rating : rating,
        averageRating : averageRating,
        reviews: tour.reviewIds.length,
      },
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
  getAllTours,
  getTourByValues,
  getTourById,
  getTourRating,
  deleteTour,
  createTour,
  updateTour,
};
