import React, { useEffect, useState } from "react";
import { TrashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { allBlogApi, deleteAdminBlogApi } from "../Services/allApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const allBlogs = async () => {
    const res = await allBlogApi();
    console.log(res.data);
    setBlogs(res.data);
  };
  useEffect(() => {
    allBlogs();
  }, []);

  const navigate = useNavigate()

  const handledeleteBlog = async(id)=>{
    const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
      };
    const res = await deleteAdminBlogApi(id, reqheader);
    if(res.status === 201){
      toast.success(res.data.message)
    }else{
      toast.error("error")
    }
  }
  // to make a string to titlecase
  function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const gotoBlog = (id)=>{
  navigate(`/blog/${id}`)
}
  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
          <p className="text-gray-500 mt-1">
            Manage all blog posts and their content
          </p>
        </div>
       
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Author
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs?.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {blog?.title}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-600">{toTitleCase(blog?.user?.name)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                    {toTitleCase(blog?.category?.categoryName)}
                  </span>
                </td>
              
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(blog?.createdAt).toLocaleDateString('en-GB', { 
              day: 'numeric', 
              month: 'short',
              year: 'numeric', 
            })}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                  
                  <button className="text-red-600 hover:text-red-900 p-1.5 rounded hover:bg-red-50"
                  onClick={()=>handledeleteBlog(blog._id)}>
                    <TrashIcon className="h-5 w-5" />
                  </button>
                  <button className="text-green-600 hover:text-green-900 p-1.5 rounded hover:bg-green-50" onClick={()=>{gotoBlog(blog?._id)}}>
                    <EyeIcon className="h-5 w-5"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 px-2">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">2</span> of{" "}
          <span className="font-medium">2</span> results
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
