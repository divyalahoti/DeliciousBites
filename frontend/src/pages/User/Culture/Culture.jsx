import React from "react";
import "./Culture.css";

import c1 from "../../../assets/culture_food1.jpg";
import c2 from "../../../assets/culture_food2.jpg";
import c3 from "../../../assets/culture_food3.jpg";
import c4 from "../../../assets/culture_food4.jpg";
import c5 from "../../../assets/culture_food5.jpg";
import c6 from "../../../assets/culture_food6.jpg";

const Culture = () => {
  const images = [c1, c2, c3, c4, c5, c6];
  

  return (
    <div className="culture">
     <h2 data-aos="fade-up">Our Culture</h2>

      <div className="slider" data-aos="zoom-in">
        <div className="slide-track">

          {/* Duplicate images for infinite loop */}
          {[...images, ...images].map((img, index) => (
            <div className="slide" key={index}>
              <img src={img} alt="food" />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Culture;