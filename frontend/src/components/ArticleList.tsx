'use client'
import React from "react";
import BlogCard from "./BolgCard";
import { IArticle } from "@/types";

interface IPropType {
  articles: IArticle[];
}

const ArticleList = ({ articles }: IPropType) => {


   console.log("Articles", articles);
   

  return (
    <div className="grid lg:grid-cols-3 gap-16 mt-16 place-items-center mb-48 md:mb-44 lg:mb-40 ">
      {/* blog cards */}
      {
        articles.map(article => {
          return <BlogCard key={article.id} article={article}/>
        })
      }
    </div>
  );
};

export default ArticleList;
