import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";
import moment from "moment-timezone";

const RESERVATION_LIMIT = 2;

const OPEN_TIME = 7;  // 7 AM
const CLOSE_TIME = 22; // 10 PM

export const send_reservation = async (req, res, next) => {
  try {
    const { firstName, lastName, email, date, time, phone } = req.body;
    if (!firstName || !lastName || !email || !date || !time || !phone) {
      return next(new ErrorHandler("Please fill the full reservation form!", 400));
    }

    const selectedDateTime = moment.tz(`${date} ${time}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");

    const hour = selectedDateTime.hour();
    if (hour < OPEN_TIME || hour >= CLOSE_TIME) {
      return next(new ErrorHandler("Reservations allowed only between 7:00 AM and 10:00 PM", 400));
    }

    const reservationsOnDate = await Reservation.find({ date });

    const overlappingReservations = reservationsOnDate.filter((r) => {
      const existing = moment.tz(`${r.date} ${r.time}`, "YYYY-MM-DD HH:mm", "Asia/Kolkata");
      const diff = Math.abs(selectedDateTime.diff(existing, "minutes"));
      return diff < 30;
    });

    if (overlappingReservations.length >= RESERVATION_LIMIT) {
      return next(
        new ErrorHandler(
          "Maximum reservations booked for this slot. Please try another slot.",
          400
        )
      );
    }

    await Reservation.create({ firstName, lastName, email, date, time, phone });
    res.status(201).json({
      success: true,
      message: "Reservation booked successfully!",
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return next(new ErrorHandler(validationErrors.join(", "), 400));
    }
    return next(error);
  }
};

export const get_booked_slots = async (req, res, next) => {
  try {
    const { date } = req.params;
    if (!date) return next(new ErrorHandler("Date is required", 400));

    const reservations = await Reservation.find({ date });
    const bookedSlots = [];

    reservations.forEach((r) => {
      const time = r.time;
      const count = reservations.filter((x) => x.time === time).length;
      if (count >= RESERVATION_LIMIT && !bookedSlots.includes(time)) {
        bookedSlots.push(time);
      }
    });

    res.status(200).json({ success: true, bookedSlots });
  } catch (error) {
    return next(error);
  }
};
