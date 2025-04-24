const {
  getAllTour,
  getTourById,
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

router.get("/", getAllTour);
router.post(
  "/",
  verifyToken,
  imageUpload.array("images", 10),
  createTourValidation,
  createTour
);
router.get("/:id", getTourById);
router.delete("/:id", verifyToken, deleteTour);
router.patch(
  "/:id",
  imageUpload.array("images", 10),
  updateTourValidation,
  updateTour
);

module.exports = router;
