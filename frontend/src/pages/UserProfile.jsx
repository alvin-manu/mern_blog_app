import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import profilePlaceholder from "../assets/profile.jpg";
import { getUserByIdApi, getUserPostsByIdApi } from "../Services/allApi";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserByIdApi(id);
        const userBlogs = await getUserPostsByIdApi(id);
        if (userData.status === 201) {
          setUser(userData.data.userDetails[0]);
        }
        if (userBlogs.status === 201) {
          console.log(userBlogs);
          setBlogs(userBlogs.data.blogArticles);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!user) return <div className="text-center py-20">User not found</div>;
  console.log(user);
  console.log(blogs);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="relative">
            <img
              src={user.avatar || profilePlaceholder}
              alt={user.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-md"
            />
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-100 rounded-full"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-100 rounded-full"></div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {user.name}
            </h1>

            <p className="text-gray-600 mb-4 max-w-2xl">
              {user.bio || "This user hasn't written a bio yet."}
            </p>

            {/* Website Link */}
            {user.websiteLink && (
              <div className="mt-1">
                <a
                  href={user.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center justify-center md:justify-start"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  {user.websiteLink.replace(/(^\w+:|^)\/\//, "")}
                </a>
              </div>
            )}

            {/* Stats */}
            <div className="flex justify-center md:justify-start gap-6 mt-2">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  {blogs.length}
                </div>
                <div className="text-gray-500 text-sm">Articles</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User's Articles */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
          {blogs.length > 0 ? `Latest Articles` : `No Articles Yet`}
        </h2>

        {/* Articles Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <ArticleCard blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">
              No articles published yet
            </h3>
            <p className="text-gray-500">
              When {user.name} writes articles, they'll appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
