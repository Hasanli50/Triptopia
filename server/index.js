const express = require("express");
const app = express();
require("dotenv").config();
PORT = process.env.PORT;
const categoryRouter = require("./routes/categoryRouter.js");
const userRouter = require("./routes/userRouter.js");
const tourRouter = require("./routes/tourRouter.js");
const bookingRouter = require("./routes/bookingRouter.js");
const reviewRouter = require("./routes/reviewRouter.js");
const notificationRouter = require("./routes/notificationRouter.js");
const connectToDb = require("./config/db.js");
var cors = require("cors");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/tours", tourRouter);
app.use("/bookings", bookingRouter);
app.use("/reviews", reviewRouter);
app.use("/notifications", notificationRouter);

connectToDb();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
