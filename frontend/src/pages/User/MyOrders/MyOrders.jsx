import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./MyOrders.css";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";

const MyOrders = () => {
  const { backendUrl, currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");
      

      // ✅ SAFETY CHECK
      if (!user || !token) {
        console.log("User or token missing");
        setLoading(false);
        return;
      }

      const res = await axios.post(
        backendUrl + "/api/orders/userorders",
        { userId: user._id },
        {
          headers: { token }
        }
      );

      console.log("Orders API:", res.data);

      if (res.data.success) {
        setOrders(res.data.orders.reverse());
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

              <div className="order-top">
                <span className="status">{order.status}</span>
                <span>{new Date(order.date).toLocaleString()}</span>
              </div>

              <div className="order-items">
                {order.items.map((item, i) => (
                  <p key={i}>
                    {item.name} × {item.quantity}
                  </p>
                ))}
              </div>

              <div className="order-bottom">
                <h3>{currency}{order.amount}</h3>
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