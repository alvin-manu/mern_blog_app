import React from "react";
import profile from "../assets/profile.jpg";
import { Link } from "react-router-dom";

function ArticleCard({ blog }) {
  return (
    <Link to={`/blog/${blog._id}`}>
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {/* Image container with fixed aspect ratio */}
      <div className="relative pt-[56.25%] overflow-hidden rounded-t-xl"> {/* 16:9 aspect ratio */}
        <img
          src={blog?.featuredImage || `https://t4.ftcdn.net/jpg/03/86/82/73/360_F_386827376_uWOOhKGk6A4UVL5imUBt20Bh8cmODqzx.jpg`}
          alt="Future of Work"
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      {/* Rest of the card content remains the same */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="md:text-xl text-lg font-bold text-gray-800 mb-2 min-h-[72px]">
          {blog?.title.length > 65 ? blog?.title.slice(0, 65) + "..." : blog?.title || 'Future of Work'}
        </h3>

        {/* Description */}
        <p className="text-gray-600 md:text-lg mb-4 line-clamp-3 flex-grow text-sm"> {/* Added line-clamp */}
          {blog?.description || 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus incidunt, sit dignissimos labore odit pariatur quae ullam praesentium illo saepe'} {/* Replace with your actual description field */}
        </p>
        {/* Author Info - Will stick to bottom */}
        <div className="mt-auto flex justify-between items-center border-t pt-4"> {/* Added mt-auto */}
          <div className="flex items-center gap-3">
            <img
              src={blog?.user?.avatar || profile}
              alt="post profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full"
            />
            <h4 className="font-semibold text-gray-800">{blog?.user?.name}</h4>
          </div>
          <span className="text-gray-500 text-sm">
            {new Date(blog?.createdAt).toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'short' 
            })}
          </span>
        </div>
      </div>
    </div>
    </Link>

  );
}

export default ArticleCard;
