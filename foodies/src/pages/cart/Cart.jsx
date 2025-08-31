import React from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";

const CartPage = () => {
  const navigate = useNavigate();
  const {
    foodlist,
    increaseQuantity,
    decreaseQuantity,
    quantities = {},
    removeItemFromCart,
  } = useContext(StoreContext);

  //cart items
  const cartItems = Array.isArray(foodlist)
    ? foodlist.filter((item) => quantities[item.id] > 0)
    : [];

  //calculating
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * quantities[item.id],
    0
  );
  const shipping = cartItems.length * 5;
  const tax = subtotal * 0.02; // Assuming a 2% tax rate
  const total = subtotal + shipping + tax;

  function updateQuantity(productId, change) {
    const input = event.target.parentElement.querySelector(".quantity-input");
    let value = parseInt(input.value) + change;
    if (value >= 1) {
      input.value = value;
    }
  }
  return (
    <div className="cart-wrapper">
      <div className="container">
        <div className="row g-4">
          {/* Cart Items Section */}
          <div className="col-lg-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center mb-3 mt-4">
                <img
                  src={assets.cart}
                  alt="payment"
                  height={32}
                  style={{ marginRight: "12px" }}
                />
                <h4
                  className="mb-0"
                  style={{ color: "#ff9800", fontWeight: "bold" }}
                >
                  Shopping Cart
                </h4>
              </div>
              <span className="text-muted">
                {cartItems.length == 0 ? "0" : cartItems.length} items
              </span>
            </div>

            {/* Product Cards */}
            {cartItems.length === 0 ? (
              <div
                className="d-flex flex-column gap-3 align-items-center"
                style={{ marginTop: "10rem" }}
              >
                <p className="text-center py-10">Your cart is empty.</p>
                <Link
                  to="/"
                  className="btn btn-warning fw-semibold btn-lg"
                  type="button"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div className="d-flex flex-column py-1 " key={item.id}>
                  <div
                    className="product-card p-3 shadow-sm"
                    style={{
                      borderRadius: "18px",
                      border: "2px solid #ffe5b4",
                    }}
                  >
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <Link to={`/food/${item.id}`}>
                          <img
                            src={item.imageUrl}
                            alt="Product"
                            className="product-image"
                          />
                        </Link>
                      </div>
                      <div className="col-md-4">
                        <h6 className="mb-1">{item.name}</h6>
                        <p className="text-muted mb-0">
                          Category: {item.category}
                        </p>
                      </div>
                      <div className="col-md-3">
                        <div className="d-flex align-items-center gap-2">
                          <button
                            className="quantity-btn"
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="quantity-input"
                            value={quantities[item.id]}
                            min="1"
                            readOnly
                          />
                          <button
                            className="quantity-btn"
                            onClick={() => increaseQuantity(item.id)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="col-md-2">
                        <span className="fw-bold">&#x24;{item.price}</span>
                      </div>
                      <div className="col-md-1">
                        <button
                          className="btn btn-link p-0"
                          onClick={() => removeItemFromCart(item.id)}
                        >
                          <i className="bi bi-trash remove-btn"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            {cartItems.length > 0 && (
              <div className="d-flex justify-content-start mt-4">
                <button
                  className="btn btn-warning btn-md text-light"
                  type="button"
                >
                  <i className="bi bi-arrow-left fw-semibold me-2"></i>
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* <!-- Summary Section --> */}

          <div className="col-lg-4">
            <div
              className="summary-card p-4 mt-4 shadow-sm"
              style={{
                background: "#fffbe5",
                borderRadius: "18px",
                border: "2px dashed #ffc107",
              }}
            >
              <div className="d-flex align-items-center mb-8">
                <img
                  src={assets.cart}
                  alt="cart"
                  height={40}
                  style={{ marginRight: "12px" }}
                />
                <h4
                  className="mb-0"
                  style={{
                    color: "#ff9800",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                  }}
                >
                  Order Summary
                </h4>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Subtotal</span>
                <span>&#x24;{subtotal.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Shipping</span>
                <span>&#x24;{shipping.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Tax</span>
                <span>&#x24;{tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <span className="fw-bold">Total</span>
                <span className="fw-bold">&#x24;{total.toFixed(2)}</span>
              </div>

              {/* <!-- Promo Code --> 
              <div className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Promo code"
                    onFocus={(e) => {
                      e.target.style.borderColor = "orange";
                      e.target.style.boxShadow =
                        "0 0 0 0.2rem rgba(255,140,0,0.25)";
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = "#ced4da";
                      e.target.style.boxShadow = "none";
                    }}
                  />
                  <button
                    className="btn btn-outline-secondary text-dark"
                    type="button"
                  >
                    Apply
                  </button>
                </div>
              </div>*/}

              <button
                className="btn btn-warning checkout-btn fw-bold btn-lg w-100 mb-3"
                disabled={cartItems.length === 0}
                onClick={() => navigate("/order")}
              >
                Proceed to Checkout
              </button>

              <div className="d-flex justify-content-center gap-2">
                <i className="bi bi-shield-check text-success"></i>
                <small class="text-muted">Secure checkout</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
