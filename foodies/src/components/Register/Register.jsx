import React from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { registerUser } from "../../service/authService.js";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const clearForm = () => {
    setData({
      name: "",
      email: "",
      password: "",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(data);
      clearForm();
      toast.success("User registered successfully");
      navigate("/");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-1 border-light shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h1 className="card-title text-center mb-5 fw-bold">Register</h1>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingName"
                    placeholder="Full Name"
                    name="name"
                    value={data.name}
                    onChange={onChangeHandler}
                    required
                  />
                  <label htmlFor="floatingName">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Email address"
                    name="email"
                    value={data.email}
                    onChange={onChangeHandler}
                    required
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={onChangeHandler}
                    required
                    minLength={8}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  {data.password && data.password.length < 8 && (
                    <small className="text-warning ms-1">
                      Password must be at least 8 characters
                    </small>
                  )}
                </div>

                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="showPasswordCheck"
                    checked={showPassword}
                    onChange={() => setShowPassword((prev) => !prev)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="showPasswordCheck"
                  >
                    Show password
                  </label>
                </div>
                <div className="d-grid">
                  <button
                    className="btn btn-warning btn-custom btn-login text-uppercase fw-bold"
                    type="submit"
                  >
                    Register
                  </button>
                </div>
                <div className="text-center mt-3">
                  <span className="text-muted">Already have an account?</span>
                  <Link
                    to="/login"
                    className="ms-2 text-warning fw-bold text-decoration-none"
                  >
                    Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
