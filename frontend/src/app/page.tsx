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
    return <div>Error fetching data. Please try again later.</div>;
  }
}
