import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../../service/authService.js";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext.jsx";

const Login = () => {
  const { setToken, loadCartData } = useContext(StoreContext);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(data);
      if (response.status === 200) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        await loadCartData(response.data.token);
        toast.success("Welcome back!");
        navigate("/");
      } else {
        toast.error("Unable to login. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="container ">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-1 border-light shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h1 className="card-title text-center mb-5 fw-bold">Login</h1>
              <form onSubmit={handleSubmit}>
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
                  />
                  <label htmlFor="floatingPassword">Password</label>
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
                    Login
                  </button>
                </div>
                <div className="text-center mt-3">
                  <span className="text-muted">You don't have an account?</span>
                  <Link
                    to="/register"
                    className="ms-2 text-warning fw-bold text-decoration-none"
                  >
                    Register
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

export default Login;
