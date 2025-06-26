import React, { useState } from "react";
import { addCategoryApi } from "../Services/allApi";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [open, setopen] = useState(false);
  const navigate = useNavigate()
  const [category, setCategory] = useState({
    categoryName: "",
    slug: "",
  });
  const addCategory = async () => {
    const { categoryName, slug } = category;
    if (!categoryName || !slug) {
      toast.warning("please enter all the fields");
    } else {
      console.log(category)
       const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
      };
      const res = await addCategoryApi(category, reqheader);
      if (res.status === 201) {
        toast.success(res.data.message);
        navigate('/category')
        setopen(!open)
      } else if (res.status === 401) {
        toast.warning("Category Already Exists");
      } else {
        toast.error("error");
        console.log(res)
      }
    }
  };
  return (
    <>
      {/* Modal Toggle */}
      <button
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 md:mt-5 md:ms-10"
        type="button"
        onClick={() => {
          setopen(!open);
        }}
      >
        ADD CATEGORY
      </button>
      {open ? (
        <div className="absolute overflow-y-auto overflow-x-hidden z-50 flex flex-column justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-xs">
          <div className="p-4 w-full max-w-md max-h-full">
            {/* MOdal Content */}
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* MOdal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add Category
                </h3>
                <button
                  type="button"
                  className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="authentication-modal"
                  onClick={() => {
                    setopen(!open);
                  }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* modal body */}
              <div className="p-4 md:p-5">
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Category
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="category name"
                      onChange={(e) => {
                        setCategory({
                          ...category,
                          categoryName: e.target.value,
                        });
                      }}
                      value={category.categoryName}
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      placeholder="category-name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => {
                        setCategory({ ...category, slug: e.target.value });
                        console.log(category);
                      }}
                      value={category.slug}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
                    onClick={addCategory}
                  >
                    Add Category
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default AddCategory;
