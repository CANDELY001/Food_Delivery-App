import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import "./Sidebar.css";
const Sidebar = ({ isSidebarOpen, darkMode }) => {
  const sidebarBg = darkMode ? "bg-dark text-light border-black" : "bg-white";
  const headingBg = darkMode ? "bg-dark border-opacity-25" : "bg-light";
  const itemClass = `list-group-item list-group-item-action p-3 ${
    darkMode
      ? "bg-dark text-white-50 border-black border-opacity-25"
      : "list-group-item-light"
  }`;
  const iconClass = darkMode ? "text-white-50" : "";
  return (
    <div>
      <div
        className={`border-end ${sidebarBg} ${
          isSidebarOpen ? "d-block" : "d-none"
        }`}
        id="sidebar-wrapper"
      >
        <div
          className={`sidebar-heading border-bottom ${headingBg} d-flex justify-content-center align-items-center`}
        >
          <img
            src={assets.logo}
            alt="Logo"
            width={90}
            height={90}
            className="mx-auto d-block"
          />
        </div>
        <div className="list-group list-group-flush">
          <Link className={itemClass} to="/add">
            <i className={`bi bi-plus-circle me-2 ${iconClass}`}></i> Add Food
          </Link>
          <Link className={itemClass} to="/list">
            <i className={`bi bi-list-ul me-2 ${iconClass}`}></i> List Food
          </Link>
          <Link className={itemClass} to="/orders">
            <i className={`bi bi-cart me-2 ${iconClass}`}></i> Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
