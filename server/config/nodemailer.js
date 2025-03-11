const nodemailer = require("nodemailer");
require("dotenv").config();
const USER_MAIL = process.env.USER_MAIL;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  service: "gmail",
  debug: true,
  port: 587,
  secure: false,
  auth: {
    user: USER_MAIL,
    pass: NODEMAILER_PASS,
  },
});

module.exports = transporter;
