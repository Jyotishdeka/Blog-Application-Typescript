"use client";
import React, { useState } from "react";
import {  toast } from 'react-toastify';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error and success messages
    setError("");
    setSuccess("");

    // Login payload
    const loginData = {
      identifier,
      password,
    };

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successfully logged in
        setSuccess("Login successful!");

        console.log("data",data);
        

        // Store user data in localStorage (for persistence)
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user info
        localStorage.setItem("token", data.jwt); // Store JWT token

        // Store user data in sessionStorage (for current session)
        sessionStorage.setItem("user", JSON.stringify(data.user)); // Store user info
        sessionStorage.setItem("token", data.jwt); // Store JWT token

        // Optionally redirect to a protected route
        setIdentifier('')
        setPassword('')
        toast.success("Successfully created blog!", {
          position: "top-right",
          autoClose: 10000,
        });
        window.location.href = "/";
      } else {
        // Handle error response
        toast.error(`${data.error.message}`, {
          position: "top-right",
          autoClose: 8000,
        });
        setError(data.error.message);
      }
    } catch (error) {
      setError("An error occurred while logging in. Please try again.");
    }
  };

  return (
    <div className="mt-12 flex items-center justify-center">
      <div className="bg-primary shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login to Your Account
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="identifier"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your Email or Username"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-primary-dark hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-primary-dark hover:text-red-500 font-bold"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
