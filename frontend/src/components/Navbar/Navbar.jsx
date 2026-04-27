import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { ShopContext } from "../../deliciousBitesContext/ShopContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ setToken }) => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { getCartCount } = useContext(ShopContext);



  useEffect(() => {
    const loadUser = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };

    loadUser();

    // 🔥 update when login/logout happens
    window.addEventListener("storage", loadUser);

    return () => window.removeEventListener("storage", loadUser);
  }, []);

  console.log(JSON.parse(localStorage.getItem("user")));

  const handleLogout = () => {
    localStorage.clear();
    setToken("");
    navigate("/login");
  };

  return (
    <header className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
        <h2 className="logo" onClick={() => navigate("/")}>
          🍽 Delicious Bites
        </h2>
      </div>

      {/* CENTER (DESKTOP) */}
      <ul className="nav-center">
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <span>Menu</span>
          <div className="dropdown-menu">
            <Link to="/breakfast">Breakfast</Link>
            <Link to="/lunch">Lunch</Link>
            <Link to="/dinner">Dinner</Link>
          </div>
        </li>
        <li><Link to="/bookingTbl">Book a Table</Link></li>
        {user && <li><Link to="/my-orders">My Orders</Link></li>}
      </ul>

      {/* RIGHT (DESKTOP) */}
      <div className="nav-right">
        {user ? (
          // <div className="profile">
          //   <span
          //     onClick={(e) => {
          //       e.stopPropagation();

          //       if (user.role === "admin") {
          //         navigate("/dashboard");
          //       } else {
          //         setDropdownOpen(!dropdownOpen);
          //       }
          //     }}
          //   >
          //     👤  {user.role === "admin" ? "Admin Panel" : user.name}


          //   </span>
          //     <button className="logout-btn" onClick={handleLogout}>
          //       🚪 Logout
          //     </button>

          //   <div className={`profile-dropdown ${dropdownOpen ? "show" : ""}`}>

          //     {user.role !== "admin" && (
          //       <Link to="/cart" className="dropdown-item">
          //         🛒 <span>Cart</span>
          //         <span className="count">{getCartCount()}</span>
          //       </Link>
          //     )}

          //     {user.role === "admin" && (
          //       <div
          //         className="dropdown-item"
          //         onClick={() => navigate("/dashboard")}
          //       >
          //         ⚙️ <span>Admin Panel</span>
          //       </div>
          //     )}

          //     <div className="dropdown-divider"></div>

          //     <button className="dropdown-item logout-btn" onClick={handleLogout}>
          //       🚪 Logout
          //     </button>

          //   </div>
          // </div>

          <div className="profile">
            <span
              onClick={(e) => {
                e.stopPropagation();

                if (user.role === "admin") {
                  navigate("/dashboard");
                } else {
                  setDropdownOpen(!dropdownOpen);
                }
              }}
            >
              👤 {user.role === "admin" ? "Admin Panel" : `Hi, ${user.name}`}
            </span>

            {/* ✅ ONLY for normal user dropdown */}
            {user.role !== "admin" && (
              <div className={`profile-dropdown ${dropdownOpen ? "show" : ""}`}>

                <Link to="/cart" className="dropdown-item">
                  🛒 Cart
                  <span className="count">{getCartCount()}</span>
                </Link>

                <div className="dropdown-divider"></div>

                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  🚪 Logout
                </button>

              </div>
            )}

            {/* ✅ ADMIN LOGOUT BUTTON (SEPARATE) */}
            {user.role === "admin" && (
              <button className="admin-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        )}
      </div>


      {/* MOBILE SIDEBAR */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <FaTimes onClick={() => setMenuOpen(false)} />
        </div>

        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/breakfast" onClick={() => setMenuOpen(false)}>Breakfast</Link>

        <Link to="/lunch" onClick={() => setMenuOpen(false)} >Lunch</Link>
        <Link to="/dinner" onClick={() => setMenuOpen(false)}>Dinner</Link>
        <Link to="/bookingTbl" onClick={() => setMenuOpen(false)}>Book a Table</Link>

        {user && (
          <>
            <Link to="/my-orders">My Orders</Link>

            {user.role !== "admin" && (
              <Link to="/cart">🛒 Cart ({getCartCount()})</Link>
            )}

            <div className="mobile-user">
              <span>
                👤 Hi, {user.role === "admin" ? "Admin Panel" : user.name}
              </span>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>
        )}
      </div>

    </header>
  );
};

export default Navbar;