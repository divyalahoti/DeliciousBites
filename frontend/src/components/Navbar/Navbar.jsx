import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import cart_icon from "../../assets/cart_icon.jpg";
import { ShopContext } from "../../deliciousBitesContext/ShopContext";

const Navbar = ({ setToken }) => {


  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const { getCartCount } = useContext(ShopContext);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [localStorage.getItem("user")]);


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    navigate("/login"); // ✅ ADD THIS
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <h3 onClick={() => navigate("/")}>🍽 Delicious Bites</h3>

      </div>

     <ul className="nav-center">
  {/* HOME */}
  <li className="home">
    <Link to="/#home">Home</Link>
  </li>

  <li className="dropdown">
    <div className="menu-btn">Menu</div>
    <div className="dropdown-menu">
      <Link to="/breakfast">Breakfast</Link>
      <Link to="/lunch">Lunch</Link>
      <Link to="/dinner">Dinner</Link>
    </div>
  </li>

  {/* Book a Table */}
  <li className="bookingTbl">
    <Link to="/bookingTbl">Book a Table</Link>
  </li>

  {/* My Orders */}
  {user && user.role !== "admin" && (
    <li className="myOrders">
      <Link to="/my-orders">My Orders</Link>
    </li>
  )}
</ul>

      {/* ✅ CART ICON */}


      {/* BUTTON */}
      <div className="nav-right">
        {user && user.role !== "admin" && (
          <Link to="/cart" className="cart-icon">
            <img src={cart_icon} alt="cart" />
            {getCartCount() > 0 && (
              <span className="cart-count">{getCartCount()}</span>
            )}

          </Link>
        )}

        {!user ? (
          <Link to="/login">
            <button className="call-btn" onClick={() => setToken("")}>Login</button>
          </Link>
        ) : (
          <>
            {/* ✅ SHOW NAME OR ADMIN */}
            <span
              className="user-name"
              onClick={() => user?.role === "admin" && navigate("/dashboard")}
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