import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// COMPONENTS
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";

// USER PAGES
import Home from "./pages/User/Home/Home";
import Hero from "./components/Hero/Hero";
import MenuSection from "./components/MenuSection/MenuSection";
import LunchMenuSection from "./components/LunchMenuSection/LunchMenuSection";
import DinnerMenuSection from "./components/DinnerMenuSection/DinnerMenuSection";
import Testimonial from "./components/Testimonial/Testimonial";
import Culture from "./pages/User/Culture/Culture";
import BookingModal from "./pages/User/BookingModal/BookingModal";
import Cart from "./pages/User/Cart/Cart";
import PlaceOrder from "./pages/User/PlaceOrder/PlaceOrder";
import MyOrders from "./pages/User/MyOrders/MyOrders";

// ADMIN PAGES
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import List from "./pages/Admin/List/List";
import Orders from "./pages/Admin/Orders/Orders";
import Add from "./pages/Admin/Add/Add";
import TableBookings from "./pages/Admin/Tables/TableBookings";
import TableLayout from "./pages/Admin/Tables/TableLayout";
import Expenses from "./pages/Admin/Expenses/Expenses";
import Report from "./pages/Admin/Report/Report";
import ScrollToTop from "./components/ScrollToTop";
import "../src/App.css"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // SAVE TOKEN
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);

  // AOS ANIMATION INIT
  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar setToken={setToken} />
      <ToastContainer />
      <hr />
      {/* ROUTES */}
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        {/* USER ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/hero" element={<Hero />} />
        <Route path="/breakfast" element={<MenuSection />} />
        <Route path="/lunch" element={<LunchMenuSection />} />
        <Route path="/dinner" element={<DinnerMenuSection />} />
        <Route path="/testimonial" element={<Testimonial />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/bookingTbl" element={<BookingModal />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder />} />
        
        <Route path="/table-bookings" element={<TableBookings />} />
        <Route path="/table-layout" element={<TableLayout />} />
        
        <Route path="/my-orders" element={<MyOrders />} />

        {/* ADMIN ROUTES */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        <Route path="/add" element={<Add token={token} />} />
        <Route path="/list" element={<List token={token} />} />
        <Route path="/orders" element={<Orders token={token} />} />
        <Route path="/orders-packed" element={<Orders filter="packed" />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/report" element={<Report />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;