import { useContext, useEffect } from "react";
import { ShopContext } from "../../../deliciousBitesContext/ShopContext";
import "./Cart.css";
import AOS from "aos";
import "aos/dist/aos.css";

const Cart = () => {

  const {
    products,
    cartItems,
    updateQuantity,
    removeFromCart,
    getCartAmount,
    clearCart,
    navigate
  } = useContext(ShopContext);



  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div className="cart-container">

      <h2 className="cart-title" data-aos="fade-down">
        🛒 Your Cart
      </h2>

      <div className="cart-wrapper">

        {/* LEFT SIDE */}
        <div className="cart-items">
          {Object.keys(cartItems).length === 0 ? (
            <p className="empty-text">Your cart is empty 😔</p>
          ) : (
            Object.keys(cartItems).map((itemId, index) => {
              const item = products.find(p => p._id === itemId);
              if (!item) return null;

              return (
                <div
                  key={itemId}
                  className="cart-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >

                  {/* IMAGE */}
                  <img src={item.image[0]} alt={item.name} />

                  {/* INFO */}
                  <div className="cart-info">
                    <h4>{item.name}</h4>
                    <p>₹{item.price}</p>

                    {/* QUANTITY */}
                    <div className="qty-box">
                      <button
                        onClick={() => {
                          if (cartItems[itemId] <= 1) {
                            removeFromCart(itemId);
                          } else {
                            updateQuantity(itemId, cartItems[itemId] - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{cartItems[itemId]}</span>
                      <button onClick={() => updateQuantity(itemId, cartItems[itemId] + 1)}>+</button>
                    </div>
                  </div>

                  {/* REMOVE */}
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(itemId)}
                  >
                    ✕
                  </button>

                </div>
              );
            })
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="cart-summary" data-aos="fade-left">

          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{getCartAmount()}</span>
          </div>

          <div className="summary-row">
            <span>Delivery</span>
            <span>₹10</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{getCartAmount() + 10}</span>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/place-order")}
          >
            Proceed to Checkout →
          </button>

          <button className="clear-btn" onClick={clearCart}>
            Clear Cart
          </button>

        </div>

      </div>
    </div>
  );
};

export default Cart;