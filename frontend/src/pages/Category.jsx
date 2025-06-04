import React, { useEffect, useState } from "react";
import AddCategory from "../components/AddCategory";
import { getAllCategoryApi } from "../Services/allApi";
import EditCategory from "../components/EditCategory";
import DeleteCategory from "../components/DeleteCategory";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const Category = () => {
  const [allcategory, setAllCategory] = useState([]);

  useEffect(() => {
    const getAllCategory = async () => {
      const res = await getAllCategoryApi();
      if (res.data.length > 0) {
        setAllCategory(res.data);
      }
    };
    getAllCategory();
  }, []);

  return (
    <div className="p-6 bg-white rounded-xl border border-gray-200">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
            <p className="mt-2 text-gray-600">
              Manage your blog categories and organization
            </p>
          </div>
          <AddCategory />
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allcategory.length > 0 ? (
                  allcategory.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item?.categoryName}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full inline-block">
                          {item?.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          <EditCategory item={item}/>           
                          <DeleteCategory categoryId={item._id}/>
                            
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-8 text-center">
                      <div className="text-gray-500">No categories found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;