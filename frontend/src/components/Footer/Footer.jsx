import React from 'react'
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container" data-aos="fade-up">

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>📞 +91 98765 43210</p>
          <p>📍 Idar, Gujarat</p>
          <p>✉️ deliciousbites@gmail.com</p>
        </div>

        {/* Navigate */}
        <div className="footer-col">
          <h4>Navigate</h4>
          <a href="#">Home</a>
          <a href="#">Menu</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Book Now</a>
        </div>

        {/* Menu */}
        <div className="footer-col">
          <h4>Menu</h4>
          <a href="#breakfast">Breakfast</a>
          <a href="#lunch">Lunch</a>
          <a href="#dinner">Dinner</a>
        </div>

        {/* Social */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
          <a href="#">Twitter</a>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Delicious Bites. All rights reserved.</p>
      </div>

    </footer>
  )
}

export default Footer
