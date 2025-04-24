const { cloudinary } = require("../config/profileImageCloudinary.js");
const User = require("../models/user.js");
const formatObj = require("../utils/formatObj.js");
require("dotenv").config();
const twilio = require("twilio");
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;
const { extractPublicId } = require("../utils/publicId.js");
const transporter = require("../config/nodemailer.js");
const USER_MAIL = process.env.USER_MAIL;
const bcrypt = require("bcrypt");

// users
const getAllNotDeletedUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false }, { password: 0 });

    if (users.length === 0) {
      res.status(404).json({
        message: "Users not found",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Users successfully found",
      status: "success",
      data: users.map(formatObj),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(
      id,
      { isDeleted: false },
      { password: 0 }
    ).populate("travel_history");

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "User successfully found",
      status: "success",
      data: formatObj(user),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const getByToken = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id, { isDeleted: false }, { password: 0 });

    if (!user) {
      res.status(404).json({
        message: "User not found with token",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "User successfully found",
      status: "success",
      data: formatObj(user),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

let verificationCode = null;
let phoneNumberToVerify = null;

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000);
}

// User registration route
const userRegister = async (req, res) => {
  try {
    const { username, password, email, phone_number } = req.body;
    phoneNumberToVerify = phone_number;
    verificationCode = generateVerificationCode();

    const duplicate = await User.findOne({ $or: [{ email }, { username }] });
    if (duplicate) {
      return res.status(404).json({
        message: "Username or email already exists!",
        status: "fail",
        data: {},
      });
    }

    const newUser = new User({
      username,
      password,
      email,
      role: "user",
      phone_number,
      // profile_image: req.file.path,
      profile_image:
        "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
      isVerified: false,
    });

    newUser.verificationCode = verificationCode;

    await client.messages.create({
      body: `Your verification code is: ${verificationCode}`,
      from: twilioPhoneNumber,
      to: phoneNumberToVerify,
    });

    await newUser.save();

    res.status(200).json({
      message:
        "User successfully created and verification code sent to your phone!",
      status: "success",
      data: formatObj(newUser),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

// Host registration route
const hostRegister = async (req, res) => {
  try {
    const { username, password, email, phone_number } = req.body;

    const duplicate = await User.findOne({ $or: [{ email }, { username }] });
    if (duplicate) {
      return res.status(404).json({
        message: "Username or email already exists!",
        status: "fail",
        data: {},
      });
    }

    const newUser = new User({
      username,
      password,
      email,
      role: "host",
      phone_number,
      // profile_image: req.file.path,
      profile_image:
        "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg",
      isVerified: false,
    });

    await newUser.save();

    res.status(200).json({
      message:
        "User successfully created and verification code sent to your phone!",
      status: "success",
      data: formatObj(newUser),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const verifyAccount = async (req, res) => {
  try {
    const { verificationCode: userInputCode } = req.body;

    const user = await User.findOne({ verificationCode: userInputCode });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    if (user.verificationCode === userInputCode) {
      user.isVerified = true;
      user.verificationCode = null;
      await user.save();

      res.status(200).json({
        message: "Verification successful!",
        status: "success",
      });
    } else {
      res.status(400).json({
        message: "Invalid verification code. Please try again.",
        status: "fail",
        data: {},
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const verifyHostAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ _id: id, role: "host" });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        isVerified: true,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Verification successful!",
      status: "success",
      data: updatedData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        status: "fail",
        data: {},
      });
    }

    if (user.isVerified === false) {
      return res.status(404).json({
        message: "Your account not verified! Please verify your account",
        status: "fail",
        data: {},
      });
    }

    if (user.banExpiresAt < Date.now()) {
      await User.findByIdAndUpdate(
        user._id,
        {
          isBanned: false,
          banExpiresAt: null,
        },
        { new: true }
      );
    }
    if (user.isBanned === true) {
      const remainingMilliseconds = user.banExpiresAt - Date.now();
      const remainingMinutes = Math.floor(remainingMilliseconds / (1000 * 60));
      const remainingSeconds = Math.floor(
        (remainingMilliseconds % (1000 * 60)) / 1000
      );
      return res.status(404).json({
        message: `Your account is banned. Come back after ${remainingMinutes} minutes and ${remainingSeconds} seconds.`,
        status: "fail",
        data: {},
      });
    }

    if (user.isFrozen === true) {
      await User.findByIdAndUpdate(
        user._id,
        {
          isFrozen: false,
        },
        { new: true }
      );
    }
    return res.status(200).json({
      data: {
        id: formatObj(user).id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token: user.generateToken(),
      message: "User logged in successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};  

const freezeAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "fail",
        data: {},
      });
    }

    const freeze = await User.findByIdAndUpdate(
      id,
      {
        isFrozen: true,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User account successfully freezed",
      status: "success",
      data: formatObj(freeze),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const unFreezeAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "fail",
        data: {},
      });
    }

    const unFreeze = await User.findByIdAndUpdate(
      id,
      {
        isFrozen: false,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User account successfully freezed",
      status: "success",
      data: formatObj(unFreeze),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const banAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const { duration } = req.body;

    const banExpiresAt = new Date(Date.now() - duration * 1000 * 60);
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    const updatedData = await User.findByIdAndUpdate(
      id,
      {
        isBanned: true,
        banExpiresAt: banExpiresAt,
      },
      { new: true }
    );

    res.status(200).json({
      message: `User banned for ${duration} minutes`,
      status: "success",
      data: formatObj(updatedData),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const unBanAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "fail",
        data: {},
      });
    }

    const unBanUser = await User.findByIdAndUpdate(
      id,
      {
        isBanned: false,
        banExpiresAt: null,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User successfully unbanned",
      status: "success",
      data: formatObj(unBanUser),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    if (user.profile_image) {
      const publicId = extractPublicId(user);
      await cloudinary.uploader.destroy(`uploads/${publicId}`, (error) => {
        if (error) {
          throw new Error("Failed to delete image from Cloudinary");
        }
      });
    }

    const deleteUser = await User.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        username: null,
        password: null,
        email: null,
        profile_image: null,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "User successfully deleted!",
      status: "success",
      data: formatObj(deleteUser),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    const token = user.generateToken();

    transporter
      .sendMail({
        from: USER_MAIL,
        to: email,
        subject: "Triptopiaforgot password | Triptopia",
        html: `<p>If you wwant change your password, click to <a href="http://localhost:5173/reset-password/${token}" >here</a></p>`,
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    res.status(200).json({
      message: "User successfully found",
      status: "success",
      token: token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { id } = req.user;
    const { password, confirmPass } = req.body;

    if (password !== confirmPass) {
      return res.status(404).json({
        message: "Passwords must be same!",
        status: "fail",
        data: {},
      });
    }

    if (!token) {
      return res.status(400).json({
        message: "Token is required",
        status: "fail",
      });
    }
    if (!password || !confirmPass) {
      return res.status(400).json({
        message: "Both password and confirmPass are required",
        status: "fail",
      });
    }
    const user = await User.findById(id, { isDeleted: false });

    if (!user) {
      res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    const updatePass = await User.findByIdAndUpdate(
      id,
      {
        password: await bcrypt.hash(password, 10),
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "User password successfully updated!",
      status: "success",
      data: updatePass,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { id } = req.user;
    const { username, email, phone_number } = req.body;

    const sentUser = {
      username,
      email,
      phone_number,
    };

    if (req.file) {
      sentUser.profile_image = req.file.path;
    }

    const prevUser = await User.findById(id);

    if (!prevUser) {
      return res.status(404).json({
        message: "User not found",
        status: "fail",
      });
    }

    const updateUser = await User.findByIdAndUpdate(id, sentUser, {
      new: true,
      runValidators: true,
    });

    if (req.file) {
      const publicId = extractPublicId(prevUser);
      await cloudinary.uploader.destroy(`uploads/${publicId}`, (error) => {
        if (error) throw new Error("Failed to delete image from Cloudinary");
      });
    }

    return res.status(200).json({
      data: formatObj(updateUser),
      message: "User updated successfully",
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { password, confirmPass } = req.body;
    const { id } = req.params;

    if (password !== confirmPass) {
      return res.status(400).json({
        message: "Passwords do not match",
        status: "fail",
      });
    }
    const user = await User.findById(id, { isDeleted: false });

    if (!user) {
      res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from the current password",
        status: "fail",
      });
    }

    const updatedPass = await User.findByIdAndUpdate(id, {
      password: await bcrypt.hash(password, 10),
    }).select("-password");

    res.status(200).json({
      message: "User password successfully updated!",
      status: "success",
      data: updatedPass,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

const saveFcmToken = async (req, res) => {
  try {
    const { id } = req.user;
    const { token } = req.body;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "fail",
        data: {},
      });
    }

    user.fcmToken = token;
    await user.save();

    res.status(200).json({
      message: "User fcmtoken successfullt saved!",
      status: "success",
      data: formatObj(user),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      status: "fail",
      data: {},
    });
  }
};

module.exports = {
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
};
