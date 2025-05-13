const {
  getAllTours,
  getTourByValues,
  getTourById,
  getTourRating,
  deleteTour,
  createTour,
  updateTour,
} = require("../controllers/tourController.js");
const express = require("express");
const router = express.Router();
const createTourValidation = require("../middlewares/tourRouter/createTour.js");
const updateTourValidation = require("../middlewares/tourRouter/updateTour.js");
const { verifyToken } = require("../config/verifyToken.js");
const imageUpload = require("../config/profileImageMulter.js");

router.get("/", getAllTours);
router.get("/search", getTourByValues);
router.post(
  "/",
  verifyToken,
  imageUpload.array("images", 10),
  createTourValidation,
  createTour
);
router.get("/:id", getTourById);
router.get("/rating/:id", getTourRating);
router.delete("/:id", verifyToken, deleteTour);
router.patch(
  "/:id",
  imageUpload.array("images", 10),
  updateTourValidation,
  updateTour
);

module.exports = router;
