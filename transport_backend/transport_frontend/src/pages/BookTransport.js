import React, { useEffect, useState } from "react";
import axios from "axios";

function BookTransport() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    vehicle: "",
    pickup_location: "",
    drop_location: "",
    booking_date: ""
  });

  const token = localStorage.getItem("access_token");

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/vehicles/",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setVehicles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/book/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking Successful!");
    } catch (error) {
      alert("Booking Failed");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Book Transport</h2>

      <form onSubmit={handleSubmit}>
        <select name="vehicle" onChange={handleChange}>
          <option value="">Select Vehicle</option>
          {vehicles.map((v) => (
            <option key={v.id} value={v.id}>
              {v.vehicle_number} - {v.vehicle_type}
            </option>
          ))}
        </select>
        <br />

        <input
          name="pickup_location"
          placeholder="Pickup Location"
          onChange={handleChange}
        />
        <br />

        <input
          name="drop_location"
          placeholder="Drop Location"
          onChange={handleChange}
        />
        <br />

        <input
          type="date"
          name="booking_date"
          onChange={handleChange}
        />
        <br />

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default BookTransport;
