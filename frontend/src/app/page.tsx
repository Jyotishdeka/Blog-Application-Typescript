"use client";
import { useEffect, useState } from "react";
import ArticleList from "@/components/ArticleList";
import Tabs from "@/components/Tabs";
import { fetchArticles, fetchCategories } from "@/http";
import qs from "qs";
import { div } from "framer-motion/client";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Updated type
  

  // Fetch categories and articles data on component mount
  const fetchData = async () => {
    try {
      // Fetch categories data
      const categoriesResponse = await fetchCategories();
      setCategories(categoriesResponse.data.data);

      // Fetch articles data
      const options = {
        populate: ["cover", "author.avatar"],
        sort: ["id:desc"],
      };
      const queryString = qs.stringify(options);
      const articlesResponse = await fetchArticles(queryString);
      setArticles(articlesResponse.data.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("There was an issue fetching the data. Please try again later.");
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Optionally, add a function to refetch data when certain actions occur (e.g., after sorting or adding articles)
  const handleDataUpdate = () => {
    setLoading(true);
    fetchData();
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-dark"></div>
      <p className="ml-4 text-lg font-semibold">Loading....</p>
    </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md rounded-lg bg-primary bg-opacity-80 p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">{error}</p>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleDataUpdate}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-20">
      <Tabs categories={categories} />
      <ArticleList articles={articles} />
    </div>
  );
}
