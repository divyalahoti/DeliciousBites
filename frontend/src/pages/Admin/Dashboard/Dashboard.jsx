import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Dashboard = () => {

  const [bookings, setBookings] = useState([]);
  const [orders, setOrders] = useState([]);
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
    AOS.init({ duration: 1000, once: true });
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(backendUrl + "/api/admin/today");

      if (res.data.success) {
        setBookings(res.data.bookings);
        setOrders(res.data.orders);
        console.log("Orders from API:", res.data.orders);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const totalOrders = orders.length;

  // const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  // const profit = totalRevenue - totalExpense;

  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0
  );

  return (
    <div className="dashboard">

      {/* HEADER */}
      <div className="dashboard-header" data-aos="fade-down">
        <h2>📊 Admin Dashboard</h2>
        <button onClick={fetchData}>🔄 Refresh</button>
      </div>

      {/* STATS CARDS */}
      <div className="stats-grid">

        <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
          <h4>Total Orders</h4>
          <p>{totalOrders}</p>
        </div>

        <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
          <h4>Revenue</h4>
          <p>₹{totalRevenue}</p>
        </div>


        <div className="stat-card" data-aos="zoom-in" data-aos-delay="200">
          <h4>Total Bookings</h4>
          <p>{bookings.length}</p>
        </div>

        <div className="stat-card" data-aos="zoom-in" data-aos-delay="300">
          <h4>Active Tables</h4>
          <p>{bookings.filter(b => b.status === "active").length}</p>
        </div>



      </div>

      {/* ACTION CARDS */}
      <div className="action-grid">

        <div className="action-card" onClick={() => navigate("/add")} data-aos="fade-up">
          <h3>➕ Add Items</h3>
          <p>Add new dishes to menu</p>
        </div>

        <div className="action-card" onClick={() => navigate("/list")} data-aos="fade-up" data-aos-delay="100">
          <h3>📋 List Items</h3>
          <p>Manage menu items</p>
        </div>

        <div className="action-card" onClick={() => navigate("/table-bookings")} data-aos="fade-up" data-aos-delay="200">
          <h3>🍽 Bookings</h3>
          <p>View reservations</p>
        </div>

        <div className="action-card" onClick={() => navigate("/orders")} data-aos="fade-up" data-aos-delay="300">
          <h3>🧾 Orders</h3>
          <p>All customer orders</p>
        </div>

        <div className="action-card" onClick={() => navigate("/orders-packed")} data-aos="fade-up" data-aos-delay="400">
          <h3>📦 Packed</h3>
          <p>Orders ready to deliver</p>
        </div>

        <div className="action-card" onClick={() => navigate("/table-layout")} data-aos="fade-up" data-aos-delay="500">
          <h3>🪑 Tables</h3>
          <p>Live table layout</p>
        </div>

        <div className="action-card" onClick={() => navigate("/expenses")} data-aos="fade-up" data-aos-delay="500">
          <h3>Expenses</h3>
          <p>View Expenses</p>
        </div>

        <div className="action-card" onClick={() => navigate("/report")} data-aos="fade-up" data-aos-delay="500">
          <h3>📊 Report</h3>
          <p>View full analytics</p>
        </div>


      </div>

    </div>
  );
};

export default Dashboard;