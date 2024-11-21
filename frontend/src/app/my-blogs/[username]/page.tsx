"use client";
import React, { useEffect, useState } from "react";
import qs from "qs";
import { AxiosResponse } from "axios";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import icons
import { ICollectionResponse, IArticle } from "@/types";
import { fetchArticleByAuthorName, deleteArticle } from "@/http";
import { toast } from "react-toastify";
import Image from "next/image";
import { log } from "console";

const UserPage = ({ params }: { params: { username?: string } }) => {
  const [articles, setArticles] = useState<IArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const LogInUserName = params.username || null;

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true); // Set loading to true at the start of fetching

      const options = {
        populate: ["cover", "author.avatar"],
        sort: ["id:desc"],
        filters: {},
      };

      if (LogInUserName) {
        options.filters = {
          author: {
            username: LogInUserName,
          },
        };
      }

      const queryString = qs.stringify(options, { encodeValuesOnly: true });

      try {
        const { data }: AxiosResponse<ICollectionResponse<IArticle[]>> =
          await fetchArticleByAuthorName(queryString);
        setArticles(data.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };

    fetchArticles();
  }, [LogInUserName]);

  console.log(articles);

  const handleDelete = async (id: string) => {
    try {
      await deleteArticle(id);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.documentId !== id)
      );
      toast.success(`delete Successfully`, {
        position: "top-right",
        autoClose: 8000,
      });
      // Optionally, update your state to remove the deleted item from the UI
    } catch (error) {
      console.error("Failed to delete article:", error);
    }
  };

  const handleEdit = (id: number) => {
    console.log(`Edit blog with ID: ${id}`);
    // Implement edit logic here
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-6">
      <h1 className="text-2xl font-semibold font-Roboto mb-4">
        Hello, {LogInUserName}
      </h1>

      {isLoading ? (
        <div className="flex items-center justify-center h-48">
          {/* Spinner */}
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-primary-dark border-opacity-75"></div>
        </div>
      ) : articles.length === 0 ? ( // Check if there are no articles
        <div className="text-center p-4">
          <p className="text-lg text-gray-500">No articles available.</p>
        </div>
      ) : (
        <div className="carousel carousel-center bg-primary rounded-box max-w-4xl space-x-6 p-8 w-full">
          {articles.map((article) => (
            <div
              key={article.id}
              className="carousel-item w-80 md:w-96 lg:w-1/3 p-4 bg-white rounded-lg shadow-lg flex flex-col items-center"
            >
              <Image
                src={
                  article.cover?.url?.startsWith("/")
                    ? `https://mindful-sunrise-bc9bc44f46.media.strapiapp.com${article.cover.url}`
                    : article.cover?.url || "/images/default.jpg"
                }
                alt={article.title || "Blog Post"}
                width={320}
                height={240}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <h2 className="text-lg font-bold mb-2">{article.title}</h2>
                <p className="text-sm mb-4">
                  {article.description || "No description available"}
                </p>
                <div className="flex justify-center gap-4">
                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(article.documentId)}
                    className="text-red-500 hover:text-red-700 transition"
                  >
                    <FaTrash size={20} />
                  </button>

                  {/* Edit Icon */}
                  <button
                    onClick={() => handleEdit(article.id)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <FaEdit size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserPage;
