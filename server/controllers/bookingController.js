const formatObj = require("../utils/formatObj.js");
const Tour = require("../models/tour.js");
const Booking = require("../models/booking.js");

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return req.status(404).json({
        message: "Boking not found!",
        status: "fail",
        data: {},
      });
    }

    res.status(200).json({
      message: "Booking successfully found!",
      status: "success",
      data: formatObj(booking),
    });
  } catch (error) {
    req.status(500).json({
      message: error.messsage,
      status: "fail",
      data: {},
    });
  }
};

const createBooking = async (req, res) => {
  try {
    const { id } = req.user;
    const { tourId } = req.body;

    const booking = new Booking({
      userId: id,
      tourId,
      payment_status: "paid",
    });

    await booking.save();

    const tour = await Tour.findById(tourId);

    if (!tour) {
      res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }

    tour.number_of_people += 1;
    await tour.save();

    res.status(200).json({
      message: "Booking successfully created!",
      status: "success",
      data: formatObj(booking),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};

const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["confirmed", "cancelled"].includes(status)) {
      return res.status(400).json({
        message: "Invalid status. It must be 'confirmed' or 'cancelled'.",
        status: "fail",
        data: {},
      });
    }

    const findBooking = await Booking.findById(id);
    if (!findBooking) {
      return res.status(404).json({
        message: "Booking not found!",
        status: "fail",
        data: {},
      });
    }
    const updateBooking = await Booking.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      }
    );

    const tour = await Tour.findById(updateBooking.tourId);
    if (!tour) {
      res.status(404).json({
        message: "Tour not found!",
        status: "fail",
        data: {},
      });
    }
    if (status === "cancelled") {
      tour.number_of_people -= 1;
      await tour.save();
    }

    res.status(200).json({
      message: "Booking successfully updated!",
      status: "success",
      data: updateBooking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: "fail",
      data: {},
    });
  }
};
