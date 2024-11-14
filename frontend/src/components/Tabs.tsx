"use client"; // Ensure this is a client-side component
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ICategory } from "@/types";
import { NextPage } from "next";

interface IPropType {
  categories: ICategory[]; // Expect categories as an array of ICategory
}

const Tabs: NextPage<IPropType> = ({ categories }) => {
  const pathname = usePathname(); // Get current pathname

  // Function to check if the current link is active
  const isActiveLink = (category: ICategory) => {
    // Check if the category's slug exists within the pathname
    return pathname.includes(`/category/${category.slug}`);
  };

  const handleOnSearch = (query: string) => {
    console.log("handling Search");
  };

  return (
    <div className="my-8 flex items-center justify-between border-b-2 border-gray-100 ">
      <ul className="flex items-center">
        {/* "Recent" tab for homepage */}
        <li
          className={
            "border-b-4 rounded-sm mr-6 p-4 " +
            `${pathname === "/" ? "border-primary-dark text-primary-dark" : "border-white"}`
          }
        >
          <Link href="/">Recent</Link>
        </li>

        {/* Iterate over categories */}
        {categories.map((category) => (
          <li
            key={category.id}
            className={
              "border-b-4 rounded-sm mr-6 p-4 " +
              `${isActiveLink(category) ? "border-primary-dark text-primary-dark" : "border-white"}`
            }
          >
            <Link href={`/category/${category.slug}`}>{category.Title}</Link>
          </li>
        ))}
      </ul>

      <input
        onChange={(e) => handleOnSearch(e.target.value)}
        type="text"
        placeholder="Search Blogs Here"
        className="input input-md input-bordered border-primary w-full max-w-xs"
      />
    </div>
  );
};

export default Tabs;
