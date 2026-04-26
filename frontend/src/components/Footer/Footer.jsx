import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* LOGO + ABOUT */}
        <div className="footer-col">
          <h2 className="logo">🍽 Delicious Bites</h2>
          <p>
            Experience the best food with premium quality and taste.
            Fresh ingredients, fast service & cozy dining.
          </p>
        </div>

        {/* NAVIGATION */}
        <div className="footer-col">
          <h4>Navigate</h4>
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Book Table</a>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>📞 +91 98765 43210</p>
          <p>📍 Idar, Gujarat</p>
          <p>✉️ deliciousbites@gmail.com</p>
        </div>

        {/* NEWSLETTER */}
        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>Subscribe for offers & updates</p>

          <div className="newsletter">
            <input type="email" placeholder="Enter email" />
            <button>Subscribe</button>
          </div>

          {/* SOCIAL ICONS */}
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
            <FaTwitter />
          </div>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Delicious Bites. All rights reserved.</p>
      </div>

    </footer>
  );
};

export default Footer;