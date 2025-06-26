import React, { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { allBlogApi } from "../Services/allApi";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const allBlogs = async () => {
    try {
      const res = await allBlogApi();
      console.log(res.data);
      setBlogs(res.data);
    } catch (error) {
      console.log(error)
    }
    finally {
        setLoading(false);
      }
  };
  useEffect(() => {
    allBlogs();
  }, []);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  
  return (
    <>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 mt-3">
        {blogs?.length > 0 ? (
          blogs?.map((item) => <ArticleCard blog={item} />)
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </>
  );
};

export default Home;
