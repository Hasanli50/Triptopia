const express = require("express");
const router = express.Router();
const { verifyToken } = require("../config/verifyToken");
const {
  getClientFeedback,
  createClientFeedback,
  updateClientFeedback,
  deleteClientFeedback,
} = require("../controllers/clientFeedback");
const updateClientFeedbackValidator = require("../middlewares/clientFeedback/updateCLientFeedback");

router.get("/", getClientFeedback);
router.post("/", verifyToken, createClientFeedback);
router.delete("/:id", deleteClientFeedback);
router.patch("/:id", updateClientFeedbackValidator, updateClientFeedback);

module.exports = router;
