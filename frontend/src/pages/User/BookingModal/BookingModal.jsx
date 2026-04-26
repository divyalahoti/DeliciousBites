import { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import bg1 from "../../../assets/bg1.png";
import { FaWhatsapp, FaInstagram, FaFacebookF } from "react-icons/fa";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import "./BookingModal.css";

const BookingModal = () => {

  const { backendUrl, navigate } = useContext(ShopContext);

  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    mealType: "",
    date: "",
    time: "",
    guests: ""
  });

  // 🍽 TIME SLOTS
  const getTimeSlots = (meal) => {
    if (meal === "Breakfast") return ["08:00", "09:00", "10:00", "11:00"];
    if (meal === "Lunch") return ["12:00", "13:00", "14:00", "15:00"];
    if (meal === "Dinner") return ["19:00", "20:00", "21:00", "22:00"];
    return [];
  };



  // 🔁 HANDLE INPUT
  const handleChange = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);

    if (e.target.name === "mealType") {
      setTimeSlots(getTimeSlots(e.target.value));
      setSelectedTable(null);
    }

    if (updated.date && updated.time) {
      fetchTables(updated.date, updated.time);
      setSelectedTable(null);
    }
  }

  // 📡 FETCH TABLES
  const fetchTables = async (date, time) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/booking/tables?date=${date}&time=${time}`
      );

      const booked = res.data.bookedTables || [];

      const allTables = Array.from({ length: 12 }, (_, i) => i + 1);

      const tableData = allTables.map((num) => ({
        number: num,
        booked: booked.includes(num),
      }));

      setTables(tableData);

    } catch (err) {
      console.log(err);
      toast.error("Error fetching tables");
    }
  };

  // 📩 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    // ✅ LOGIN CHECK (IMPORTANT)
    if (!user || !user._id) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (form.duration < 1 || form.duration > 3) {
      toast.error("Duration must be between 1 to 3 hours");
      return;
    }

    if (tables.find(t => t.number === selectedTable && t.booked)) {
      toast.error("This table is already booked");
      return;
    }

    if (!selectedTable) {
      toast.error("Please select a table");
      return;
    }

    try {
      const res = await axios.post(`${backendUrl}/api/booking`, {
        ...form,
        tableNumber: selectedTable,
        userId: user._id // ✅ OPTIONAL (recommended)
      });

      if (res.data.success) {
        toast.success(`Table ${selectedTable} booked ✅`);
        setSelectedTable(null);
        fetchTables(form.date, form.time);
        navigate("/")
      } else {
        toast.error(res.data.message || "Booking failed");
      }

    } catch (err) {
      console.log(err);
      toast.error("Server error");
    }
  };

  return (
    <section className="booking-section" style={{ backgroundImage: `url(${bg1})` }}>
      <h2 className="booking-title" data-aos="fade-down">Book Your Table</h2>

      <div className="booking-container">

        {/* LEFT INFO */}
        <div className="booking-info" data-aos="fade-right" data-aos-delay="200">
          <h3 data-aos="fade-up">Reserve Your Experience 🍽</h3>
          <p data-aos="fade-up" data-aos-delay="100">
            Book your table quickly and enjoy delicious meals.<br />
            We’d love to hear from you! Visit us or reach out anytime.
          </p>

          {/* ADDRESS */}
          <div className="info-box" data-aos="fade-up" data-aos-delay="200">
            <span>📍 4, Madhuvan, Idar, Gujarat</span>
          </div>

          {/* PHONE */}
          <div className="info-box" data-aos="fade-up" data-aos-delay="300">
            <span>📞 +91 98765 43210</span>
          </div>

          {/* EMAIL */}
          <div className="info-box" data-aos="fade-up" data-aos-delay="400">
            <span>✉️ deliciousbites@gmail.com</span>
          </div>

          {/* HOURS */}
          <div className="info-box" data-aos="fade-up" data-aos-delay="500">
            <span>Mon - Fri: 9 AM - 10 PM <br />
              Sat - Sun: 8 AM - 11 PM</span>
          </div>

          {/* SOCIAL */}
          <div
            className="social-links"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <FaWhatsapp />     <FaInstagram />     <FaFacebookF />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="booking-form-box" data-aos="fade-left" data-aos-delay="300">
          <h3>Reserve Table 🍽</h3>

          <form onSubmit={handleSubmit} className="booking-form">
            <label>Full Name</label>
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />

            <label>Phone Number</label>
            <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />

            <label>Select Meal</label>
            <select name="mealType" onChange={handleChange} required>
              <option value="">Select Meal</option>
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>

            <label>Select Date</label>
            <input
              type="date"
              name="date"
              min={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              required
            />
            <label>Select Time</label>
            <select name="time" onChange={handleChange} required>
              <option value="">Select Time</option>
              {timeSlots.map((t, i) => (
                <option key={i}>{t}</option>
              ))}
            </select>
            <label> Duration</label>
            <input
              type="number"
              name="duration"
              min="1"
              max="3"
              onChange={handleChange}
              required
            />

            <label>Select Guests</label>
            <input type="number" name="guests" placeholder="Number of Guests" onChange={handleChange} required />

            {selectedTable && (
              <p style={{ color: "#1c3b2f", fontWeight: "bold" }}>
                Selected Table: {selectedTable}
              </p>
            )}
            {/* TABLE GRID */}
            <div className="table-grid">
              {tables.map((t) => (
                <div
                  key={t.number}
                  className={`table-box 
                    ${t.booked ? "booked" : ""} 
                    ${selectedTable === t.number ? "selected" : ""}`}
                  onClick={() => !t.booked && setSelectedTable(t.number)}
                >
                  {t.number}
                </div>
              ))}
            </div>

            <button type="submit" disabled={!selectedTable}>
              Book Table
            </button>

          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingModal;
