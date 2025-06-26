import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../redux/user/userSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dailydraft from "../assets/dailydraft.svg"

const Header = ({ toggleSidebar }) => {
  const user = useSelector((state) => state.user);
  const [ismenuopen, setIsMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleMobileSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
    setShowMobileSearch(!showMobileSearch)
  };

  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(removeUser());
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 py-3 lg:px-6 lg:pl-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center justify-start space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 text-gray-600 rounded-lg hover:bg-gray-50 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>

            <Link to="/" className="flex items-center">
              <img
                src={dailydraft}
                className="h-9 mr-1"
                alt="Logo"
              />
              <span className="self-center text-xl font-bold text-gray-800 whitespace-nowrap">
                DailyDraft
              </span>
            </Link>
          </div>

          {/* Center Search (Desktop) */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <span className="sr-only">Search</span>
              <MagnifyingGlassIcon className="w-6 h-6" />
            </button>

            {user.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setIsMenuOpen(!ismenuopen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
                    src={
                      user?.user?.avatar ||
                      "https://avatars.dicebear.com/api/initials/${user?.user?.name}.svg"
                    }
                    alt="Profile"
                  />
                </button>

                {/* User Dropdown */}
                {ismenuopen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.user?.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.user?.email}
                      </p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/profile"
                        className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={logOut}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition-shadow"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {showMobileSearch && (
          <div className="lg:hidden mt-3 px-2">
            <div className="relative">
              <form onSubmit={handleMobileSearch}>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                  <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute right-3 top-3.5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
