import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {

  const navigate = useNavigate();

  const [search, setSearch] = useState({
    from: "",
    to: "",
    date: ""
  });

  const handleChange = (e) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = () => {

    // ✅ Proper login check
    const isLoggedIn = localStorage.getItem("user");

    if (isLoggedIn !== "true") {
      alert("Please login first!");
      navigate("/login");
      return;
    }

    // ✅ Validate fields
    if (!search.from || !search.to || !search.date) {
      alert("Please fill all fields");
      return;
    }

    // ✅ Navigate to results page
    navigate("/search-results", {
      state: search
    });
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">
          🚌 Book Bus Tickets Easily
        </h1>

        <p className="hero-subtitle">
          Safe • Fast • Comfortable Travel
        </p>

        <div className="search-box">

          <input
            type="text"
            name="from"
            placeholder="From"
            value={search.from}
            onChange={handleChange}
          />

          <input
            type="text"
            name="to"
            placeholder="To"
            value={search.to}
            onChange={handleChange}
          />

          <input
            type="date"
            name="date"
            value={search.date}
            onChange={handleChange}
          />

          <button onClick={handleSearch}>
            Search
          </button>

        </div>
      </div>
    </section>
  );
}

export default Home;
