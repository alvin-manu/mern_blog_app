import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { searchBlogsApi } from "../Services/allApi";

const SearchResultsPage = () => {
  const location = useLocation();
  const [blogs, setBlogs] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get("q");

    // if (query) {
    //   searchBlogsApi(query).then((res) => {
    //     setBlogs(res.data);
    //     setLoading(false);
    //   });
    // }

    const allBlogs = async () => {
      try {
        const res = await searchBlogsApi(query);
        console.log(res);
        setBlogs(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      allBlogs();
    }
  }, [location.search]);

  if (loading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="search-results">
      <>
        <h2>Results for "{new URLSearchParams(location.search).get("q")}"</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-4 mt-3">

          {blogs?.length > 0 ? (
            blogs?.map((item) => <ArticleCard blog={item} />)
          ) : (
            <div>No Data Found</div>
          )}
        </div>
      </>
    </div>
  );
};

export default SearchResultsPage;
