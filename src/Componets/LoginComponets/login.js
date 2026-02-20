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

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("Email and password are required.");
      return;
    }

    try {
      const res = await axios.post(`${userapi}login`, { email, password });

      const { token, user } = res.data;

      if (!token || !user) {
        setMessage("Invalid server response");
        return;
      }

      // ✅ SAME AS YOUR WORKING VERSION
      localStorage.setItem("token", token);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("mobile", user.mobile);
      localStorage.setItem("address", user.address);
      localStorage.setItem("_id", user._id);
      localStorage.setItem("status", user.status);
      localStorage.setItem("role", user.role);
      localStorage.setItem("info", user.info);
      localStorage.setItem("user-info", JSON.stringify(user));

      // ✅ Redirect
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error("Login error:", err.response?.data || err);
      setMessage("Login failed. Please try again.");
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