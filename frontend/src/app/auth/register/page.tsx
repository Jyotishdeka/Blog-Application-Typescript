"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset error and success messages
    setError("");
    setSuccess("");

    // Registration payload
    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch(
        "https://mindful-sunrise-bc9bc44f46.strapiapp.com/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Successfully registered
        setSuccess("Registration successful! Please log in.");
        toast.success("Registration Successful! Please Log in.", {
          position: "top-right",
          autoClose: 8000,
        });
        setUsername('');
        setEmail('');
        setPassword('');
        // Optionally, redirect to login or home page
        // window.location.href = "/auth/signin";
      } else {
        // Handle error response
        setError(data.error.message);
        toast.error(`${data.error.message}`, {
          position: "top-right",
          autoClose: 8000,
        });
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
      toast.error("An error occurred while registering. Please try again.", {
        position: "top-right",
        autoClose: 8000,
      });
    }
  };

  return (
    <div className="mt-12 flex items-center justify-center">
      <div className="bg-primary shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create an Account
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">{success}</p>}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your Username"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your email"
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
              Sign Up
            </button>
          </div>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/auth/signin"
              className="text-primary-dark hover:text-red-500 font-bold"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
