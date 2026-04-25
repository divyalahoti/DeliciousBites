import React from "react";
import "./MenuSection/MenuSection.css"

const MenuCard = ({ item, order, loadingId, placeOrder, cancelOrder }) => {
  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} />

      <div className="menu-content">
        <h4>{item.name}</h4>
        <p>₹{item.price}</p>

        {/* BUTTON LOGIC */}
        {!order ? (
          <button
            onClick={() => placeOrder(item)}
            disabled={loadingId === item._id}
          >
            {loadingId === item._id ? "Loading..." : "Place Order"}
          </button>

        ) : order.status === "placed" ? (
          <button
            className="cancel-btn"
            onClick={() => cancelOrder(order._id)}
            disabled={loadingId === order._id}
          >
            {loadingId === order._id ? "Loading..." : "Cancel Order"}
          </button>

        ) : null}
      </div>
    </div>
  );
};

export default MenuCard;