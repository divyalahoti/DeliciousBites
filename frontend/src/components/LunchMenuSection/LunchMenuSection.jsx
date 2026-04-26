import React, { useContext, useState } from "react";
import "./LunchMenuSection.css";
import { ShopContext } from "../../deliciousBitesContext/ShopContext";
import { toast } from "react-toastify";

const LunchMenuSection = () => {
  const { products, addToCart, navigate } = useContext(ShopContext);


  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // ✅ FILTER LUNCH ITEMS
  const lunchItems = products.filter(
    (item) => item.category === "lunch"
  );

  // ✅ FIND ORDER
  const getOrder = (itemId) => {
    return orders.find((o) => o.itemId === itemId);
  };

  // ✅ PLACE ORDER
  const placeOrder = async (item) => {
    try {
      setLoadingId(item._id);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user || !user._id) {
        navigate("/login")
        // toast.error("Please login first");
        return;
      }

      // ✅ ADD TO CART
      addToCart(item._id);

      // ✅ UPDATE LOCAL ORDER STATE (IMPORTANT)
      setOrders((prev) => [
        ...prev,
        {
          _id: Date.now(),
          itemId: item._id,
          status: "placed"
        }
      ]);

      toast.success("Added to Cart 🛒");

    } catch (err) {
      toast.error("Error");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section id="lunch" className="menu-section">
      <h2 className="menu-heading">Lunch Special Menu</h2>

      <div className="menu-grid">
        {lunchItems.map((item, index) => {
          const order = getOrder(item._id); // ✅ FIXED

          return (
            <div
              className="menu-card"
              key={item._id}
              data-aos="zoom-in-up"
              data-aos-delay={index * 100}
            >
              {/* IMAGE */}
              <div className="menu-img">
                <img src={item.image[0]} alt={item.name} />
              </div>

              {/* CONTENT */}
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
                      {loadingId === item._id ? "Adding..." : "Order Now"}
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

export default LunchMenuSection;