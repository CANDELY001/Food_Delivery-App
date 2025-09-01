import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";
import { heroimages } from "../../assets/assets";

const Hero = () => {
  return (
    <div className="p-3 mb-4 bg-light rounded-3 mt-4 position-relative hero-section header">
      <div className="container-fluid py-5 d-flex flex-row align-items-center justify-content-between">
        <div className="hero-info">
          <h1 className="hero-title display-2 fw-bold text-theme mb-3">
            Order your Favorite Food here
          </h1>
          <p className="col-md-8 fs-3">
            Discover the best food and drinks in your area.
          </p>
          <Link
            to="/explore"
            className="btn btn-warning btn-lg fw-semibold hero-btn"
          >
            Explore Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
