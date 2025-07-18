import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { getAllCategoryApi } from "../Services/allApi";
import { useSelector } from "react-redux";

const Sidebar = ({ isSidebarOpen }) => {
  const [allcategory, setAllCategory] = useState([]);
  const userData = useSelector((state) => state.user);
  console.log(userData);

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
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 sm:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white=">
        <ul className="space-y-2 font-medium">
        

          <li>
            <Link
              to={"/"}
              className="flex items-center p-2 text-gray-900 rounded-lg  hover:bg-gray-100  group"
            >
              <i class="fa-solid fa-house shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
              <span className="ms-3">Home</span>
            </Link>
          </li>

          {userData?.user.role ? (
            <li>
              <Link
                to={"/createblog"}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <i class="fa-solid fa-pencil shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Write</span>
              </Link>
            </li>
          ) : (
            ""
          )}

          {userData.user.role === "admin" ? (
            <ul className="space-y-2 font-medium">
              <li>
                <Link
                  to={"/category"}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    Category (Admin)
                  </span>
                </Link>
              </li>
               <li>
                <Link
                  to="/users"
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">Users (Admin)</span>
                </Link>
              </li>
              <li>
                <Link
                  to={"/allblogs"}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <svg
                    className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    All Blogs (Admin)
                  </span>
                </Link>
              </li>
             
            </ul>
          ) : (
            ""
          )}
        </ul>

        <ul className="space-y-2 font-medium">
          <h2 className="p-2">CATEGORIES</h2>
          {allcategory.length > 0 &&
            allcategory.map((category) => (
              <li>
                <Link
                  to={`/category/${category.categoryName.toLowerCase()}`}
                  state={{ data: category }}
                  className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                >
                  <i class="fa-regular fa-circle-dot shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900"></i>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    {category.categoryName.toUpperCase()}
                  </span>
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
