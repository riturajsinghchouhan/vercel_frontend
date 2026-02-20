// src/pages/Login.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userapi } from "../../Api_url";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${userapi}login`, { email, password });

      const { token, user } = res.data;

      if (!token || !user) {
        setMessage("Invalid server response");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("user-info", JSON.stringify(user));

      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setMessage("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
return (
  <div id="login-page">
    <div id="login-card">

      <h2 id="login-title">Login</h2>

      {message && <div id="login-message">{message}</div>}

      <div id="login-field">
        <label>Email</label>
        <input
          type="email"
          id="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div id="login-field">
        <label>Password</label>

        <div id="password-container">
          <input
            type={open ? "text" : "password"}
            id="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <span
            id="password-toggle"
            onClick={() => setOpen(!open)}
          >
            {open ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        </div>
      </div>

      <button id="login-btn" onClick={handleLogin}>
        Login
      </button>

      <p id="register-text">
        Don't have an account? <Link to="/register">Register</Link>
      </p>

    </div>
  </div>
);
}

export default Login;