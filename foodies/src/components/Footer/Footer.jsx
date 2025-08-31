import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>&copy; 2024 Foodis Delivery. All Rights Reserved.</p>
          </div>
          <div className="col-md-6">
            <div className="social-icons">
              <a href="#" title="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" title="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" title="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Contact Us</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
