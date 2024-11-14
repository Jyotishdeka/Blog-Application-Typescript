import { IArticle } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface IPropType {
  article: IArticle;
}

const BlogCard = ({ article }: IPropType) => {
  // Format the createdAt date (optional)
  const formattedDate = new Date(article.createdAt).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Limit description to the first 5-6 words
  const truncatedDescription =
    article.description.split(" ").slice(0, 6).join(" ") +
    (article.description.split(" ").length > 6 ? "..." : "");

  return (
    <div className="w-full max-w-sm min-h-[28rem] rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col">
      {/* Background image with gradient overlay */}
      <div className="relative h-48">
        <Image
          className="w-full h-full object-cover"
          src={`http://localhost:1337${article.cover.url}`}
          alt="Blog Post"
          width={400}
          height={200}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
      </div>

      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-xl font-semibold mb-2 text-gray-900 truncate">
            {article.title}
          </h2>
          <div className="text-gray-600 mb-4 line-clamp-3 max-h-[4.5rem] overflow-hidden">
            {truncatedDescription}
          </div>
        </div>

        <div className="flex items-center mt-4">
          <div className="rounded-full overflow-hidden mr-3 border border-gray-200">
            <Image
              src={
                article.author?.avatar?.formats?.thumbnail?.url
                  ? `http://localhost:1337${article.author.avatar.formats.thumbnail.url}`
                  : '/images/panda.png' // Replace with the path to your default image
              }
              alt="Author"
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

        <Link
          href={`article/${article.slug}`}
          className="inline-block w-full text-center px-4 py-2 mt-4 text-sm font-semibold text-black bg-primary rounded-lg shadow-md hover:bg-primary-dark hover:text-white transition-transform transform hover:-translate-y-0.5"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
