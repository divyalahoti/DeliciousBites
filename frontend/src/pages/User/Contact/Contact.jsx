import React from "react";
import "./Contact.css";
import bg1 from "../../assets/bg1.png";
const Contact = () => {
  return (

    <section
      className="contact-section"
      style={{ backgroundImage: `url(${bg1})` }}
    >

      {/* TITLE */}
      <h2
        className="contact-title"
        data-aos="fade-down"
      >
        Contact Us
      </h2>

      <div className="contact-container">

        {/* LEFT SIDE INFO */}
        <div
          className="contact-info"
          data-aos="fade-right"
          data-aos-delay="200"
        >

          <h3 data-aos="fade-up">Get in Touch</h3>

          <p data-aos="fade-up" data-aos-delay="100">
            We’d love to hear from you! Visit us or reach out anytime.
          </p>

          {/* ADDRESS */}
          <div className="info-box" data-aos="fade-up" data-aos-delay="200">
            <span>📍</span>
            <p>4, Madhuvan, Idar, Gujarat</p>
          </div>

          {/* PHONE */}
          <div className="info-box" data-aos="fade-up" data-aos-delay="300">
            <span>📞</span>
            <p>
              <a href="tel:+919876543210">
                +91 98765 43210
              </a>
            </p>
          </div>

          {/* EMAIL */}
          <div className="info-box" data-aos="fade-up" data-aos-delay="400">
            <span>✉️</span>
            <p>
              <a href="mailto:deliciousbites@gmail.com">
                deliciousbites@gmail.com
              </a>
            </p>
          </div>

          {/* HOURS */}
          <div className="info-box" data-aos="fade-up" data-aos-delay="500">
            <span>⏰</span>
            <p>
              Mon - Fri: 9 AM - 10 PM <br />
              Sat - Sun: 8 AM - 11 PM
            </p>
          </div>

          {/* SOCIAL */}
          <div
            className="social-links"
            data-aos="zoom-in"
            data-aos-delay="600"
          >
            <a href="#">whatsapp</a>
            <a href="#">instagram</a>
            <a href="#">facebook</a>
          </div>

        </div>

        {/* RIGHT SIDE FORM */}
        <div
          className="contact-form"
          data-aos="fade-left"
          data-aos-delay="300"
        >

          <h3 data-aos="fade-up">Send Message</h3>

          <form>

            <input type="text" placeholder="Your Name" required data-aos="fade-up" data-aos-delay="100" />
            <input type="email" placeholder="Your Email" required data-aos="fade-up" data-aos-delay="200" />
            <input type="text" placeholder="Subject" data-aos="fade-up" data-aos-delay="300" />

            <textarea placeholder="Your Message" rows="5" data-aos="fade-up" data-aos-delay="400"></textarea>

            <button type="submit" data-aos="zoom-in" data-aos-delay="500">
              Send Message
            </button>

          </form>

        </div>

      </div>

    </section>
  );
};

export default Contact;