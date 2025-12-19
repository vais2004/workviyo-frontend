import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLoginAsync } from "../features/userSlice";
import ShowHidePassword from "../components/ShowHidePassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(userLoginAsync({ email, password })).unwrap();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials while logging in!");
    }
  };

  const handleGuestLogin = async () => {
    try {
      const guestEmail = "guest1@example.com";
      const guestPassword = "guest1";

      await dispatch(
        userLoginAsync({ email: guestEmail, password: guestPassword })
      ).unwrap();

      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials while guest login!");
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ToastContainer />
      <div
        className="card  border-0 p-4 "
        style={{ width: "400px", backgroundColor: "#ffffff" }}>
        <h4 className="heading-color text-center mb-3">Workviyo</h4>
        <h2 className="text-center">Log in to your account</h2>
        <p className="text-center text-muted mb-4">
          Please enter your details.
        </p>

        <form onSubmit={handleUserLogin}>
          <label htmlFor="email" className="form-label fw-semibold">
            Email
          </label>

          <input
            className=" form-control"
            type="text"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password" className="form-label fw-semibold">
            Password
          </label>

          <ShowHidePassword
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <div className="d-grid my-2">
            <button className="btn btn-primary " type="submit">
              Log In
            </button>
          </div>
          <div className="d-grid mb-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleGuestLogin}>
              Continue as Guest
            </button>
          </div>
          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-decoration-none fw-semibold ">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
