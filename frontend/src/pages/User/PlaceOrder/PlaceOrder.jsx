import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import AOS from "aos";
import "aos/dist/aos.css";

const PlaceOrder = () => {
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    getCartAmount,
    delivery_fee,
    products,
    clearCart,
    user
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  // ✅ FETCH LAST ORDER (FROM DB ONLY)
  const fetchLastOrder = async () => {
    try {
      const res = await axios.post(
        backendUrl + "/api/orders/last-order",
        { userId: user._id },
        { headers: { token } }
      );

      if (res.data.success) {
        const address = res.data.order.address;

        setFormData({
          firstName: address.firstName || "",
          lastName: address.lastName || "",
          email: address.email || "",
          street: address.street || "",
          city: address.city || "",
          state: address.state || "",
          zipcode: address.zipcode || "",
          country: address.country || "",
          phone: address.phone || "",
        });
      }

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    AOS.init({ duration: 900, once: true });

    if (!token) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    fetchLastOrder(); // ✅ only DB call

  }, [token]);

  // ✅ HANDLE INPUT
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ SUBMIT ORDER
  const onSubmitHandler = async (e) => {
    e.preventDefault();

   

    if (!user || !user._id) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    if (getCartAmount() === 0) {
      toast.error("Cart is empty");
      return;
    }

    let orderItems = [];

    for (const itemId in cartItems) {
      const itemInfo = products.find((p) => p._id === itemId);

      if (itemInfo) {
        orderItems.push({
          ...itemInfo,
          quantity: cartItems[itemId],
        });
      }
    }

    const orderData = {
      userId: user._id,   // ✅ REQUIRED
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee,
    };

    try {
      const response = await axios.post(
        backendUrl + "/api/orders/placeOrder",
        orderData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Order Placed Successfully 🎉");

        await clearCart();  // ✅ clear cart

        navigate("/my-orders");
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="placeorder-container">

      <h2 className="page-title">🧾 Checkout</h2>

      <form onSubmit={onSubmitHandler} className="placeorder-wrapper">

        {/* LEFT */}
        <div className="form-section">
          <h3>Delivery Information</h3>

          <div className="form-grid">
            <input name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" required />
            <input name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" required />
          </div>

          <input name="email" value={formData.email} onChange={onChangeHandler} placeholder="Email" required />
          <input name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" required />

          <div className="form-grid">
            <input name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" required />
            <input name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" required />
          </div>

          <div className="form-grid">
            <input name="zipcode" value={formData.zipcode} onChange={onChangeHandler} placeholder="Zip Code" required />
            <input name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" required />
          </div>

          <input name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone" required />
        </div>

        {/* RIGHT */}
        <div className="summary-section">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartAmount()}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>₹{delivery_fee}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{getCartAmount() + delivery_fee}</span>
          </div>

          <button type="submit" className="place-btn">
            Place Order →
          </button>
        </div>

      </form>
    </div>
  );
};

export default PlaceOrder;

