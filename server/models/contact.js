const mongoose = require("mongoose");
const contactSchema = require("../schema/contact.js");

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
