import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext";
import "./MenuBar.css";
import { Link, useNavigate } from "react-router-dom";

const MenuBar = () => {
  const [active, setActive] = useState("home");
  const { quantities } = useContext(StoreContext);
  const navigate = useNavigate();
  //unique items in cart
  const cartQuantity = quantities
    ? Object.values(quantities).reduce((acc, qty) => acc + qty, 0)
    : 0;
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={assets.logo}
            alt="Logo"
            className="mx-4"
            height={65}
            width={65}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold">
            <li className="nav-item ">
              <Link
                className={active === "home" ? "nav-link active" : "nav-link"}
                aria-current="page"
                to="/"
                onClick={() => setActive("home")}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "explore" ? "nav-link active" : "nav-link"
                }
                aria-current="page"
                to="/explore"
                onClick={() => setActive("explore")}
              >
                Explore
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  active === "contact" ? "nav-link active" : "nav-link"
                }
                to="/contact"
                onClick={() => setActive("contact")}
              >
                Contact us
              </Link>
            </li>
          </ul>
          <div className="d-flex align-items-center gap-4">
            <div className="position-relative">
              <Link to="/cart">
                <img
                  src={assets.cart}
                  alt="cart icon"
                  height={34}
                  width={32}
                  className="position-relative"
                />
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-light">
                  {cartQuantity}
                </span>
              </Link>
            </div>
            <button
              className="btn btn-outline-warning"
              type="submit"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MenuBar;
