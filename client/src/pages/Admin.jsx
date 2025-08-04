import React, { useState } from "react";
import axios from "../libs/axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Admin = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  setError(null);

  try {
    const res = await axios.post("/auth/admin-login", { email, password });

    if (res.data.success) {
      localStorage.setItem("VITE_ADMIN_EMAIL", email);
      localStorage.setItem("VITE_ADMIN_PASSWORD", password);
      localStorage.setItem("admin-auth", "true");

      toast.success("Login successful");
      navigate("/admin-view");
    } else {
      toast.error(res.data.message || "Login failed");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError("Something went wrong. Please try again.");
  }
};

  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
    >
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">Admin</span> Login
      </p>

      {error && (
        <p className="text-red-500 text-sm w-full text-center">{error}</p>
      )}

      <div className="w-full">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter email"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="email"
          required
        />
      </div>

      <div className="w-full">
        <p>Password</p>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Enter password"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="password"
          required
        />
      </div>

      <button
        type="submit"
        className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer"
      >
        Login
      </button>
    </form>
  );
};

export default Admin;
