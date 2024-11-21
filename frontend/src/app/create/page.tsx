"use client";
import React, { useState, useEffect } from "react";
import { fetchCategories, createArticle } from "@/http";
import { useRouter } from "next/navigation";
import { ICategory, ICollectionResponse } from "@/types";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<
    ICollectionResponse<ICategory[]> | null
  >(null);
  const router = useRouter();

  // Convert content to JSON
  const convertContentToJson = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const bodyArray = Array.from(doc.body.children)
      .map((node) => {
        if (node.tagName === "P") {
          const children = Array.from(node.childNodes)
            .map((child) => {
              if (child.nodeType === Node.TEXT_NODE) {
                return { text: child.textContent, type: "text", bold: false };
              }
              if (child.nodeType === Node.ELEMENT_NODE) {
                const element = child as HTMLElement;
                return {
                  text: element.textContent,
                  type: "text",
                  bold:
                    element.tagName === "STRONG" ||
                    element.style.fontWeight === "bold",
                };
              }
              return null;
            })
            .filter(Boolean);
          return { type: "paragraph", children };
        }
        return null;
      })
      .filter(Boolean);
    return bodyArray;
  };

  // Fetch categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        toast.error("Failed to load categories. Please try again later.");
        console.error("Error fetching categories:", error);
      }
    };
    loadCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user.id) throw new Error("User not found. Please log in.");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("Body", JSON.stringify(convertContentToJson(content)));
      formData.append("author", user.id);
      if (cover) formData.append("files.cover", cover);

      await createArticle(formData);
      toast.success("Post created successfully!");

      setTitle("");
      setDescription("");
      setCover(null);
      setCategory("");
      setContent("");
      router.push("/");
    } catch (error) {
      toast.error("Error creating blog. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mb-24 mt-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Create New <span className="text-primary-dark">Blog Post</span>
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="col-span-1">
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-1">
          <label
            htmlFor="description"
            className="block text-lg font-semibold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="cover" className="block text-lg font-semibold mb-2">
            Cover Image
          </label>
          <input
            type="file"
            id="cover"
            onChange={(e) => setCover(e.target.files?.[0] || null)}
            className="w-full p-4 border rounded-lg"
          />
        </div>

        <div className="col-span-1">
          <label htmlFor="category" className="block text-lg font-semibold mb-2">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories?.data.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.Title}
              </option>
            ))}
          </select>
        </div>

        <div className="col-span-1 md:col-span-2">
          <label htmlFor="body" className="block text-lg font-semibold mb-2">
            Body
          </label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="border rounded-lg"
          />
        </div>

        <div className="col-span-1 md:col-span-2">
          <button
            type="submit"
            className="w-full bg-primary hover:bg-primary-dark text-gray-600 py-3 rounded-md font-semibold"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
