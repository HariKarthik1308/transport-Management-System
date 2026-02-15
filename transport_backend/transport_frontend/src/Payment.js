import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  const { routeId, price } = location.state || {};

  const handlePayment = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/bookings/", {
        route: routeId,
        seats_booked: 1
      });

      alert("Payment Successful ✅ Ticket Confirmed!");
      navigate("/");

    } catch (error) {
      console.error(error.response?.data);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h3>Payment Page</h3>
      <h4>Total Amount: ₹{price}</h4>

      <button 
        className="btn btn-success mt-3 px-4"
        onClick={handlePayment}
      >
        Pay Now
      </button>
    </div>
  );
}

export default Payment;
