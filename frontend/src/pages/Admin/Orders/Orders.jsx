import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";

const Orders = ({ filter }) => {
  const [orders, setOrders] = useState([]);
  const { backendUrl, currency } = useContext(ShopContext);
  

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(backendUrl + "/api/orders/list");

      if (res.data.success) {
        let data = res.data.orders.reverse();

        if (filter === "packed") {
          data = data.filter((o) => o.status === "Packing");
        }

        setOrders(data);
      }
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.post(backendUrl + "/api/orders/status", {
        orderId: id,
        status,
      });

      toast.success("Status Updated ✅");
      fetchOrders();
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  return (
    <div className="orders-page">

      {/* HEADER */}
      <div className="orders-header" data-aos="fade-down">
        <h2>
          {filter === "packed" ? "📦 Packed Orders" : "🍽 All Orders"}
        </h2>
        <p>Manage and track all customer orders</p>
      </div>

      {/* EMPTY */}
      {orders.length === 0 ? (
        <p className="empty">No orders found</p>
      ) : (

        <div className="orders-grid">
          {orders.map((order, index) => {

            // ✅ SAFE ADDRESS (fix error)
            const address = order.address || {};

            return (
              <div
                className="order-card"
                key={order._id}
                data-aos="fade-up"
                data-aos-delay={index * 80}
              >

                {/* TOP */}
                <div className="order-top">
                  <div>
                    <h4>
                      {address.firstName || "Guest"} {address.lastName || ""}
                    </h4>
                    <span className="order-id">
                      #{order._id.slice(-6)}
                    </span>
                  </div>

                  <span className={`status-badge ${order.status.replace(/\s/g, "").toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>

                {/* ITEMS */}
                <div className="order-items">
                  {order.items.map((item, i) => (
                    <p key={i}>
                      {item.name} × {item.quantity}
                    </p>
                  ))}
                </div>

                {/* INFO */}
                <div className="order-info">
                  <p>📍 {address.city || "N/A"}</p>
                  <p>📞 {address.phone || "N/A"}</p>
                  <p>💳 {order.paymentMethod}</p>
                </div>

                {/* BOTTOM */}
                <div className="order-bottom">
                  <h3>
                    {currency}
                    {order.amount}
                  </h3>

                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option>Order Placed</option>
                    <option>Packing</option>
                    <option>Shipped</option>
                    <option>Out for delivery</option>
                    <option>Delivered</option>
                  </select>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;