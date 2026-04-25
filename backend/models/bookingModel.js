//BookingModel.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    mealType: [String],
    item: String,
    date: String,
    time: String,
    guests: Number,
    tableNumber: Number,
    duration:Number,
    status: { type: String, default: "active" },
    
    expiryTime: {
      type: Date,
      required: true,
      index: { expires: 0 } 
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);