const mongoose = require("mongoose");
const clientFeedbackSchema = require("../schema/clientFeedback");

const ClientFeedback = mongoose.model("ClientFeedback", clientFeedbackSchema);

module.exports = ClientFeedback;
