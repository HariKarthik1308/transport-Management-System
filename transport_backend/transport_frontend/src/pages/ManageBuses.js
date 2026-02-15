import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageBuses() {

  const [buses, setBuses] = useState([]);
  const [formData, setFormData] = useState({
    bus_number: "",
    bus_type: "",
    total_seats: ""
  });

  useEffect(() => {
    fetchBuses();
  }, []);

  const fetchBuses = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/buses/");
    setBuses(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://127.0.0.1:8000/api/buses/", formData);
    fetchBuses();
  };

  return (
    <div className="container mt-4">
      <h3>Manage Buses</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="bus_number"
          placeholder="Bus Number"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="bus_type"
          placeholder="Bus Type"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="total_seats"
          placeholder="Total Seats"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button className="btn btn-primary">Add Bus</button>
      </form>

      {buses.map((bus) => (
        <div key={bus.id} className="card p-2 mb-2">
          {bus.bus_number} - {bus.bus_type}
        </div>
      ))}
    </div>
  );
}

export default ManageBuses;
