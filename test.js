// ProfileSection.jsx
import React, { useState } from "react";
import ArticleCard from "./ArticleCard";

const ProfileSection = () => {
  // Mock data for demonstration
  const [blogs, setBlogs] = useState([
    {
      _id: "1",
      title: "The Future of Remote Work",
      content: "<p>Remote work is transforming how companies operate...</p>",
      featuredImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500",
      user: {
        _id: "user1",
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      createdAt: "2023-05-15T10:30:00Z"
    },
    {
      _id: "2",
      title: "Understanding Modern JavaScript Frameworks",
      content: "<p>JavaScript frameworks have evolved significantly...</p>",
      featuredImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500",
      user: {
        _id: "user1",
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      createdAt: "2023-04-22T14:45:00Z"
    },
    {
      _id: "3",
      title: "Design Systems for Modern Applications",
      content: "<p>Consistency in UI design is crucial for user experience...</p>",
      featuredImage: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=500",
      user: {
        _id: "user1",
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      createdAt: "2023-03-10T09:15:00Z"
    }
  ]);

  const handleEdit = (blogId) => {
    console.log("Edit blog with id:", blogId);
    // Your edit logic here
  };

  const handleDelete = (blogId) => {
    console.log("Delete blog with id:", blogId);
    // Your delete logic here
    setBlogs(blogs.filter(blog => blog._id !== blogId));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="pb-4 mb-8">
        <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
          My Articles
        </h2>
        <br />
        <hr className="border-gray-200" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs?.length > 0 ? (
          blogs?.map((item) => (
            <div 
              key={item._id} 
              className="relative group overflow-hidden rounded-xl"
            >
              {/* Original Article Card */}
              <ArticleCard blog={item} />
              
              {/* Edit/Delete Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="flex space-x-3 w-full">
                  <button
                    onClick={() => handleEdit(item._id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-12 text-center">
            <div className="bg-gray-100 rounded-xl p-8 max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-medium text-gray-700 mb-2">No Articles Found</h3>
              <p className="text-gray-500">You haven't published any articles yet. Start writing your first article!</p>
              <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                Create Article
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;