import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      <Link to="/admin/routes" className="btn btn-primary m-2">
        Manage Routes
      </Link>

      <Link to="/admin/buses" className="btn btn-success m-2">
        Manage Buses
      </Link>

      <Link to="/admin/bookings" className="btn btn-danger m-2">
        View Bookings
      </Link>
    </div>
  );
}
export default AdminDashboard;
