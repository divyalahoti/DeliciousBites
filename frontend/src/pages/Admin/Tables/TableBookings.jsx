import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./TableBookings.css";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import AOS from "aos";
import "aos/dist/aos.css";

const TableBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { backendUrl } = useContext(ShopContext);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await axios.get(backendUrl + "/api/admin/today");
    if (res.data.success) setBookings(res.data.bookings);
  };

  const cancelBooking = async (id) => {
    const res = await axios.delete(`${backendUrl}/api/booking/${id}`);
    if (res.data.success) fetchBookings();
  };

  // ✅ SMART FILTER (handles all types safely)
  const filteredBookings = bookings.filter((b) => {
    // const text = search.toLowerCase();
    const text = debouncedSearch.toLowerCase();

    const meal =
      Array.isArray(b.mealType)
        ? b.mealType.join(" ").toLowerCase()
        : (b.mealType || "").toString().toLowerCase();

    return (
      (b.name || "").toLowerCase().includes(text) ||
      (b.phone || "").toString().includes(text) ||
      meal.includes(text) ||
      (b.date || "").toLowerCase().includes(text) ||
      (b.time || "").toLowerCase().includes(text) ||
      (b.tableNumber || "").toString().includes(text) ||
      (b.guests || "").toString().includes(text)
    );
  });

  return (
    <div className="booking-page">

      {/* HEADER */}
      <div className="booking-header" data-aos="fade-down">
        <div>
          <h2>🍽 Table Bookings</h2>
          <p>Manage and track all reservations efficiently</p>
        </div>

        {/* SEARCH */}
        <div className="booking-controls">
          <input
            type="text"
            placeholder="🔍 Search name, phone, table..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredBookings.length === 0 ? (
        <div className="empty-box" data-aos="fade-up">
          <p>No bookings found</p>
        </div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="booking-table-wrapper" data-aos="fade-up">
            <table className="booking-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>Meal</th>
                  <th>Date & Time</th>
                  <th>Guests</th>
                  <th>Table</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredBookings.map((b) => (
                  <tr key={b._id}>
                    <td>
                      <strong>{b.name}</strong>
                    </td>

                    <td>{b.phone}</td>

                    <td>
                      <span className="meal-badge">{b.mealType}</span>
                    </td>

                    <td>
                      <div className="date-time">
                        <span>{b.date}</span>
                        <small>{b.time}</small>
                      </div>
                    </td>

                    <td>{b.guests}</td>

                    <td>
                      <span className="table-badge">
                        #{b.tableNumber}
                      </span>
                    </td>

                    <td>
                      <button
                        className="cancel-btn"
                        onClick={() => cancelBooking(b._id)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="booking-cards">
            {filteredBookings.map((b, index) => (
              <div
                className="booking-card"
                key={b._id}
                data-aos="fade-up"
                data-aos-delay={index * 70}
              >
                <div className="card-top">
                  <h4>{b.name}</h4>
                  <span className="meal-badge">{b.mealType}</span>
                </div>

                <p>📞 {b.phone}</p>
                <p>📅 {b.date} • ⏰ {b.time}</p>
                <p>👥 {b.guests} Guests</p>

                <div className="card-bottom">
                  <span className="table-badge">
                    Table #{b.tableNumber}
                  </span>

                  <button
                    className="cancel-btn"
                    onClick={() => cancelBooking(b._id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TableBookings;