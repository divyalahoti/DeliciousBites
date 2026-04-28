import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import "./MyOrders.css";

const MyOrders = () => {
  const { backendUrl, currency,token,user } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      
      if (!user || !token) {
        setLoading(false);
        return;
      }

      const res = await axios.post(
        backendUrl + "/api/orders/userorders",
        { userId: user._id },
        { headers: { token } }
      );

      console.log("Orders:", res.data);

      if (res.data.success) {
        setOrders(res.data.orders);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ✅ STATUS CLASS HELPER
  const getStatusClass = (status) => {
    if (!status) return "status";

    const formatted = status.toLowerCase().replace(/\s/g, "-");
    return `status ${formatted}`;
  };

  return (
    <div className="myorders-page">

      <h2>🧾 My Orders</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="orders-container">

          {orders.map((order) => (
            <div className="order-card" key={order._id}>

              {/* TOP */}
              <div className="order-top">
                <span className={getStatusClass(order.status)}>
                  {order.status}
                </span>
                <span>
                  {new Date(order.date).toLocaleString()}
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

              {/* BOTTOM */}
              <div className="order-bottom">
                <h3>{currency || "₹"}{order.amount}</h3>
                <p>{order.paymentMethod}</p>
              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
};

export default MyOrders;