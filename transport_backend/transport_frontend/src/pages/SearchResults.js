import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function SearchResults() {

  const location = useLocation();
  const navigate = useNavigate();

  const { from, to, date } = location.state || {};

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch buses
  const fetchBuses = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/search/?from=${from}&to=${to}`
      );
      setBuses(response.data);
    } catch (error) {
      console.error("Error fetching buses:", error);
    } finally {
      setLoading(false);
    }
  }, [from, to]);

  // ✅ Run fetch when page loads
  useEffect(() => {
    if (from && to) {
      fetchBuses();
    }
  }, [fetchBuses, from, to]);

  // ✅ Redirect to Payment Page (NOT direct booking)
  const bookTicket = (routeId, price) => {
    navigate("/payment", {
      state: {
        routeId: routeId,
        price: price
      }
    });
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-4 text-center">
        Buses from <b>{from}</b> to <b>{to}</b> on {date}
      </h3>

      {loading ? (
        <h5 className="text-center">Loading buses...</h5>
      ) : buses.length === 0 ? (
        <h5 className="text-center text-danger">No buses available</h5>
      ) : (
        buses.map((bus) => (
          <div
            className="card p-4 mb-3 shadow-lg border-0 rounded-4"
            key={bus.id}
          >
            <h5 className="fw-bold">{bus.bus_name}</h5>

            <p><b>Departure:</b> {bus.departure_time}</p>
            <p><b>Arrival:</b> {bus.arrival_time}</p>
            <p><b>Price:</b> ₹{bus.price}</p>

            {bus.available_seats > 0 ? (
              <>
                <p className="text-success fw-bold">
                  Seats Available: {bus.available_seats}
                </p>

                <button
                  className="btn btn-danger px-4"
                  onClick={() => bookTicket(bus.id, bus.price)}
                >
                  Book Now
                </button>
              </>
            ) : (
              <p className="text-danger fw-bold">Sold Out</p>
            )}
          </div>
        ))
      )}

    </div>
  );
}

export default SearchResults;
