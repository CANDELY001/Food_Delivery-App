import React from "react";
import { BsSun, BsMoon } from "react-icons/bs";
import "./Menubar.css";

const Menubar = ({ toggleSidebar, darkMode, setDarkMode }) => {
  return (
    <nav
      className={`navbar navbar-expand-lg border-bottom ${
        darkMode
          ? "navbar-dark bg-dark border-black shadow-lg"
          : "navbar-light bg-light shadow-sm"
      }`}
    >
      <div className="container-fluid">
        <div>
          <button
            className="btn btn-primary"
            id="sidebarToggle"
            onClick={toggleSidebar}
            style={{
              backgroundColor: "#ff5e00ff",
              border: "none",
              boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
            }}
          >
            <i className="bi bi-list text-black"></i>
          </button>

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
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <a
                className={`nav-link ${darkMode ? "text-light" : "text-dark"}`}
                href="#!"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${darkMode ? "text-light" : "text-dark"}`}
                href="#!"
              >
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${
                  darkMode ? "text-light" : "text-dark"
                }`}
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div
                className={`dropdown-menu dropdown-menu-end ${
                  darkMode ? "bg-dark text-light" : ""
                }`}
                aria-labelledby="navbarDropdown"
              >
                <a
                  className={`dropdown-item${darkMode ? " text-light" : ""}`}
                  href="#!"
                >
                  Action
                </a>
                <a
                  className={`dropdown-item${darkMode ? " text-light" : ""}`}
                  href="#!"
                >
                  Another action
                </a>
                <div className="dropdown-divider"></div>
                <a
                  className={`dropdown-item${darkMode ? " text-light" : ""}`}
                  href="#!"
                >
                  Something else here
                </a>
              </div>
            </li>
          </ul>
          <button
            className={`btn me-1 bg-orange-500 border-0 text-white`}
            style={{ backgroundColor: "#949494ff" }}
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <BsMoon size={20} /> : <BsSun size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;
