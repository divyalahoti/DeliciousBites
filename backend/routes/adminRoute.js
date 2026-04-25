import express from "express";
import Booking from "../models/bookingModel.js";
import Order from "../models/orderModel.js";

const adminRouter = express.Router();

adminRouter.get("/today", async (req, res) => {

  try {
    const today = new Date().toLocaleDateString("en-CA");
    const start = new Date(today + "T00:00:00");
    const end = new Date(today + "T23:59:59");

    // const bookings = await Booking.find({
    //   date: { $gte: start, $lte: end }

    // });
    const bookings = await Booking.find();
    const orders = await Order.find();

    // const orders = await Order.find({
    //   date: { $gte: start, $lte: end },
    // });

    console.log("Orders:", orders.length);

    res.json({ success: true, bookings, orders });

  } catch (error) { res.json({ success: false }); }
});

// 👉 ALL DATA 

adminRouter.get("/all", async (req, res) => {
  try {

    const bookings = await Booking.find().sort({ createdAt: -1 });
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, bookings, orders });
  }
  catch (error) 
  { res.json({ success: false }); }
});





export default adminRouter;