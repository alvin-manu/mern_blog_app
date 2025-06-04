import React, { useEffect, useState } from "react";
import { addBlogApi, getAllCategoryApi } from "../Services/allApi";
import Editor from "../components/Editor";
import { toast } from "react-toastify";

// import { ClassicEditor } from "ckeditor5";

const CreateBlog = () => {
  const [allcategory, setAllCategory] = useState([]);
  const [form, setForm] = useState({
    title: "",
    category: "",
  });
  const [blogContent, setBlogContent] = useState("");
  const [featuredimage, setFeaturedImage] = useState("");

  // useeffect to get category
  useEffect(() => {
    const getAllCategory = async () => {
      const res = await getAllCategoryApi();
      if (res.data.length > 0) {
        setAllCategory(res.data);
      }
    };
    getAllCategory();
  }, []);

  // to set blog content
  const handleBlogContent = (e, editor, html) => {
    setBlogContent(html);
  };

  const addblogfn = async () => {
    const { title, category } = form;
    if (!title || !category || !featuredimage || !blogContent) {
      return toast.warning("Please fill all the fields");
    }
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
    };
    const newform = new FormData();
    newform.append("title", title);
    newform.append("category", category);
    newform.append("featuredImage", featuredimage);
    newform.append("content", blogContent);
    const res = await addBlogApi(newform, reqheader);
    toast.success(res.data.message);
  };
  // to make a string to titlecase
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }
  return (
    <>
      <div className="p-3 md:p-10">
        {/* title */}
        <div className="mb-6">
          <label
            for="text"
            className="block mb-2 text-sm font-medium text-gray-90"
          >
            Title
          </label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
            required
            value={form.title}
            onChange={(e) => {
              setForm({ ...form, title: e.target.value });
            }}
          />
        </div>
        {/* category */}
        <div className="mb-6">
          <label
            for="categories"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Category
          </label>
          <select
            id="categories"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            onChange={(e) =>
              setForm({ ...form, category: e.target.value.toLowerCase() })
            }
          >
            {allcategory?.map((item) => (
              <option key={item._id} value={item._id}>
                {toTitleCase(item.categoryName)}
              </option>
            ))}
          </select>
        </div>
        {/* Featured Image */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Featured Image
          </label>

          <label
            htmlFor="featuredImg"
            className="flex flex-col items-center justify-center w-full h-48 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition"
          >
            {featuredimage ? (
              <img
                src={URL.createObjectURL(featuredimage)}
                alt="Preview"
                className="object-cover w-full h-full rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center">
                <svg
                  className="w-8 h-8 mb-2 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M16 12l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                <p className="text-sm text-gray-500">
                  Click to upload or drag & drop
                </p>
              </div>
            )}

            <input
              id="featuredImg"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* blog content */}
        <div className="mb-6">
          <label
            for="blog_content"
            className="block mb-2 text-sm font-medium text-gray-90"
          >
            Blog Content
          </label>
          <Editor data={blogContent} onChange={handleBlogContent} />
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={addblogfn}
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default CreateBlog;
