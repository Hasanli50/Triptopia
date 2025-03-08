const express = require("express");
const router = express.Router();
const {
  getAllNotDeletedUsers,
  getById,
  getByToken,
  userRegister,
  verifyAccount,
  userLogin,
  freezeAccount,
  unFreezeAccount,
  banAccount,
  unBanAccount,
  deleteAccount,
} = require("../controllers/userController.js");
const imageUpload = require("../config/profileImageMulter.js");

router.get("/", getAllNotDeletedUsers);
router.get("/:id", getById);
router.get("/:token", getByToken);
router.post("/", imageUpload.single("profile_image"), userRegister);
router.post("/verify-account", verifyAccount);
router.post("/user-login", userLogin);
router.patch("/freeze-account/:id", freezeAccount);
router.patch("/unfreeze-account/:id", unFreezeAccount);
router.patch("/banned-account/:id", banAccount);
router.patch("/unbanned-account/:id", unBanAccount);
router.delete("/delete-account/:id", deleteAccount);

module.exports = router;
