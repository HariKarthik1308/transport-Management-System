import React, { useEffect, useState } from "react";
import axios from "axios";

function ManageRoutes() {

  const [routes, setRoutes] = useState([]);
  const [formData, setFormData] = useState({
    from_city: "",
    to_city: "",
    distance: ""
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    const response = await axios.get("http://127.0.0.1:8000/api/routes/");
    setRoutes(response.data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://127.0.0.1:8000/api/routes/", formData);
    fetchRoutes();
  };

  const deleteRoute = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/api/routes/${id}/`);
    fetchRoutes();
  };

  return (
    <div className="container mt-4">
      <h3>Manage Routes</h3>

      <form onSubmit={handleSubmit} className="mb-4">
        <input
          name="from_city"
          placeholder="From"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="to_city"
          placeholder="To"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <input
          name="distance"
          placeholder="Distance"
          onChange={handleChange}
          className="form-control mb-2"
        />

        <button className="btn btn-primary">Add Route</button>
      </form>

      {routes.map((route) => (
        <div key={route.id} className="card p-2 mb-2">
          {route.from_city} → {route.to_city} ({route.distance} km)

          <button
            className="btn btn-danger btn-sm mt-2"
            onClick={() => deleteRoute(route.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default ManageRoutes;
