import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      minlength: [3, "First name must be at least 3 characters"],
      maxlength: [30, "First name cannot exceed 30 characters"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      minlength: [3, "Last name must be at least 3 characters"],
      maxlength: [30, "Last name cannot exceed 30 characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: [validator.isEmail, "Provide a valid email"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      minlength: [10, "Phone number must contain 10 digits"],
      maxlength: [10, "Phone number must contain 10 digits"],
      trim: true,
    },
    date: {
      type: String, // YYYY-MM-DD
      required: [true, "Date is required"],
      index: true,
    },
    time: {
      type: String, // HH:mm
      required: [true, "Time is required"],
      index: true,
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

/**
 * 🔥 Compound index for FAST slot queries
 * Used by:
 * - countDocuments({ date, time })
 * - aggregation pipelines
 */
reservationSchema.index({ date: 1, time: 1 });

export const Reservation = mongoose.model("Reservation", reservationSchema);
