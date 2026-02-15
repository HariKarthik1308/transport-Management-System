import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar-custom d-flex justify-content-between">
      <h4 style={{color:"white"}}>🚌BusExpress</h4>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/mybookings">My Bookings</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </div>
  );
}
export default Navbar;
