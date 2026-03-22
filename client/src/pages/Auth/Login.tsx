import { useState } from "react";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useNavigate, Navigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // ⭐ If already logged in → redirect
  if (user) return <Navigate to="/dashboard" />;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-10 rounded-2xl shadow-lg w-96 border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Login
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
        )}

        <label className="block mb-3 text-gray-700 text-sm">Email</label>
        <input
          type="email"
          className="w-full border px-3 py-2 rounded-lg mb-4"
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-3 text-gray-700 text-sm">
          Password
        </label>
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
          Login
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Signup
          </a>
        </p>
      </form>
    </div>
  );
}