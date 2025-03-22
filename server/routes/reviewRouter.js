const express = require("express");
const router = express.Router();
const {
  creaateReview,
  updateReview,
  deleteReview,
  getAllReview,
  getById,
} = require("../controllers/reviewController.js");
const createReviewValidator = require("../middlewares/review/createReview.js");
const updateReviewValidator = require("../middlewares/review/updateReview.js");
const { verifyToken } = require("../config/verifyToken.js");

router.get("/", getAllReview); //+
router.get("/:id", getById); //+
router.delete("/:id", deleteReview); //+
router.post("/", verifyToken, createReviewValidator, creaateReview); //+
router.patch("/:id", updateReviewValidator, updateReview); //+

module.exports = router;
