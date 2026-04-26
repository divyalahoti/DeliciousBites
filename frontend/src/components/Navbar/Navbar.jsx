import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import cart_icon from "../../assets/cart_icon.jpg";
import { ShopContext } from "../../deliciousBitesContext/ShopContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ setToken }) => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { getCartCount } = useContext(ShopContext);

  // ✅ FIX: Listen for login/logout changes
  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    window.addEventListener("storage", loadUser); // auto update
    return () => window.removeEventListener("storage", loadUser);
  }, []);

  // ✅ LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/login");
  };

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>
        <h3 onClick={() => navigate("/")}>🍽 Delicious Bites</h3>
      </div>

      {/* CENTER */}
      <ul className={`nav-center ${menuOpen ? "active" : ""}`}>

        <li onClick={() => setMenuOpen(false)}>
          <Link to="/#home">Home</Link>
        </li>

        {/* DROPDOWN */}
        <li className="dropdown">
          <div
            className="menu-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            Menu
          </div>

          <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
            <Link to="/breakfast" onClick={() => setMenuOpen(false)}>Breakfast</Link>
            <Link to="/lunch" onClick={() => setMenuOpen(false)}>Lunch</Link>
            <Link to="/dinner" onClick={() => setMenuOpen(false)}>Dinner</Link>
          </div>
        </li>

        <li onClick={() => setMenuOpen(false)}>
          <Link to="/bookingTbl">Book a Table</Link>
        </li>

        {/* ✅ MY ORDERS */}
        {user && user.role !== "admin" && (
          <li onClick={() => setMenuOpen(false)}>
            <Link to="/my-orders">My Orders</Link>
          </li>
        )}
      </ul>

      {/* RIGHT */}
      <div className="nav-right">

        {/* ✅ CART */}
        {user && user.role !== "admin" && (
          <Link to="/cart" className="cart-icon">
            <img src={cart_icon} alt="cart" />
            {getCartCount() > 0 && (
              <span className="cart-count">{getCartCount()}</span>
            )}
          </Link>
        )}

        {/* ✅ LOGIN */}
        {!user ? (
          <Link to="/login">
            <button className="call-btn">Login</button>
          </Link>
        ) : (
          <>
            {/* ✅ USER / ADMIN */}
            <span
              className="user-name"
              onClick={() =>
                user?.role === "admin" && navigate("/dashboard")
              }
            >
              {user?.role === "admin" ? "Admin Panel" : user?.name}
            </span>

            {/* ✅ LOGOUT */}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;