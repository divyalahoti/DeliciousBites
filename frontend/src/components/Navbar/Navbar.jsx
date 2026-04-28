import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { ShopContext } from "../../deliciousBitesContext/ShopContext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { getCartCount, user, setUser, token, setToken } = useContext(ShopContext);

  // useEffect(() => {
  //   const loadUser = () => {
  //     // const storedUser = localStorage.getItem("user");
  //     // setUser(storedUser ? JSON.parse(storedUser) : null);w
  //   };
  //   loadUser();
  //   window.addEventListener("storage", loadUser);
  //   return () => window.removeEventListener("storage", loadUser);
  // }, []);

  const handleLogout = () => {
    setToken("");
    setUser(null);
    localStorage.clear();

    setDropdownOpen(false); // Close dropdown on logout
    setMenuOpen(false);     // Close mobile menu on logout
    navigate("/login");
  };

  // Helper to close everything
  const closeAllMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setDropdownOpen(false);
    };

    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="navbar">
      <div className="nav-left">
        <div className="menu-icon" onClick={() => setMenuOpen(true)}>
          <FaBars />
        </div>
        <h2 className="logo" onClick={() => navigate("/")}>
          🍽 Delicious Bites
        </h2>
      </div>

      <ul className="nav-center">
        <li><Link to="/">Home</Link></li>
        <li className="dropdown">
          <span className="menu-trigger">Menu ▾</span>
          <div className="dropdown-menu">
            <Link to="/breakfast" onClick={closeAllMenus}>Breakfast</Link>
            <Link to="/lunch" onClick={closeAllMenus}>Lunch</Link>
            <Link to="/dinner" onClick={closeAllMenus}>Dinner</Link>
          </div>
        </li>
        <li><Link to="/bookingTbl">Book a Table</Link></li>
        {user && <li><Link to="/my-orders">My Orders</Link></li>}
      </ul>

      <div className="nav-right">
        {user && token ? (
          <div className="profile">
            <span onClick={(e) => {
              e.stopPropagation();
              if (user.role === "admin") {
                navigate("/dashboard");
              } else {
                // setDropdownOpen(!dropdownOpen);
                setDropdownOpen((prev) => !prev);
              }
            }}>
              👤 {user.role === "admin" ? "Admin Panel" : `Hi, ${user.name}`}
            </span>

            {user.role !== "admin" && (
              <div className={`profile-dropdown ${dropdownOpen ? "show" : ""}`}>
                <Link to="/cart" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                  🛒 Cart <span className="count">{getCartCount()}</span>
                </Link>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item logout-btn" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}

            {user.role === "admin" && (
              <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
            )}
          </div>
        ) : (
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>

      {/* MOBILE SIDEBAR */}
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}


      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <div className="mobile-header">
          <FaTimes onClick={() => setMenuOpen(false)} />
        </div>

        {/* 1. This wrapper handles the scroll for links only */}
        <div className="mobile-content-wrapper">
          <nav className="mobile-nav-links">
            <Link to="/" onClick={closeAllMenus}>Home</Link>
            {/* <div className="mobile-submenu-section">
              <p className="submenu-title">Our Menu</p>
              <Link to="/breakfast" onClick={closeAllMenus}>Breakfast</Link>
              <Link to="/lunch" onClick={closeAllMenus}>Lunch</Link>
              <Link to="/dinner" onClick={closeAllMenus}>Dinner</Link>
            </div> */}

            <div className="mobile-submenu-section">
              <p className="submenu-title">Our Menu</p>

              <Link to="/breakfast" onClick={closeAllMenus} className="submenu-link">
                🍳 Breakfast
              </Link>

              <Link to="/lunch" onClick={closeAllMenus} className="submenu-link">
                🍛 Lunch
              </Link>

              <Link to="/dinner" onClick={closeAllMenus} className="submenu-link">
                🍽 Dinner
              </Link>
            </div>
            <Link to="/bookingTbl" onClick={closeAllMenus}>Book a Table</Link>
            {user && <Link to="/my-orders" onClick={closeAllMenus}>My Orders</Link>}
          </nav>
        </div>

        {/* 2. This footer stays at the VERY bottom and is NOT inside the scrollable wrapper */}
        {/* {user && (
          <div className="mobile-user-footer">
            <div className="mobile-user-info">
              <span>👤 {user.role === "admin" ? "Admin Panel" : `Hi, ${user.name}`}</span>
            </div>
            <button className="mobile-logout-btn" onClick={handleLogout}>
              Logout
            </button>

            <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          </div>
        )} */}

        {user && token ? (
          <div className="mobile-user-footer">
            <div className="mobile-user-info">
              <span>
                👤 {user.role === "admin" ? "Admin Panel" : `Hi, ${user.name}`}
              </span>
            </div>

            {/* USER (not admin) */}
            {user.role !== "admin" && (
              <Link to="/cart" onClick={closeAllMenus} className="mobile-cart-btn">
                🛒 Cart ({getCartCount()})
              </Link>
            )}

            {/* ADMIN */}
            {user.role === "admin" && (
              <button
                className="mobile-admin-btn"
                onClick={() => {
                  navigate("/dashboard");
                  closeAllMenus();
                }}
              >
                Go to Dashboard
              </button>
            )}

            <button className="mobile-logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="mobile-user-footer">
            <button
              className="mobile-login-btn"
              onClick={() => {
                navigate("/login");
                closeAllMenus();
              }}
            >
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
export default Navbar;

