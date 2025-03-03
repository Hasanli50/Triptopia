const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_DB = process.env.MONGO_DB;

const connectToDb = () => {
  mongoose
    .connect(MONGO_DB)
    .then(() => {
      console.log("Mongo db successfully connected");
    })
    .catch((error) => {
      console.log("Error in connect to mongo db");
    });
};

module.exports = connectToDb;
