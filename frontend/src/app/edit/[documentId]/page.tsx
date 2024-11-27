"use client";

import { fetchArticleByDocumentId, updateArticle } from "@/http"; // API calls
import { IArticle } from "@/types";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import qs from "qs";

const UpdatePage = ({ params }: { params: { documentId: string } }) => {

  const router = useRouter();
  const { documentId } = params;
  const [article, setArticle] = useState<IArticle | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
  });

  console.log(article);
  

  // Fetch the article by documentId
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const options = {
          populate: ["cover", "author", "author.avatar"],
         
        };
        const queryString = qs.stringify(options);
        const response = await fetchArticleByDocumentId(documentId, queryString);
        setArticle(response.data.data);

        // Populate form data
        setFormData({
          title: response.data.data.title || "",
          description: response.data.data.description || "",
          body: response.data.data.Body
            ? response.data.data.Body.map(
                (block: any) => block.children?.[0]?.text || ""
              ).join("\n") // Concatenate paragraph texts with newlines
            : "",
        });
      } catch (error) {
        console.error("Failed to fetch article:", error);
      }
    };

    fetchArticle();
  }, [documentId]);

  // Handle form field changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the updated article
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Convert the plain text body back into the structured format
      const updatedBody = formData.body.split("\n").map((text) => ({
        type: "paragraph",
        children: [
          {
            type: "text",
            text,
            bold: false, // Default bold to false; you can add more handling here if needed
          },
        ],
      }));

      const updatedData = {
        data: {
          title: formData.title,
          description: formData.description,
          Body: updatedBody,
        },
      };

      await updateArticle(documentId, updatedData);
      toast.success("Article updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Failed to update article:", error);
      toast.error("Failed to update article.");
    }
    router.push(`/my-blogs/${article?.author?.username}`);
  };

  if (!article) {
    return <div className="h-[80vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-20 shadow-2 shadow-2xl shadow-primary mt-8 py-8 mb-44">
      <h1 className="text-2xl font-bold mb-6">Edit Article</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block font-medium mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block font-medium mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Body Input */}
        <div>
          <label htmlFor="body" className="block font-medium mb-2">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            rows={10}
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className=" flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
          >
            Update Article
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePage;
