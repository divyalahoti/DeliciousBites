import React, { useState, useEffect } from "react";
import "./Testimonial.css";

import t1 from "../../assets/testimonial_1.jpg";
import t2 from "../../assets/testimonial_2.jpg";
import t3 from "../../assets/testimonial_3.jpg";


const Testimonial = () => {

  const testimonials = [
    {
      text: "Amazing food and great service. I always enjoy my time here with family!",
      name: "Radhika Sharma",
      role: "Food Lover",
      image: t1
    },
    {
      text: "The taste is authentic and delicious. Highly recommended for food lovers!",
      name: "Divya Patel",
      role: "Customer",
      image: t2
    },
    {
      text: "Beautiful ambience and tasty dishes. Best restaurant experience!",
      name: "Neha Shah",
      role: "Visitor",
      image: t3
    }
  ];

  const [index, setIndex] = useState(0);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="testimonial">

      <div className="testimonial-container">

        {/* LEFT TEXT */}
        <div className="testimonial-text" data-aos="fade-right">

          <p className="quote">
            “{testimonials[index].text}”
          </p>

          <div className="profile">
            <img src={testimonials[index].image} alt="" />
            <div>
              <h5>{testimonials[index].name}</h5>
              <span>{testimonials[index].role}</span>
            </div>
          </div>

          {/* DOTS */}
          <div className="dots">
            {testimonials.map((_, i) => (
              <span key={i} className={i === index ? "active" : ""}></span>
            ))}
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="testimonial-image" data-aos="fade-left">
          <img src={testimonials[index].image} alt="" />
        </div>

      </div>

    </div>
  );
};

export default Testimonial;