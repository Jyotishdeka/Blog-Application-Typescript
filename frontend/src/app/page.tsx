import ArticleList from "@/components/ArticleList";
import Tabs from "@/components/Tabs";
import { fetchArticles, fetchCategories } from "@/http";

import qs from "qs";



export default async function Home() {
  try {
    // Fetch categories data
    const categoriesResponse = await fetchCategories();
    const categories = categoriesResponse.data.data;

    // Fetch articles data
    const options = {
      populate: ["cover", "author.avatar"],
      sort: ["id:desc"],
    };

    const queryString = qs.stringify(options);
    const articlesResponse = await fetchArticles(queryString);
    const articles = articlesResponse.data.data;

    return (
      <div className="mb-20">
        <Tabs categories={categories} />
        <ArticleList articles={articles} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="max-w-md rounded-lg bg-primary bg-opacity-80 p-8 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-700 mb-6">
            There was an issue fetching the data. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}
