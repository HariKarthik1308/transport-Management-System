import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const token = localStorage.getItem("access_token");

  if (!token) {
    navigate("/login");
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    navigate("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to Transport Management System</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
