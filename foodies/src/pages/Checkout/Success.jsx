import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext.jsx";
import { clearCart } from "../../service/cartService.js";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        await clearCart(); // Clear cart on server side as well
      } catch (err) {
        // Optionally handle error
      }
    })();
  }, []);
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ minHeight: "60vh", background: "#fff" }}
    >
      <div style={{ fontSize: "5rem", color: "#4BB543", marginBottom: "1rem" }}>
        <i className="bi bi-check-circle-fill"></i>
      </div>
      <h1 className="fw-bold mb-3">Thank you for your order!</h1>
      <p className="mb-4 text-center" style={{ maxWidth: 400 }}>
        Your order has been placed successfully.
        <br />
        We appreciate your business and hope you enjoy your meal!
      </p>
      <button
        className="btn btn-dark px-4 py-2 fw-bold"
        onClick={() => navigate("/")}
      >
        Back to Home
      </button>
    </div>
  );
};

export default Success;
