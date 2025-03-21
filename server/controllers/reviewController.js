const Review = require("../models/review");
const Tour = require("../models/tour");
const User = require("../models/user");
const formatObj = require("../utils/formatObj");

const creaateReview = async (req, res) => {
  try {
    const { id } = req.user;
    const { rating, review, tourId } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    const newReview = new Review({
      userId: id,
      tourId,
      rating,
      review,
    });

    await newReview.save();

    const tour = await Tour.findById(tourId);
    tour.reviewIds = [...tour.reviewIds, newReview._id];
    await tour.save();

    res.status(200).json({
      message: "Review successfully created!",
      status: "success",
      data: formatObj(newReview),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;

    const reviewBody = {
      rating,
      review,
    };

    const findReviewById = await Review.findById(id);

    if (!findReviewById) {
      return res.status(404).json({
        message: "Review not found!",
        status: "fail",
        data: {},
      });
    }

    const updatedReview = await Review.findByIdAndUpdate(id, reviewBody, {
      new: true,
      runValidators: true,
    });

    await updatedReview.save();

    const tour = await Tour.findById(updatedReview.tourId);
    if (!tour) {
      return res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }

    const reviewIndex = tour.reviewIds.indexOf(updatedReview._id);
    if (reviewIndex !== -1) {
      tour.reviewIds[reviewIndex] = updatedReview._id;
    } else {
      tour.reviewIds.push(updatedReview._id);
    }

    await tour.save();

    return res.status(200).json({
      message: "Review updated successfully",
      status: "success",
      data: formatObj(updatedReview),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({
        message: "Review not found!",
        status: "fail",
        data: {},
      });
    }

    const findTour = await Tour.findById(review.tourId);
    if (!findTour) {
      return res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }

    findTour.reviewIds.filter((reviewId) => reviewId !== id);
    await findTour.save();

    res.status(200).json({
      message: "Review successfully deleted!",
      status: "succcess",
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

const getAllReview = async (req, res) => {
  try {
    const reviews = await Review.find({});

    if (reviews.length === 0) {
      return res.status(404).json({
        message: "Reviews not found",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Review successfully found!",
      status: "success",
      data: reviews.map(formatObj),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found!",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Review successfully found!",
      status: "success",
      data: formatObj(review),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};
