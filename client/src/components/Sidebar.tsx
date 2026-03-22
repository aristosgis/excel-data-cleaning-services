import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Sidebar() {
  const { logout } = useAuth();
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload File", path: "/upload" },
    { name: "File History", path: "/history" },
  ];

  return (
    <div className="w-64 h-screen bg-blue-800 text-white flex flex-col shadow-xl">
      
      {/* Brand / Logo Area */}
      <div className="p-6 border-b border-blue-700">
        <h1 className="text-2xl font-bold tracking-wide">
          Excel Cleaner
        </h1>
        <p className="text-blue-200 text-sm mt-1">
          Data Cleaning Services
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {links.map((item) => {
          const active = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-4 py-2 rounded-lg font-medium transition ${
                active
                  ? "bg-blue-600 text-white shadow"
                  : "text-blue-100 hover:bg-blue-700"
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-blue-700">
        <button
          onClick={logout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
}