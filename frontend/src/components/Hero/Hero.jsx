import React, { useState, useEffect } from "react";
import "./Hero.css";

import food1 from "../../assets/food1.jpg";
import food2 from "../../assets/food2.jpg";
import food3 from "../../assets/food3.jpg";
import food4 from "../../assets/food4.jpg";
import food5 from "../../assets/food5.jpg";
import food6 from "../../assets/food6.jpg";
import food7 from "../../assets/food7.jpg";

const Hero = () => {

  const [images, setImages] = useState([
    food1,
    food2,
    food3,
    food4,
    food5,
    food6,
    food7
  ]);

  // Rotate images (left → right loop)
  useEffect(() => {
    const interval = setInterval(() => {
      setImages((prev) => {
        const newArr = [...prev];
        const first = newArr.shift();   // remove first
        newArr.push(first);             // add to last
        return newArr;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" className="hero-section">

      <h1 data-aos="fade-up">
        Dive Into Delicious <br /> Meal Dishes
      </h1>

      <div className="hero-images" data-aos="zoom-in">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            className={index === 3 ? "active" : ""} // middle = index 2
          />
        ))}
      </div>

    </div>
  );
};

export default Hero;