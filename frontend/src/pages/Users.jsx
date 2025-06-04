import React, { useEffect, useState } from "react";
import { getAllUsersApi } from "../Services/allApi";
import BanUser from "../components/BanUser";
import UnbanUser from "../components/UnbanUser";

const Users = () => {
  const [allUsers, setAllUsers] = useState([]);
  const getAllUserData = async () => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
    };
    const res = await getAllUsersApi(reqheader);
    const result = res.data.getAllUser;
    if (result) {
      setAllUsers(result);
      console.log(result);
    }
  };
  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <div className=" p-3 md:p-6 bg-white rounded-xl border border-gray-200">
      {allUsers.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="md:flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                User Management
              </h2>
              <p className="text-gray-500 mt-1">
                Manage all Users and their content
              </p>
            </div>

            <div className="relative">
              <input
                type="search"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Bio
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Website
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allUsers.map((user) => (
                  <tr
                    key={user?._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {user?.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user?.avatar}
                              alt={user?.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                              {user?.name[0]}
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user?.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">
                      {user?.bio || "No bio available"}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {user.websiteLink && (
                        <a
                          href={user.websiteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 inline-flex items-center"
                        >
                          Visit
                          <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          user?.isBanned
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {user?.isBanned ? "Banned" : "Active"}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex space-x-4">
                      <button className="text-green-600 hover:text-green-900 flex items-center">
                        <i class="fa-sharp-duotone fa-solid fa-eye me-1"></i>
                        View
                      </button>
                      {user?.isBanned ? (
                        <button className="text-red-600 hover:text-red-900 flex items-center">
                          <UnbanUser id={user?._id} user={user?.name} />
                        </button>
                      ) : (
                        <button className="text-red-600 hover:text-red-900 flex items-center">
                          <BanUser id={user?._id} user={user?.name} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>
          {" "}
          <p className="text-center">No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default Users;
