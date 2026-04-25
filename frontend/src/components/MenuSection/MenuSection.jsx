import React, { useContext, useEffect, useState } from "react";
import "./MenuSection.css";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../../deliciousBitesContext/ShopContext";

// ✅ AOS IMPORT
import AOS from "aos";
import "aos/dist/aos.css";

const MenuSection = () => {
  const { products, addToCart, navigate } = useContext(ShopContext);

  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // // ✅ INIT AOS
  // useEffect(() => {
  //   AOS.init({
  //     duration: 800,
  //     once: true,
  //     easing: "ease-in-out",
  //   });
  // }, []);

  // ✅ PLACE ORDER
  const placeOrder = async (item) => {
    try {
      setLoadingId(item._id);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        navigate("/login")
        return;
      }

      addToCart(item._id);

      setOrders((prev) => [
        ...prev,
        {
          _id: Date.now(),
          itemId: item._id,
          status: "placed",
        },
      ]);

      toast.success("Added to Cart 🛒");

    } catch (err) {
      toast.error("Error");
    } finally {
      setLoadingId(null);
    }
  };

  const getOrder = (itemId) => {
    return orders.find((o) => o.itemId === itemId);
  };

  // ✅ FILTER BREAKFAST
  const breakfastItems = products.filter(
    (item) => item.category === "breakfast"
  );

  return (
    <section className="menu-section">

      <h2
        className="menu-heading"
        data-aos="fade-down"
      >
        Breakfast Menu
      </h2>

      <div className="menu-grid">
        {breakfastItems.map((item, index) => {
          const order = getOrder(item._id);

          return (
            <div
              className="menu-card"
              key={item._id}
              data-aos="fade-up-left"
              data-aos-delay={index * 100}
            >
              <img src={item.image[0]} alt={item.name} />

              <div className="menu-content">
                <h4>{item.name}</h4>
                <p>{item.description}</p>

                <div className="card-bottom">
                  <span>₹{item.price}</span>

                  {!order ? (
                    <button
                      className="order-btn"
                      onClick={() => placeOrder(item)}
                      disabled={loadingId === item._id}
                    >
                      {loadingId === item._id ? "..." : "Order Now"}
                    </button>
                  ) : order.status === "placed" ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>
                      ✅ Order Placed
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};

export default MenuSection;