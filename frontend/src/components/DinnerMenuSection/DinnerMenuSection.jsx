import React, { useContext, useState } from "react";
import "./DinnerMenuSection.css";
import { ShopContext } from "../../deliciousBitesContext/ShopContext";
import BookingModal from "../../pages/User/BookingModal/BookingModal";
import { toast } from "react-toastify";

const DinnerMenuSection = () => {
  const { products, addToCart, navigate, user } = useContext(ShopContext);

  const [loadingId, setLoadingId] = useState(null);
  const [orders, setOrders] = useState([]); // ✅ IMPORTANT
  const [open, setOpen] = useState(false);

  // ✅ FILTER DINNER
  const dinnerItems = products.filter(
    (item) => item.category === "dinner"
  );
  // ✅ GROUP BY SUBCATEGORY
  const groupedData = dinnerItems.reduce((acc, item) => {
    if (!acc[item.subCategory]) {
      acc[item.subCategory] = [];
    }
    acc[item.subCategory].push(item);
    return acc;
  }, {});

  // ✅ ICONS
  const icons = {
    Punjabi: "🍛",
    Gujarati: "🥘",
    "South Indian": "🍽️",
    Chinese: "🥡",
    Italian: "🍕",
    "Dessert & Drinks": "🍰",
  };

  // ✅ FIND ORDER
  const getOrder = (itemId) => {
    return orders.find((o) => o.itemId === itemId);
  };

  // ✅ PLACE ORDER
  const placeOrder = async (item) => {
    try {
      setLoadingId(item._id);
      if (!user || !user._id) {
        navigate("/login")
        toast.error("Please login first");
        return;
      }

      addToCart(item._id);
      // ✅ UPDATE UI STATE
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
    <section id="dinner" className="dinner-section">

      <h2 className="dinner-heading" data-aos="fade-up">
        Dinner Special Menu
      </h2>

      <div className="dinner-grid">
        {Object.keys(groupedData).map((category, index) => (
          <div
            className="dinner-card"
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 150}
          >

            {/* IMAGE */}
            <img
              src={groupedData[category][0]?.image[0]}
              alt={category}
            />

            {/* TITLE */}
            <h3>
              <span>{icons[category] || "🍽️"}</span> {category}
            </h3>

            {/* ITEMS */}
            <ul>
              {groupedData[category].map((item, i) => {
                const order = getOrder(item._id); // ✅ FIX

                return (
                  <li key={i}>
                    <div className="item-top">
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </div>

                    {!order ? (
                      <button
                        className="order-btn"
                        onClick={() => placeOrder(item)}
                        disabled={loadingId === item._id}
                      >
                        {loadingId === item._id ? "Adding..." : "Order Now"}
                      </button>
                    ) : (
                      <p style={{ color: "green", fontWeight: "bold" }}>
                        ✅ Order Placed
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>

          </div>
        ))}
      </div>

      {/* MODAL */}
      {open && <BookingModal close={() => setOpen(false)} />}

    </section>
  );
};

export default DinnerMenuSection;