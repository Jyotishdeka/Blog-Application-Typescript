"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchUserByUsername, updateUserById } from "@/http"; // Ensure correct path to fetchUserByUsername function

export default function UpdateProfile({
  params,
}: {
  params: { username?: string };
}) {
  const UserName = params.username || null;

  // State to store user data and loading/error states
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  
  

  // Fetch user data based on the username
  useEffect(() => {
    if (UserName) {
      fetchUserByUsername(UserName)
        .then((response) => {
          if (response && response.length > 0) {
            setUserData(response[0]); // Assuming the API returns an array
          } else {
            setError("User not found");
          }
        })
        .catch(() => {
          setError("Failed to fetch user data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [UserName]);

  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",

    avatar: "",
  });

  // Sync `userData` into `formData` when `userData` is loaded
  useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username,
        email: userData.email,

        avatar: userData.avatar?.url || "/images/panda.png",
      });
    }
  }, [userData]);

  // Handle form input changes
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle avatar image change
  const handleAvatarChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: URL.createObjectURL(file), // In a real app, upload this file and update `avatar` with the server URL
      }));
    }
  };

  

  // Handle form submission
  const handleSubmit = async (e: any) => {
    const token = localStorage.getItem("token");
    e.preventDefault();

    // Ensure userData is loaded to proceed with updates
    if (!userData) {
      setError("User data is not loaded. Please try again.");
      return;
    }

    // Prepare the payload for updating the user
    const updatedData = {
      username: formData.username,
      email: formData.email,
      avatar: {
        url: formData.avatar,
      },
    };

    try {
      // Assuming you have an `updateUserById` function that updates user data via an API
      const response = await updateUserById(userData.id, updatedData, token);

      if (response) {
        console.log("User updated successfully:", response);
        alert("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update profile. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-[80vh] flex items-center justify-center mb-20 p-12 px-6">
      <div className="max-w-2xl w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800">
            Update Your Profile
          </h2>
          <p className="mt-2 text-gray-500">
            Update your information and avatar
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Avatar Section */}
          <div className="flex justify-center">
            <div className="relative">
              <Image
                src={formData.avatar}
                alt="Avatar"
                className="w-32 h-32 rounded-full border-4 border-indigo-600 object-cover shadow-md"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition duration-300"
              >
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.5 1.5L15 20V17zM5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 16V5h14v14H5z"
                  />
                </svg>
              </label>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="text-lg font-semibold text-gray-700"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-lg font-semibold text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-2 px-4 py-3 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-3 bg-primary text-black font-semibold rounded-lg shadow-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
