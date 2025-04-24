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
const cantactRouter = require("./routes/contactRouter.js");
const connectToDb = require("./config/db.js");
var cors = require("cors");

const passport = require("passport");
const session = require("express-session");
require("./config/userPassportConfig.js");
const userAuthRouter = require("./routes/userAuthRouter.js");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: process.env.GOOGLE_CLIENT_SECRET_USER,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/auth-user", userAuthRouter);
app.use("/categories", categoryRouter);
app.use("/users", userRouter);
app.use("/tours", tourRouter);
app.use("/bookings", bookingRouter);
app.use("/reviews", reviewRouter);
app.use("/notifications", notificationRouter);
app.use("/contacts", cantactRouter);

connectToDb();

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
