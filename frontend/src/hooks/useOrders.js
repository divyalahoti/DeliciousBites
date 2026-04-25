import { useState } from "react";
import axios from "axios";

const useOrders = (backendUrl) => {
  const [orders, setOrders] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  // PLACE ORDER
  const placeOrder = async (item) => {
    try {
      setLoadingId(item._id);

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(backendUrl + "/api/orders", {
        itemId: item._id,
        userId: user._id,
      });

      setOrders((prev) => [...prev, res.data]);

    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId(null);
    }
  };

  // CANCEL ORDER
  const cancelOrder = async (orderId) => {
    try {
      setLoadingId(orderId);

      const res = await axios.put(
        backendUrl + `/api/orders/${orderId}/cancel`
      );

      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? res.data : o))
      );

    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId(null);
    }
  };

  // FIND ORDER
  const getOrder = (itemId) => {
    return orders.find((o) => o.itemId === itemId);
  };

  return { orders, loadingId, placeOrder, cancelOrder, getOrder };
};

export default useOrders;