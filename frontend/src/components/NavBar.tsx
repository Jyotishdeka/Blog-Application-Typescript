"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Use router for navigation
import { toast } from "react-toastify";
import Image from "next/image";

const NavBar = () => {
  const router = useRouter(); // Router for redirection
  const [userData, setUserData] = useState<{ username: string } | null>(null); // Define userData state with type

  useEffect(() => {
    const userDataLocal = JSON.parse(localStorage.getItem("user") || "null");
    const userDataSession = JSON.parse(
      sessionStorage.getItem("user") || "null"
    );
    setUserData(userDataLocal || userDataSession);
  }, []);

  const handleLogOut = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    setUserData(null);
    toast.success("Logout Successful", {
      position: "top-right",
      autoClose: 8000,
    });
    router.push("/");
  };

  const handleCreateClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (!userData) {
      // If user is not logged in, redirect to login page
      router.push("/auth/signin");
    } else {
      // If user is logged in, redirect to create page
      router.push("/create");
    }
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/about"}>About Us</Link>
            </li>
            <li>
              <a
                href="#"
                onClick={handleCreateClick}
                className="bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Create Post
              </a>
            </li>
            <li>
              <Link href={"/contact"}>Contact Us</Link>
            </li>
          </ul>
        </div>
        <a href="/" className="btn btn-ghost text-xl cursor-pointer">
          Narrative<span className="text-primary">Nest</span>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link href={"/about"}>About Us</Link>
          </li>
          <li>
            <a
              href="#"
              onClick={handleCreateClick}
              className="bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
            >
              Create Post
            </a>
          </li>
          <li>
            <Link href={"/contact"}>Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        {userData ? (
          <div className="flex items-center">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <Image
                    alt="New image description"
                    src="/images/panda.png" 
                    width={100} 
                    height={100} 
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-60 p-2 shadow"
              >
                <li>
                  <a className="justify-between text-bold">
                    {userData.username}
                  </a>
                </li>

                <li>
                  <a href={`/my-blogs/${userData.username}`}>My Blogs</a>
                </li>

                <li>
                  <a
                    onClick={handleLogOut}
                    className="justify-between text-red-600"
                  >
                    LogOut
                  </a>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            <Link
              href="/auth/signin"
              className="p-2 mr-4 hover:bg-slate-200 rounded-md transition-all"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="p-2 mr-4 rounded-md bg-primary hover:bg-primary-dark hover:text-white transition-all"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
