"use client"
import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { FaLinkedin } from "react-icons/fa";
import { IoLogoTwitter } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form Data:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-5">
      {/* Header */}
      <section className="w-full max-w-3xl text-center mb-12">
        <h1 className=" font-Adu text-5xl font-bold text-gray-800 animate-fade-in">Contact <span className='text-primary-dark'>Us</span> </h1>
        <p className=" font-Adu text-gray-600 mt-4 text-lg animate-fade-in animation-delay-200">
          Have questions, suggestions, or just want to say hello? <span className='text-primary-dark'> We'd love to hear from you!</span>
        </p>
      </section>

      {/* Social Media Icons */}
      <section className="w-full max-w-3xl flex justify-center space-x-4 mb-10 animate-fade-in animation-delay-500">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <span className="w-10 h-10  rounded-full flex items-center justify-center hover:bg-primary-dark transition transform hover:scale-110">
            <FaLinkedin className='text-3xl'/>
          </span>
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <span className="w-10 h-10  rounded-full flex items-center justify-center hover:bg-primary transition transform hover:scale-110">
            <IoLogoTwitter className='text-3xl'/>
          </span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <span className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary-dark transition transform hover:scale-110">
            <FaInstagram className='text-3xl' />
          </span>
        </a>
      </section>

      {/* Contact Form */}
      <section className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8 mb-10 animate-slide-up">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Get In Touch</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
            rows={4}
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-black py-3 rounded-lg font-semibold hover:bg-primary-dark transition transform hover:scale-105 animate-pulse"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Map Section */}
      <section className="w-full max-w-3xl relative animate-fade-in animation-delay-1000">
        <button className="absolute bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-900 transition transform hover:scale-105">
          <Link href={"/"}>Go to Home</Link>
        </button>
      </section>
    </div>
  );
};

export default Contact;
