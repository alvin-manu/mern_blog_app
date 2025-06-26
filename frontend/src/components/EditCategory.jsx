import React, { useState } from "react";
import { editCategoryApi } from "../Services/allApi";
import { toast } from "react-toastify";

const EditCategory = ({ item }) => {
  const [open, setopen] = useState(false);
  const [editCategory, setEditCategory] = useState({
    ...item,
  });

  const editCategorylist = async () => {
    // const categoryId = editCategory._id;
    const { categoryName, slug } = editCategory;
    if ((!categoryName, !slug)) {
      toast.warning("Category name and slug should not be empty");
    } else {
       const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
      };
      try {
        const res = await editCategoryApi(editCategory,reqheader);
        if (res.status === 201) {
          toast.success(res.data.message);
          setopen(!open)
        }else{
          toast.error("Unauthorised");
          setopen(!open)
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };
  return (
    <>
      <button
        type="button"
        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-hidden focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-400 dark:focus:text-blue-400"
        onClick={() => {
          setopen(!open);
        }}
      >
        <i className="fa-solid fa-pen-to-square"></i>Edit
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
                        setEditCategory({
                          ...editCategory,
                          categoryName: e.target.value,
                        });
                      }}
                      value={editCategory?.categoryName}
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
                        setEditCategory({
                          ...editCategory,
                          slug: e.target.value,
                        });
                        console.log(category);
                      }}
                      value={editCategory?.slug}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-3"
                    onClick={editCategorylist}
                  >
                    Edit Category
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

export default EditCategory;
