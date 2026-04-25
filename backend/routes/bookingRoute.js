import express from "express";
import {
  createBooking,
  getBookedTables,
  cancelBooking,
  
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/tables", getBookedTables);

// ✅ NEW ROUTES
router.delete("/:id", cancelBooking);

export default router;