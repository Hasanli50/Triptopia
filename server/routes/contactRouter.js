const express = require("express");
const router = express.Router();
const {
  getAll,
  getById,
  createMessage,
  responseToMessage,
} = require("../controllers/contactController.js");
const { verifyToken } = require("../config/verifyToken.js");
const createMessageValidator = require("../middlewares/contact/createMessage.js");
const responseToMessageValidator = require("../middlewares/contact/responseToMessage.js");

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", verifyToken, createMessageValidator, createMessage);
router.patch("/:id", responseToMessageValidator, responseToMessage);

module.exports = router;
