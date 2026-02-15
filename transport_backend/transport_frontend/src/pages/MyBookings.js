import React, { useEffect, useState } from "react";
import axios from "axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/mybookings/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.map((b) => (
        <div key={b.id} style={{ border: "1px solid #ccc", margin: "10px" }}>
          <p>Vehicle: {b.vehicle}</p>
          <p>Pickup: {b.pickup_location}</p>
          <p>Drop: {b.drop_location}</p>
          <p>Date: {b.booking_date}</p>
          <p>Status: {b.status}</p>
        </div>
      ))}
    </div>
  );
}

export default MyBookings;
