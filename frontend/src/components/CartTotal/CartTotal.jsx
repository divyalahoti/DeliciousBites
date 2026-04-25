import React, { useContext } from 'react';
import { ShopContext } from "../../context/ShopContext";
import "./CartTotal.css";

const CartTotal = () => {

  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  const subTotal = getCartAmount();
  const total = subTotal === 0 ? 0 : subTotal + delivery_fee;

  return (
    <div className="cart-total-card">

      <h2 className="cart-total-title">Order Summary</h2>

      <div className="cart-total-details">

        <div className="row">
          <span>Subtotal</span>
          <span>{currency} {subTotal}.00</span>
        </div>

        <div className="row">
          <span>Delivery Fee</span>
          <span>{currency} {delivery_fee}.00</span>
        </div>

        <div className="divider"></div>

        <div className="row total">
          <span>Total</span>
          <span>{currency} {total}.00</span>
        </div>

      </div>

      {/* CTA BUTTON */}
      <button className="checkout-btn">
        Proceed to Payment
      </button>

    </div>
  );
};

export default CartTotal;