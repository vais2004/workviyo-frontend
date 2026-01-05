import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUserAsync, userLoginAsync } from "../features/userSlice";
import ShowHidePassword from "../components/ShowHidePassword";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleUserRegister = async (event) => {
    event.preventDefault();

    console.log(name, email, password); // Check before sending

    try {
      await dispatch(registerUserAsync({ name, email, password })).unwrap();
      toast.success("Signup successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.message || "Signup failed!");
    }
  };

  const guestLoginHandler = async () => {
    const guestEmail = "guest1@example.com";
    const guestPassword = "guest1";

    setEmail(guestEmail);
    setPassword(guestPassword);

    try {
      await dispatch(
        userLoginAsync({ email: guestEmail, password: guestPassword })
      ).unwrap();
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid guest credentials!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <ToastContainer position="top-right" className="mt-5" autoClose={3000} />
      <div
        className="card p-4 border-0"
        style={{ width: "400px", backgroundColor: "#ffffff" }}>
        <h4 className="heading-color text-center mb-3" style={{color:"#a37df6ff"}}>Workviyo</h4>
        <h2 className="text-center">Create an account</h2>
        <p className="text-center text-muted mb-4">Please enter your details</p>
        <form onSubmit={handleUserRegister}>
          <label htmlFor="name" className="form-label fw-semibold mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your Name"
            value={name}
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className="form-label fw-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your Email"
            value={email}
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="password"
            className="form-label fw-semibold mb-1 mt-3">
            Password
          </label>
          <ShowHidePassword
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="d-grid my-2">
            <button className="btn btn-outline-primary" type="submit">
              Sign In
            </button>
          </div>
          <div className="d-grid mb-2">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={guestLoginHandler}>
              Continue as Guest
            </button>
          </div>
          <p>
            Already have an account?{" "}
            <Link to="/" className="text-decoration-none fw-semibold ">
              Log In
            </Link>{" "}
          </p>
        </form>
      </div>
    </div>
  );
}
