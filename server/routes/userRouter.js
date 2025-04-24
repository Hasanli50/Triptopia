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
  forgotPassword,
  resetPassword,
  updateUserInfo,
  updatePassword,
  hostRegister,
  verifyHostAccount,
  saveFcmToken,
} = require("../controllers/userController.js");
const imageUpload = require("../config/profileImageMulter.js");
const { verifyToken } = require("../config/verifyToken.js");
const userRegisterValidator = require("../middlewares/user/userRegister.js");
const verifyAccountValidator = require("../middlewares/user/verifyAccount.js");
const forgotPassValidator = require("../middlewares/user/forgotPass.js");
const updatePassValidator = require("../middlewares/user/updatePassword.js");
const resetPassValidator = require("../middlewares/user/resetPass.js");
const updateUserInfoValidator = require("../middlewares/user/updateUserInfo.js");

router.get("/", getAllNotDeletedUsers);
router.get("/:id", getById);
router.get("/:token", verifyToken, getByToken);
router.post(
  "/",
  // imageUpload.single("profile_image"),
  userRegisterValidator,
  userRegister
);
router.post(
  "/host",
  imageUpload.single("profile_image"),
  userRegisterValidator,
  hostRegister
);
router.patch("/verify-account-host/:id", verifyHostAccount);
router.post("/verify-account", verifyAccountValidator, verifyAccount);
router.post("/user-login", userLogin);
router.patch("/freeze-account/:id", verifyToken, freezeAccount);
router.patch("/unfreeze-account/:id", verifyToken, unFreezeAccount);
router.patch("/banned-account/:id", verifyToken, banAccount);
router.patch("/unbanned-account/:id", verifyToken, unBanAccount);
router.delete("/delete-account/:id", verifyToken, deleteAccount);
router.post("/forgot-password", forgotPassValidator, forgotPassword);
router.post(
  "/reset-password/:token",
  verifyToken,
  resetPassValidator,
  resetPassword
);
router.patch(
  "/user-info/:id",
  verifyToken,
  updateUserInfoValidator,
  imageUpload.single("profile_image"),
  updateUserInfo
);
router.patch(
  "/update-password/:id",
  verifyToken,
  updatePassValidator,
  updatePassword
);
router.post("/save-fcm-token", saveFcmToken);

module.exports = router;
