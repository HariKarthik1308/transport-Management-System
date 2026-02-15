import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {

  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        form
      );

      // ✅ Store login status
      localStorage.setItem("token", res.data.access);
      localStorage.setItem("user", "true");

      // Optional: store user id if backend sends it
      if (res.data.user_id) {
        localStorage.setItem("userId", res.data.user_id);
      }

      alert("Login Successful ✅");

      navigate("/"); // Redirect to Home

    } catch (err) {
      alert("Invalid Credentials ❌");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="auth-input"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
