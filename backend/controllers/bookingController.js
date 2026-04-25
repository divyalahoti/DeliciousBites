import Booking from "../models/bookingModel.js";

// ✅ CREATE BOOKING
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      phone,
      mealType,
      date,
      time,
      guests,
      tableNumber,
      duration
    } = req.body;

    // ✅ VALIDATION
    if (!name || !phone || !date || !time || !tableNumber) {
      return res.json({ success: false, message: "All fields required" });
    }

    if (duration < 1 || duration > 3) {
      return res.json({
        success: false,
        message: "Duration must be between 1–3 hours"
      });
    }

    // ✅ AUTO EXPIRE OLD BOOKINGS
    await Booking.updateMany(
      { expiryTime: { $lt: new Date() }, status: "active" },
      { status: "expired" }
    );

    // ✅ CHECK OVERLAP BOOKINGS
    const existingBookings = await Booking.find({
      tableNumber,
      date,
      status: "active"
    });

    const newStart = parseInt(time.split(":")[0]);
    const newEnd = newStart + Number(duration);

    for (let b of existingBookings) {
      const existingStart = parseInt(b.time.split(":")[0]);
      const existingEnd = existingStart + b.duration;

      const overlap = newStart < existingEnd && newEnd > existingStart;

      if (overlap) {
        return res.json({
          success: false,
          message: "Table already booked for this time"
        });
      }
    }

    // ✅ CORRECT EXPIRY CALCULATION
    const [hours, minutes] = time.split(":");

    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(Number(hours));
    bookingDateTime.setMinutes(Number(minutes));
    bookingDateTime.setSeconds(0);

    const expiryTime = new Date(
      bookingDateTime.getTime() + duration * 60 * 60 * 1000
    );

    // ✅ CREATE BOOKING
    const booking = new Booking({
      name,
      phone,
      mealType: [mealType],
      date,
      time,
      duration,
      guests,
      tableNumber,
      expiryTime,
      status: "active"
    });

    await booking.save();

    res.json({ success: true, message: "Booking successful" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

// ✅ GET BOOKED TABLES
export const getBookedTables = async (req, res) => {
  try {
    const { date, time } = req.query;

    // 🔥 AUTO EXPIRE
    await Booking.updateMany(
      { expiryTime: { $lt: new Date() }, status: "active" },
      { status: "expired" }
    );

    // ✅ GET ACTIVE BOOKINGS
    const bookings = await Booking.find({
      date,
      status: "active",
      expiryTime: { $gt: new Date() }
    });

    // ⏱ FILTER BASED ON TIME SLOT
    const selectedHour = parseInt(time?.split(":")[0]);

    const bookedTables = bookings
      .filter((b) => {
        const start = parseInt(b.time.split(":")[0]);
        const end = start + b.duration;

        return selectedHour >= start && selectedHour < end;
      })
      .map((b) => b.tableNumber);

    res.json({ success: true, bookedTables });

  } catch (error) {
    console.log(error);
    res.json({ success: false });
  }
};

// ✅ CANCEL BOOKING
export const cancelBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false });
  }
};