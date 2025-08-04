// src/pages/Registration.jsx
import React, { useState } from 'react';
import axios from "../libs/axios";
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [state, setState] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (state === 'login') {
        const res = await axios.post('/auth/login', { email, password });

        // ✅ Save user login state
        localStorage.setItem("user-auth", "true");

        toast.success('Login successful');
        navigate('/');
      } else {
        const res = await axios.post('/auth/register', {
          name,
          email,
          password,
          role,
        });
        toast.success('Registered successfully');
        setState('login');
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
    >
      <p className="text-2xl font-medium m-auto">
        <span className="text-indigo-500">User</span> {state === 'login' ? 'Login' : 'Sign Up'}
      </p>

      {state === 'register' && (
        <>
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
              type="text"
              required
            />
          </div>

          <div className="w-full">
            <p>Role</p>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            >
              <option value="">Select Role</option>
              <option value="Intern">Intern</option>
              <option value="Volunteer">Volunteer</option>
            </select>
          </div>
        </>
      )}

      <div className="w-full">
        <p>Email</p>
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="type here"
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
          placeholder="type here"
          className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
          type="password"
          required
        />
      </div>

      {state === 'register' ? (
        <p className="text-sm">
          Already have an account?{' '}
          <span
            onClick={() => setState('login')}
            className="text-indigo-500 cursor-pointer underline"
          >
            Login
          </span>
        </p>
      ) : (
        <p className="text-sm">
          Create an account?{' '}
          <span
            onClick={() => setState('register')}
            className="text-indigo-500 cursor-pointer underline"
          >
            Sign up
          </span>
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer disabled:opacity-50"
      >
        {loading
          ? state === 'register'
            ? 'Creating...'
            : 'Logging in...'
          : state === 'register'
          ? 'Create Account'
          : 'Login'}
      </button>
    </form>
  );
};

export default Registration;
