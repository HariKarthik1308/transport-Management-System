import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";
import SearchResults from "./pages/SearchResults";
import Payment from "./Payment";


import "./App.css";

function App() {
  return (
    <Router>
      
      {/* NAVBAR OUTSIDE ROUTES */}
      <div className="navbar">
        <h3>🚌 BusExpress</h3>

        <div className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/my-bookings">My Bookings</NavLink>
        </div>
      </div>

      {/* ROUTES ONLY CONTAIN ROUTE */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment" element={<Payment />} />
      
      </Routes>

    </Router>
  );
}

export default App;
