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
    console.log("handling Search", query);
  };

  return (
    <div className="my-8 flex flex-col sm:flex-row items-center justify-between border-b-2 border-gray-100">
  {/* Category List for Larger Screens */}
  <div className="w-full sm:w-auto">
    <ul className="hidden sm:flex flex-col sm:flex-row items-center w-full sm:w-auto">
      {/* "Recent" tab */}
      <li
        className={
          "border-b-4 rounded-sm mb-2 sm:mb-0 sm:mr-6 p-4 " +
          `${pathname === "/" ? "border-primary-dark text-primary-dark" : "border-white"}`
        }
      >
        <Link href="/">Recent</Link>
      </li>
      {categories?.map((category) => (
        <li
          key={category.id}
          className={
            "border-b-4 rounded-sm mb-2 sm:mb-0 sm:mr-6 p-4 " +
            `${isActiveLink(category) ? "border-primary-dark text-primary-dark" : "border-white"}`
          }
        >
          <Link href={`/category/${category.slug}`}>{category.Title}</Link>
        </li>
      ))}
    </ul>

    {/* Dropdown for Mobile */}
    <select
      className="block sm:hidden w-full border p-2 rounded-md"
      value={pathname.includes("/category/") ? pathname.split("/category/")[1] : "/"}
      onChange={(e) => {
        const selectedSlug = e.target.value;
        if (selectedSlug) {
          window.location.href = selectedSlug === "/" ? "/" : `/category/${selectedSlug}`;
        }
      }}
    >
      {/* "Recent" option */}
      <option value="/" className="text-gray-700">
        Recent
      </option>

      {/* Category options */}
      {categories?.map((category) => (
        <option
          key={category.id}
          value={category.slug}
          className="text-gray-700"
          selected={isActiveLink(category)} // Optional, as `value` already tracks this
        >
          {category.Title}
        </option>
      ))}
    </select>
  </div>

  {/* Search input */}
  <div className="mt-4 sm:mt-0">
    <input
      onChange={(e) => handleOnSearch(e.target.value)}
      type="text"
      placeholder="Search Blogs is not working for now"
      className="input input-md input-bordered border-primary w-full sm:max-w-xs"
    />
  </div>
</div>

  );
};

export default Tabs;
