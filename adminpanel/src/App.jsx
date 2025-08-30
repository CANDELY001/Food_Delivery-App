import React from "react";
import { useState } from "react";
import Menubar from "./components/Menubar/Menubar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AddFood from "./pages/AddFood/AddFood";
import ListFood from "./pages/ListFood/ListFood";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div
      className={`d-flex ${darkMode ? "bg-dark text-light" : "bg-white"}`}
      id="wrapper"
      style={{ minHeight: "100vh" }}
    >
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} darkMode={darkMode} />
      {/* Page content wrapper */}
      <div
        id="page-content-wrapper"
        className={darkMode ? "bg-dark text-light" : "bg-white"}
      >
        {/* Top navigation */}
        <Menubar
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        {/* Page content */}
        <ToastContainer />
        <div
          className={`container-fluid ${
            darkMode ? "bg-dark text-light" : "bg-white"
          }`}
        >
          <Routes>
            <Route path="/add" element={<AddFood darkMode={darkMode} />} />
            <Route path="/list" element={<ListFood darkMode={darkMode} />} />
            <Route path="/orders" element={<Orders darkMode={darkMode} />} />
            <Route path="/" element={<ListFood darkMode={darkMode} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
