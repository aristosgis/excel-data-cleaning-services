import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-6 flex flex-col">
      <h2 className="text-xl font-bold mb-8 text-blue-700">
        Excel Admin
      </h2>

      <nav className="flex flex-col space-y-4">
        <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>

        <Link to="/admin/users" className="text-gray-700 hover:text-blue-600">
          Users
        </Link>

        <Link to="/admin/logs" className="text-gray-700 hover:text-blue-600">
          Logs
        </Link>
      </nav>
    </div>
  );
}