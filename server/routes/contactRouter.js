const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  createMessage,
  responseToMessage,
} = require("../controllers/contactController.js");
const { verifyToken } = require("../config/verifyToken.js");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", verifyToken, createMessage);
router.patch("/:id", responseToMessage);

module.exports = router;
