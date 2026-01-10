import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";
import moment from "moment-timezone";

const RESERVATION_LIMIT = 1000;
const OPEN_TIME = 7;   // 7 AM
const CLOSE_TIME = 22; // 10 PM
const TIMEZONE = "Asia/Kolkata";

/**
 * CREATE RESERVATION
 */
export const send_reservation = async (req, res, next) => {
  try {
    const { firstName, lastName, email, date, time, phone } = req.body;

    // 1️⃣ Basic validation
    if (!firstName || !lastName || !email || !date || !time || !phone) {
      return next(new ErrorHandler("Please fill the full reservation form!", 400));
    }

    // 2️⃣ Parse selected date & time
    const selectedDateTime = moment.tz(
      `${date} ${time}`,
      "YYYY-MM-DD HH:mm",
      TIMEZONE
    );

    if (!selectedDateTime.isValid()) {
      return next(new ErrorHandler("Invalid date or time format", 400));
    }

    // 3️⃣ Check restaurant opening hours
    const hour = selectedDateTime.hour();
    if (hour < OPEN_TIME || hour >= CLOSE_TIME) {
      return next(
        new ErrorHandler(
          "Reservations allowed only between 7:00 AM and 10:00 PM",
          400
        )
      );
    }

    // 4️⃣ Calculate 30-minute overlap window
    const startWindow = selectedDateTime.clone().subtract(30, "minutes");
    const endWindow = selectedDateTime.clone().add(30, "minutes");

    // 5️⃣ ATOMIC count of overlapping reservations (NO race condition)
    const overlappingCount = await Reservation.countDocuments({
      date,
      time: {
        $gte: startWindow.format("HH:mm"),
        $lte: endWindow.format("HH:mm"),
      },
    });

    if (overlappingCount >= RESERVATION_LIMIT) {
      return next(
        new ErrorHandler(
          "Maximum reservations booked for this slot. Please try another slot.",
          400
        )
      );
    }

    // 6️⃣ Create reservation
    await Reservation.create({
      firstName,
      lastName,
      email,
      date,
      time,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Reservation booked successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map(
        (err) => err.message
      );
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};

/**
 * GET FULLY BOOKED SLOTS FOR A DATE
 */
export const get_booked_slots = async (req, res, next) => {
  try {
    const { date } = req.params;
    if (!date) return next(new ErrorHandler("Date is required", 400));

    // Aggregate count per time slot (FAST & SCALABLE)
    const slotCounts = await Reservation.aggregate([
      { $match: { date } },
      {
        $group: {
          _id: "$time",
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gte: RESERVATION_LIMIT },
        },
      },
    ]);

    const bookedSlots = slotCounts.map((slot) => slot._id);

    res.status(200).json({
      success: true,
      bookedSlots,
    });
  } catch (error) {
    return next(error);
  }
};
