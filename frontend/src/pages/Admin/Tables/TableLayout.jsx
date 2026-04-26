import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./TableLayout.css";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import AOS from "aos";
import "aos/dist/aos.css";

const tables = Array.from({ length: 12 }, (_, i) => i + 1);

const TableLayout = () => {
  const { backendUrl } = useContext(ShopContext);


  const [bookings, setBookings] = useState([]);
  const [selectedTime, setSelectedTime] = useState("Dinner");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

  useEffect(() => {
  const slots = getTimeSlots(selectedTime);
  setTimeSlots(slots);
}, []);

  useEffect(() => {
    fetchBookings();
  }, [selectedDate, selectedTime, selectedSlot]);

  const fetchBookings = async () => {
    const res = await axios.get(backendUrl + "/api/admin/today");
    if (res.data.success) setBookings(res.data.bookings);
  };

  const getTimeSlots = (meal) => {
    if (meal === "Breakfast") return ["08:00", "09:00", "10:00", "11:00"];
    if (meal === "Lunch") return ["12:00", "13:00", "14:00", "15:00"];
    if (meal === "Dinner") return ["19:00", "20:00", "21:00", "22:00"];
    return [];
  };

  // const isBooked = (tableNo) => {
  //   return bookings.some((b) => {
  //     const bookingDate = new Date(b.date).toISOString().split("T")[0];

  //     if (
  //       Number(b.tableNumber) !== tableNo ||
  //       bookingDate !== selectedDate ||
  //       !b.mealType?.includes(selectedTime) ||
  //       b.status !== "active"
  //     ) return false;

  //     if (!selectedSlot) return true;

  //     const start = parseInt(b.time);
  //     const end = start + (b.duration || 1);
  //     const selectedHour = parseInt(selectedSlot);

  //     return selectedHour >= start && selectedHour < end;
  //   });
  // };

  const isBooked = (tableNo) => {
    return bookings.some((b) => {
      const bookingDate = new Date(b.date).toISOString().split("T")[0];

      // ✅ FIX mealType handling
      const mealMatch = Array.isArray(b.mealType)
        ? b.mealType.includes(selectedTime)
        : b.mealType === selectedTime;

      if (
        Number(b.tableNumber) !== tableNo ||
        bookingDate !== selectedDate ||
        !mealMatch ||
        b.status !== "active"
      ) return false;

      // ✅ NO TIME FILTER → just booked
      if (!selectedSlot) return true;

      // ✅ FIX TIME PARSE (important)
      const bookingStart = parseInt(b.time.split(":")[0]);
      const selectedHour = parseInt(selectedSlot.split(":")[0]);
      const duration = b.duration || 1;

      const bookingEnd = bookingStart + duration;

      return selectedHour >= bookingStart && selectedHour < bookingEnd;
    });
  };

  return (
    <div className="layout-container">

      {/* HEADER */}
      <div className="layout-header" data-aos="fade-down">
        <h2>🍽 Restaurant Table Layout</h2>
        <p>Real-time table availability & booking overview</p>
      </div>

      {/* FILTERS */}
      <div className="filter-bar" data-aos="fade-up">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <select
          value={selectedTime}
          onChange={(e) => {
            setSelectedTime(e.target.value);
            const slots = getTimeSlots(e.target.value);
            setTimeSlots(slots);
            setSelectedSlot("");
          }}
        >
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>

        <select
          value={selectedSlot}
          onChange={(e) => setSelectedSlot(e.target.value)}
        >
          <option value="">All Time</option>
          {timeSlots.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>
      </div>

      {/* LEGEND */}
      <div className="legend" data-aos="fade-up">
        <span className="dot available-dot"></span> Available
        <span className="dot booked-dot"></span> Booked
      </div>

      {/* TABLE GRID */}
      <div className="restaurant-map" data-aos="zoom-in">
        {tables.map((table, index) => (
          <div
            key={table}

            data-aos-delay={index * 60}
            className={`table-circle ${isBooked(table) ? "booked" : "available"
              }`}
            onClick={() => {
              const booking = bookings.find((b) => {
                const bookingDate = new Date(b.date).toISOString().split("T")[0];

                return (
                  Number(b.tableNumber) === table &&
                  bookingDate === selectedDate &&
                  b.mealType?.includes(selectedTime) &&
                  b.status === "active"
                );
              });

              if (booking) setSelectedBooking(booking);
            }}
          >
            <span>{table}</span>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedBooking && (
        <div className="popup">
          <div className="popup-content" data-aos="zoom-in">
            <h3>Booking Details</h3>

            <div className="popup-info">
              <p><strong>Name:</strong> {selectedBooking.name}</p>
              <p><strong>Time:</strong> {selectedBooking.time}</p>
              <p><strong>Guests:</strong> {selectedBooking.guests}</p>
              <p><strong>Table:</strong> {selectedBooking.tableNumber}</p>
            </div>

            <button onClick={() => setSelectedBooking(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableLayout;