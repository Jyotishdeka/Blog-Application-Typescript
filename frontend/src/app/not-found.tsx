// app/not-found.js
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className=" p-20 rounded-2xl m-6 min-h-96 mt-28 flex flex-col items-center justify-center bg-gradient-to-r from-primary via-primary-dark to-secondary text-white">
      {/* Animated Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold mb-4 text-secondary"
      >
        404
      </motion.h1>

      {/* Animated Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-xl mb-8"
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
      >
        <Link
          className="px-6 py-3 bg-secondary text-blue-500 font-semibold rounded-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105"
          href="/"
        >
          Go Back to Home
        </Link>
      </motion.div>

      {/* Decorative Floating Elements */}
      <div className="absolute top-10 left-10 h-20 w-20 bg-pink-300 rounded-full opacity-50 animate-pulse" />
      <div className="absolute bottom-20 right-20 h-16 w-16 bg-purple-300 rounded-full opacity-40 animate-bounce" />
    </div>
  );
}
