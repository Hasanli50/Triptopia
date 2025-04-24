const formatObj = require("../utils/formatObj.js");
const Contact = require("../models/contact.js");
const User = require("../models/user.js");
const transporter = require("../config/nodemailer.js");
const USER_MAIL = process.env.USER_MAIL;

const getAll = async (req, res) => {
  try {
    const contact = await Contact.find({});

    if (contact.length === 0) {
      return res.status(404).json({
        message: "Contacts not found",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Contacts successfully found!",
      status: "success",
      data: contact.map(formatObj),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found!",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Contact successfully found!",
      status: "success",
      data: formatObj(contact),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const createMessage = async (req, res) => {
  try {
    const { id } = req.user;
    const { message, name } = req.body;

    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    const newMessage = new Contact({
      message,
      name,
      email: user.email,
    });

    await newMessage.save();
    res.status(200).json({
      message: "Message successfully created",
      status: "success",
      data: formatObj(newMessage),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const responseToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;
    const contact = await Contact.findById(id);
    if (!contact) {
      res.status(404).json({
        message: "Contact not found!",
        status: "fail",
        data: {},
      });
    }

    const responseMessage = await Contact.findByIdAndUpdate(
      id,
      {
        response,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const user = await User.findOne({ email: contact.email });
    if (!user) {
      res.status(404).json({
        message: "User not found!",
        status: "fail",
        data: {},
      });
    }

    transporter
      .sendMail({
        from: USER_MAIL,
        to: user.email,
        subject: "Response to your message | Triptopia",
        html: `<p>Your message successfully responded! Please check in Triptopia messages :)</p>`,
      })
      .catch((error) => {
        console.log("error: ", error);
      });

    res.status(200).json({
      message: "Message successfully updated!",
      status: "success",
      data: formatObj(responseMessage),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

module.exports = {
  getAll,
  getById,
  createMessage,
  responseToMessage,
};
