import React from "react";
import { AxiosResponse } from "axios";
import { IArticle, ICollectionResponse, IParagraph } from "@/types";
import { fetchArticleBySlug } from "@/http";
import qs from "qs";
import Image from "next/image";

const ArticlePage = async ({ params }: { params: { slug?: string } }) => {
  // Construct the query string for fetching the article by slug
  const queryString = qs.stringify({
    populate: ["cover", "author.avatar"],
    filters: {
      slug: {
        $eq: params.slug,
      },
    },
  });

  // Fetch the article using the custom fetchArticleBySlug method
  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticleBySlug(queryString);

  // Extract the first article (assuming slug should return only one article)
  const article = articles.data[0];

  // If no article is found, return a message
  if (!article) {
    return <div>No article found.</div>;
  }

  // Format the article's creation date
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Function to render the article's body
  const renderBody = (body: IParagraph[] | undefined) => {
    // If body is undefined or empty, return a fallback
    if (!body || body.length === 0) {
      return <p>No content available.</p>;
    }

    return body.map((paragraph, index) => (
      <p key={index} className="mb-4">
        {paragraph.children.map((text, idx) => (
          <span key={idx}>{text.text}</span>
        ))}
      </p>
    ));
  };

  return (
    <div className="m-12 mb-28 grid lg:grid-cols-3 gap-12">
      {/* Article Section */}
      <div className="col-span-2">
        <h1 className="text-2xl font-bold py-2">{article.title}</h1>
        <div className="flex items-center mb-4">
          <div className="rounded-full overflow-hidden mr-3 border border-gray-200">
            <Image
              className="rounded-full"
              src={
                article.author?.avatar?.formats?.thumbnail?.url?.startsWith("/")
                  ? `https://mindful-sunrise-bc9bc44f46.strapiapp.com${article.author.avatar.formats.thumbnail.url}`
                  : article.author?.avatar?.formats?.thumbnail?.url
              }
              alt={article.author?.username || "Author"}
              width={40}
              height={40}
            />
          </div>
          <div>
            <span className="text-sm font-semibold text-gray-700">
              {article.author.username}
            </span>
            <br />
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
        </div>
        <div className="text-lg text-gray-600 leading-8">
          <Image
            className="w-full my-12 mb-6"
            src={
              article.cover?.url?.startsWith("/")
                ? `https://mindful-sunrise-bc9bc44f46.media.strapiapp.com${article.cover.url}`
                : article.cover?.url || "/images/default.jpg"
            }
            width={1000}
            height={500}
            alt={article.title}
          />
          {/* Render article body */}
          <div className="shadow-2xl shadow-purple-300 text-black font-medium p-10">
          {renderBody(article.Body)}
          </div>
        </div>
      </div>

      {/* Left Side - Related or Additional Content */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Related Articles</h2>
        <ul className="space-y-4">
          {/* Example of related articles */}
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              How MySQL Bug Became a Meme on the Internet
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Understanding MySQL's Impact on Databases
            </a>
          </li>
          <li>
            <a href="#" className="text-blue-600 hover:underline">
              Why Databases Fail: Analyzing Bugs
            </a>
          </li>
        </ul>

        {/* Tags Section */}
        <h2 className="text-xl font-semibold mt-8 mb-4">Tags</h2>
        <div className="flex flex-wrap gap-2">
          {/* Example tags */}
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">
            MySQL
          </span>
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">
            Bugs
          </span>
          <span className="px-3 py-1 bg-gray-200 text-sm rounded-full">
            Databases
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
