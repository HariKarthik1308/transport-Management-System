import React, { useEffect, useState } from "react";
import axios from "axios";

function ViewBookings() {

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/bookings/");
    setBookings(response.data);
  };

  return (
    <div className="container mt-4">
      <h3>All Bookings</h3>

      {bookings.map((b) => (
        <div key={b.id} className="card p-3 mb-2">
          User: {b.user} <br />
          Seat: {b.seat} <br />
          Status: {b.payment_status ? "Paid" : "Pending"}
        </div>
      ))}
    </div>
  );
}

export default ViewBookings;
