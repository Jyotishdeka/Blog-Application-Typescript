import Tabs from '@/components/Tabs';
import { fetchArticles, fetchCategories } from '@/http';
import { IArticle, ICategory, ICollectionResponse } from '@/types';
import { AxiosResponse } from 'axios';
import React from 'react';
import qs from 'qs';
import ArticleList from '@/components/ArticleList';

const Page = async ({ params }: { params: { slug?: string } }) => {
  // Extract the slug from the dynamic route parameter
  const categorySlug = params.slug || null;

  

  // Set up options for querying the articles
  const options = {
    populate: ["cover", 'author.avatar'],
    sort: ["id:desc"],
    filters: {},
  };

  // Add category filter if slug exists
  if (categorySlug) {
    options.filters = {
      category: {
        slug: categorySlug,
      },
    };
  }

 

  const queryString = qs.stringify(options, { encodeValuesOnly: true });

  // Fetch articles based on the query string
  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> = await fetchArticles(queryString);

  // Fetch categories for the tabs component
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> = await fetchCategories();

  return (
    <div>
      {/* Pass categories and articles data to their respective components */}
      <Tabs categories={categories.data} />
      <ArticleList articles={articles.data} />
    </div>
  );
};

export default Page;
