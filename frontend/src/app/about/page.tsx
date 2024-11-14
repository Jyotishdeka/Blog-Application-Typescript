"use client";
import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import { fetchUsers } from "@/http";
import { IAuthor } from "@/types";



const AboutPage = () => {
  const [users, setUsers] = useState<IAuthor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetchUsers();
        // Filter and sort users with more than 1 article, in descending order based on article count
        const filteredUsers = response.data
          .filter((user: IAuthor) => user.articles.length > 1)
          .sort(
            (a: IAuthor, b: IAuthor) => b.articles.length - a.articles.length
          ); // Sorting in descending order

        setUsers(filteredUsers); // Set sorted and filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    loadUsers();
  }, []);
  console.log("Users", users);

  return (
    <div className=" flex flex-col items-center w-full min-h-screen  p-6 md:p-12 text-gray-900 mb-36 ">
      
        {loading ? (
        // Loading screen or spinner
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-dark"></div>
          <p className="ml-4 text-lg font-semibold">Loading....</p>
        </div>
      ) : (

      <div className="max-w-3xl w-full rounded-xl shadow-xl bg-white overflow-hidden p-10 md:p-16 relative">
        {/* Header Section */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className=" font-Adu text-5xl font-extrabold mb-4 text-black">
            About <span className="text-primary-dark"> Us</span>
          </h1>
          <p className="text-gray-700 text-lg md:text-xl  font-Adu">
            Welcome to Narrative Nest! We’re passionate about sharing stories
            that inform, inspire, and empower.
          </p>
        </div>

        {/* Our Mission Section */}
        <section className="mb-10 animate-slide-up">
          <h2 className="text-3xl font-bold font-Adu text-primary mb-5">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed ">
            Our mission is to provide our readers with high-quality content on a
            variety of topics, crafted by a community of passionate authors. We
            believe in the power of storytelling to connect people and inspire
            positive change.
          </p>
        </section>

        {/* Registered Users Section */}
        <section className="animate-slide-up">
          <h2 className="text-3xl font-bold text-primary mb-5 font-Adu">Our Authors</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8 ">
            Meet our dedicated authors who actively contribute to our platform.
            These talented individuals have shared insightful articles to engage
            and inform our readers.
          </p>

          {/* List of Registered Users with Articles */}
          {users.map((user, index) => (
            <div
              key={index}
              className=" font-Adu flex items-center space-x-6 mb-6 p-4 bg-gray-100 rounded-lg shadow-md hover:bg-gray-200 transition-colors"
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-primary-dark shadow-lg">
                <Image
                  src={user.avatar?.formats.thumbnail.url}
                  alt={`${user.username}`}
                  width={256} // Width of the image
                  height={256} // Height of the image
                  quality={75}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {user.username}
                </h3>
                <p className="text-gray-500 text-sm">{user.email}</p>
                <p className="text-gray-600 text-sm">
                  Articles Published: {user.articles.length}
                </p>
              </div>
            </div>
          ))}
        </section>
        
      </div>
      )}
      {/* Decorative Background Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-primary-dark opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
      
    </div>
       
  );
};

export default AboutPage;
