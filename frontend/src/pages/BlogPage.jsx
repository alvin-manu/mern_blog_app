import React, { useEffect, useState } from "react";
import article1 from "../assets/article1.jpg";
import { Link, useParams } from "react-router";
import { patchLikeBlogsApi, viewBlogArticleApi } from "../Services/allApi";
import Comment from "../components/Comment";
import { toast } from "react-toastify";

const BlogPage = () => {
  // Like functionality state
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();
  const [blogArticle, setBlogArticle] = useState({});

  const viewBlog = async () => {
    const response = await viewBlogArticleApi(id);
    if (response.status === 201) {
      const result = response.data;
      setBlogArticle(result[0]);

      const tokenUser = JSON.parse(sessionStorage.getItem("existingUser")); 

      if(tokenUser){
        const userId = tokenUser?._id;
        console.log(userId)
        // ✅ Check if user has liked the post
        const isUserLiked = result[0]?.likes?.includes(userId);
        console.log(isUserLiked)
        isUserLiked ? setIsLiked(true) : "";
        setLikes(result[0]?.likes?.length || 0);
      }
    }
  };

  const likeBlogfn = async () => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ? token : ""}`,
    };

    try {
      const res = await patchLikeBlogsApi(id, reqheader);

      if(res.status === 201){
        const result = res.data;
        console.log(result);
        setLikes(result.likes);
        setIsLiked(!isLiked);
      }
      else if(res.status === 401){
        toast.error("Please Login to perform the action")
      }else{
        toast.error("Something wrong happened")
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    viewBlog();
  }, []);
  console.log(blogArticle);

  return (
    <div className="min-h-screen bg-white py-4 md:py-12 px-2 sm:px-4 lg:px-6">
      <main className="max-w-4xl mx-auto">
        {/* Blog Header */}
        <header className="text-center mb-4 md:mb-12">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {blogArticle?.title}
          </h1>
          <div className="text-gray-500 text-sm">
            <time>
              {new Date(blogArticle?.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </time>
            <span className="mx-2">•</span>
            <Link
                  to={`/category/${blogArticle?.category?.categoryName.toLowerCase()}`}
                  state={{ data: blogArticle.category }}
                >
                <span>{blogArticle?.category?.categoryName}</span>
                </Link>
          </div>
        </header>
        <img
          src={blogArticle?.featuredImage}
          alt="Future of Work"
          className="w-full object-cover object-center h-auto"
        />

        {/* Blog Content */}
        {blogArticle?.content && (
          <div
            className="prose max-w-none mt-5"
            dangerouslySetInnerHTML={{ __html: blogArticle.content }}
          />
        )}

        {/* Interactions Section */}
        <div className="flex items-center justify-between mb-8 border-t border-b border-gray-200 py-6">
          <button
            onClick={likeBlogfn}
            className={`flex items-center space-x-2 transition-colors ${
              isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"
            }`}
          >
            <svg
              className="w-5 h-5"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{likes} Likes</span>
          </button>

          <button className="text-gray-600 hover:text-blue-600 flex items-center">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            <span className="ml-2">Share</span>
          </button>
        </div>

        <Comment blogId={blogArticle?._id} />
      </main>
    </div>
  );
};

export default BlogPage;
