import express from "express";
import { send_reservation, get_booked_slots } from "../controller/reservation.js";

const router = express.Router();

router.post("/send", send_reservation);
router.get("/booked-slots/:date", get_booked_slots);

export default router;
