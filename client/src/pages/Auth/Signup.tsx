import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Navigate } from "react-router-dom";

export default function Signup() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ⭐ If already logged in → redirect
  if (user) return <Navigate to="/dashboard" />;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.error || "Signup failed");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-2xl shadow-lg w-96 border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Create Account
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <label className="block mb-3 text-gray-700 text-sm">Name</label>
        <input
          className="w-full border px-3 py-2 rounded-lg mb-4"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label className="block mb-3 text-gray-700 text-sm">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded-lg mb-4"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-3 text-gray-700 text-sm">Password</label>
        <input
          type="password"
          className="w-full border px-3 py-2 rounded-lg mb-6"
          placeholder="******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Signup
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}