const {
  getAllTour,
  getTourById,
  deleteTour,
  createTour,
  updateTour,
} = require("../controllers/tourController.js");
const express = require("express");
const createTourValidation = require("../middlewares/tourRouter/createTour.js");
const updateTourValidation = require("../middlewares/tourRouter/updateTour.js");
const router = express.Router();

router.get("/", getAllTour);
router.get("/:id", getTourById);
router.delete("/:id", deleteTour);
router.post("/", createTourValidation, createTour);
router.patch("/:id", updateTourValidation, updateTour);

module.exports = router;
