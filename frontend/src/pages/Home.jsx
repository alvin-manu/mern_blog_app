import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { allBlogApi } from "../Services/allApi";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const allBlogs = async () => {
    const res = await allBlogApi();
    console.log(res.data);
    setBlogs(res.data);
  };
  useEffect(() => {
    allBlogs();
  }, []);
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 mt-3">
        {blogs.length > 0 ? (
          blogs.map((item) => <ArticleCard blog={item} />)
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </>
  );
};

export default Home;
