import React from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="p-5 mb-4 bg-light rounded-3 mt-1">
      <div className="container-fluid py-5">
        <h1 className="display-5 fw-bold">Order your favorite food here</h1>
        <p className="col-md-8 fs-4">
          Discover the best food and drinks in your area.
        </p>
        <Link
          to="/explore"
          className="btn btn-warning btn-md fw-semibold hero-btn"
        >
          Explore Menu
        </Link>
      </div>
    </div>
  );
};

export default Hero;
