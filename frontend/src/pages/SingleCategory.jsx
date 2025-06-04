import React, { useEffect, useState } from "react";
import { categoryBlogsApi } from "../Services/allApi";
import ArticleCard from "../components/ArticleCard";
import { useLocation } from "react-router";

const SingleCategory = () => {
  const location = useLocation();
  const { data } = location.state || {};
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryBlogs = async () => {
    try {
      const res = await categoryBlogsApi(data._id);
      if (res.status === 201) {
        setBlogs(res.data.blogArticles);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    categoryBlogs();
  }, [data]);

  console.log(data);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Category Header with decorative elements */}
      <div className="text-center mb-3">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 relative inline-block">
          {data.categoryName.toUpperCase()}
          {/* <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></span> */}
        </h1>
      </div>

      {/* Articles Grid */}
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 mt-3">
          {blogs.map((item) => (
            <ArticleCard
              key={item.id}
              blog={item}
              className="hover:scale-[1.02] transition-transform duration-300"
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No Articles Found
          </h3>
          <p className="text-gray-500 max-w-md mx-auto">
            We couldn't find any articles in this category. Check back later or
            explore other categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default SingleCategory;
