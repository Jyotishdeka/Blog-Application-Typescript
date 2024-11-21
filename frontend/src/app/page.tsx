import ArticleList from "@/components/ArticleList";
import Tabs from "@/components/Tabs";
import { fetchArticles, fetchCategories } from "@/http";
import { IArticle, ICategory, ICollectionResponse } from "@/types";
import { AxiosResponse } from "axios";
import qs from "qs";

export default async function Home() {
  try {
    // Fetch categories data
    const {
      data: categories,
    }: AxiosResponse<ICollectionResponse<ICategory[]>> =
      await fetchCategories();

    // Fetch articles data
    const options = {
      populate: ["cover", "author.avatar"],
      sort: ["id:desc"],
    };

    const queryString = qs.stringify(options);

    const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
      await fetchArticles(queryString);

    return (
      <div className="mb-20">
        <Tabs categories={categories.data} /> {/* Pass categories directly */}
        <ArticleList articles={articles.data} /> {/* Pass articles directly */}
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
          <button className="px-6 py-2 cursor-pointer text-white bg-primary hover:bg-primary-dark rounded-lg shadow-black shadow-2xl transition duration-300">
            Retry
          </button>
        </div>
      </div>
    );
  }
}
