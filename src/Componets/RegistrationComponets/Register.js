// src/pages/Register.js

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { userapi } from "../../Api_url";
import { Eye, EyeOff } from "lucide-react";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    address: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, email, password, mobile, address } = form;

    if (!name || !email || !password || !mobile || !address) {
      setMessage("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${userapi}register`, form);

      setMessage("Registered successfully.");
      setLoading(false);

      // Redirect after 1 second
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setMessage(
        error.response?.data?.message || "Registration failed."
      );
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="form-box shadow p-4 rounded bg-white" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Register</h2>

        {message && (
          <div
            className={`mb-3 ${
              message.includes("success") ? "text-success" : "text-danger"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mb-3">
          <label>Name</label>
          <input
            name="name"
            type="text"
            className="form-control"
            onChange={handleChange}
            value={form.name}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            onChange={handleChange}
            value={form.email}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>

          <div style={{ position: "relative" }}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="form-control"
              onChange={handleChange}
              value={form.password}
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <label>Mobile</label>
          <input
            name="mobile"
            type="tel"
            className="form-control"
            onChange={handleChange}
            value={form.mobile}
          />
        </div>

        <div className="mb-3">
          <label>Address</label>
          <input
            name="address"
            type="text"
            className="form-control"
            onChange={handleChange}
            value={form.address}
          />
        </div>

        <button
          className="btn btn-success w-100"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;