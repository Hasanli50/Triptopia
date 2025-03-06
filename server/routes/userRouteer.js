const express = require("express");
const router = express.Router();
const {
  getAllNotDeletedUsers,
  getById,
  getByToken,
  userRegister,
  verifyAccount,
} = require("../controllers/userController.js");
const imageUpload = require("../config/profileImageMulter.js");

router.get("/", getAllNotDeletedUsers);
router.get("/:id", getById);
router.get("/:token", getByToken);
router.post("/", imageUpload.single("profile_image"), userRegister);
router.post("/verify-account", verifyAccount);

module.exports = router;
