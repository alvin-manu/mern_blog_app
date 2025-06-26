import React, { useEffect, useState } from "react";
import {
  editBlogApi,
  getAllCategoryApi,
  viewBlogArticleApi,
} from "../Services/allApi";
import Editor from "../components/Editor";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router";

// import { ClassicEditor } from "ckeditor5";

const EditBlog = () => {
  const [allcategory, setAllCategory] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    category: "",
    blogimg: "",
  });
  const [blogContent, setBlogContent] = useState("");
  const [featuredimage, setFeaturedImage] = useState("");

  const viewBlog = async () => {
    const response = await viewBlogArticleApi(id);
    if (response.status === 201) {
      const result = response.data[0];
      console.log(result);
      setForm({
        ...form,
        category: result.category._id,
        title: result.title,
        blogimg: result.featuredImage,
      });
      setBlogContent(result.content);
    }
  };

  const handleRemoveImage = () => {
    setFeaturedImage(null);
  };

  // useeffect to get category
  useEffect(() => {
    const getAllCategory = async () => {
      const res = await getAllCategoryApi();
      if (res.data.length > 0) {
        setAllCategory(res.data);
      }
    };
    getAllCategory();
    viewBlog();
  }, []);

  // to set blog content
  const handleBlogContent = (e, editor, html) => {
    setBlogContent(html);
  };

  const editblogfn = async () => {
    const { title, category } = form;
    if (!title || !category || !blogContent) {
      return toast.warning("Please fill all the fields");
    }
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
    };

    try {
      const newform = new FormData();
      newform.append("title", title);
      newform.append("category", category);
      newform.append("content", blogContent);
      if (featuredimage) {
        newform.append("featuredImage", featuredimage);
        const res = await editBlogApi(newform, reqheader,id);
        toast.success(res.data.message);
        navigate(`/blog/${id}`)
      } else {
        newform.append("featuredImage", form.blogimg);
        const res = await editBlogApi(newform, reqheader,id);
        console.log(res)
        toast.success(res.data.message);
        navigate(`/blog/${id}`)
      }
    } catch (error) {
      toast.error(error);
    }
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
              setForm({ ...form, category: e.target.value })
            }
             value={form.category}
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
            {featuredimage || form.blogimg ? (
              <div className="object-cover w-full h-full rounded-lg relative">
                <img
                  src={
                    featuredimage
                      ? URL.createObjectURL(featuredimage)
                      : form.blogimg
                  }
                  alt="Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
                {featuredimage ? (
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                  >
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                ) : (
                  ""
                )}
              </div>
            ) : (
              <img
                src={form.blogimg}
                alt="Preview"
                className="object-cover w-full h-full rounded-lg"
              />
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
          onClick={editblogfn}
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default EditBlog;
