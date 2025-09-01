import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { assets } from "../../assets/assets";
import "./PlaceOrder.css";
import { placeOrder } from "../../service/ordersService";
import { loadStripe } from "@stripe/stripe-js";

const PlaceOrder = () => {
  const { foodlist, quantities, setQuantities, token } =
    useContext(StoreContext);
  const cartItems = Array.isArray(foodlist)
    ? foodlist.filter((item) => quantities[item.id] > 0)
    : [];
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * quantities[item.id],
    0
  );
  const shipping = cartItems.length * 5;
  const tax = subtotal * 0.02;
  const total = subtotal + shipping + tax;
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  const [payment, setPayment] = useState("card");

  const [data, setData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    street: "",
    city: "",
    zip: "",
    country: "",
  });
  function onChangeHandler(e) {
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Prepare order details
    const orderDetails = {
      userAddress: `${data.name}, ${data.street}, ${data.city}, ${data.zip}, ${data.country}`,
      phoneNumber: data.phoneNumber,
      email: data.email,
      orderedItems: cartItems.map((item) => ({
        foodId: item.id,
        quantity: quantities[item.id],
        price: item.price * quantities[item.id],
        category: item.category,
        name: item.name,
        imageUrl: item.imageUrl,
        description: item.description,
      })),
      amount: total.toFixed(2),
      orderStatus: "PREPARING",
    };

    try {
      // Send order to backend
      const orderResponse = await placeOrder(orderDetails, token);
      console.log("Order Response:", orderResponse);

      const sessionId = orderResponse.stripeCheckoutSessionId;
      if (!sessionId) {
        alert("Stripe session not created. Cannot proceed to payment.");
        return;
      }

      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Stripe Checkout error:", error);
        alert("Failed to redirect to payment. Please try again.");
        return;
      }

      // Clear form and cart only after redirect attempt
      setQuantities({});
      setData({
        name: "",
        email: "",
        phoneNumber: "",
        street: "",
        city: "",
        zip: "",
        country: "",
      });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div
      className="container py-5"
      //   style={{
      //     background: "linear-gradient(120deg, #fffbe5 60%, #ffe5b4 100%)",
      //   }}
    >
      <div className="row g-3">
        {/* Shipping & Payment Form */}
        <div className="col-lg-7 order-2 order-lg-1">
          <form
            className="p-4 shadow-sm bg-white rounded"
            style={{ borderRadius: "18px", border: "2px solid #ffe5b4" }}
            onSubmit={onSubmitHandler}
          >
            <div className="d-flex align-items-center mb-3">
              <img
                src={assets.logo}
                alt="logo"
                height={40}
                style={{ marginRight: "12px" }}
              />
              <h3
                className="mb-0"
                style={{ color: "#ffc107", fontWeight: "bold" }}
              >
                Shipping Address
              </h3>
            </div>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                required
                placeholder="Enter your full name"
                // style={{ borderColor: "#ffc107" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={data.email || ""}
                onChange={onChangeHandler}
                required
                placeholder="Enter your email address"
                // style={{ borderColor: "#ffc107" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="number"
                className="form-control"
                name="phoneNumber"
                value={data.phoneNumber || ""}
                onChange={onChangeHandler}
                required
                placeholder="Enter your phone number"
                // style={{ borderColor: "#ffc107" }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                className="form-control"
                name="street"
                value={data.street || ""}
                onChange={onChangeHandler}
                required
                placeholder="Enter your street address"
                // style={{ borderColor: "#ffc107" }}
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={data.city || ""}
                  onChange={onChangeHandler}
                  required
                  placeholder="City"
                  //   style={{ borderColor: "#ffc107" }}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">ZIP</label>
                <input
                  type="text"
                  className="form-control"
                  name="zip"
                  value={data.zip || ""}
                  onChange={onChangeHandler}
                  required
                  placeholder="ZIP Code"
                  //   style={{ borderColor: "#ffc107" }}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={data.country || ""}
                  onChange={onChangeHandler}
                  required
                  placeholder="Country"
                  //   style={{ borderColor: "#ffc107" }}
                />
              </div>
            </div>
            {/* Payement Method section */}
            {/* <div className="d-flex align-items-center mb-3 mt-4">
              <img
                src={assets.cart}
                alt="payment"
                height={25}
                style={{ marginRight: "10px" }}
              />

              <h5
                className="mb-0"
                style={{ color: "#ff9800", fontWeight: "bold" }}
              >
                Payment Method
              </h5>
            </div>
            
             <div className="mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="card"
                  value="card"
                  checked={payment === "card"}
                  onChange={() => setPayment("card")}
                />
                <label
                  className="form-check-label d-flex align-items-center"
                  htmlFor="card"
                >
                  Credit/Debit Card
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="#ffc107"
                    style={{ marginLeft: "8px" }}
                  >
                    <rect
                      x="2"
                      y="6"
                      width="20"
                      height="12"
                      rx="2"
                      fill="#ffc107"
                      stroke="#ff9800"
                      strokeWidth="2"
                    />
                    <rect x="4" y="10" width="16" height="2" fill="#fffbe5" />
                  </svg>
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="payment"
                  id="paypal"
                  value="paypal"
                  checked={payment === "paypal"}
                  onChange={() => setPayment("paypal")}
                />
                <label className="form-check-label" htmlFor="paypal">
                  PayPal
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                    alt="paypal"
                    height={25}
                    style={{ marginRight: "10px" }}
                  />
                </label>
              </div>
            </div> */}
            <button
              className="btn btn-warning btn-lg fw-bold w-100 mt-3"
              type="submit"
              disabled={cartItems.length === 0}
            >
              Continue to Checkout
            </button>
          </form>
        </div>
        {/* Order Summary */}
        <div className="col-lg-5 order-1 order-lg-2">
          <div
            className="summary-card p-4 shadow-sm mb-4"
            style={{
              background: "#fffbe5",
              borderRadius: "18px",
              border: "2px dashed #ffc107",
            }}
          >
            <div className="d-flex align-items-center mb-3">
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
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul className="list-group mb-3">
                {cartItems.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between align-items-center"
                    key={item.id}
                    style={{ background: "#fffbe5", border: "none" }}
                  >
                    <span>
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        height={32}
                        style={{ borderRadius: "8px", marginRight: "8px" }}
                      />
                      {item.name}{" "}
                      <span className="text-muted">x{quantities[item.id]}</span>
                    </span>
                    <span style={{ color: "#ff9800", fontWeight: "bold" }}>
                      ${(item.price * quantities[item.id]).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span style={{ color: "#ff9800" }}>${subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Shipping</span>
              <span style={{ color: "#ff9800" }}>${shipping.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Tax</span>
              <span style={{ color: "#ff9800" }}>${tax.toFixed(2)}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-bold ">Total</span>
              <span className="fw-bold h4" style={{ color: "#ff9800" }}>
                ${total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
