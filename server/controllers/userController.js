const User = require("../models/user.js");
const formatObj = require("../utils/formatObj.js");
require("dotenv").config();
const twilio = require("twilio");
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

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
    const user = await User.findById(id, { isDeleted: false }, { password: 0 });

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
      phone_number,
      profile_image: req.file.path,
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

const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.login(username, password);

    if (!user) {
      res.status(404).json({
        message: "User not found",
        status: "fail",
        data: {},
      });
    }

    if (user.isVerified === false) {
      res.status(404).json({
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
    res.status(200).json({
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

module.exports = {
  getAllNotDeletedUsers,
  getById,
  getByToken,
  userRegister,
  verifyAccount,
  userLogin,
  freezeAccount,
  unFreezeAccount,
};
