const express = require("express");
const app = express();
require("dotenv").config();
PORT = process.env.PORT;
const categoryRouter = require("./routes/categoryRouter.js");
const connectToDb = require("./config/db.js");
var cors = require('cors')

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/category", categoryRouter);

connectToDb();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
