// src/pages/ProfilePage.jsx
import React, { useState, useRef } from "react";
import ArticleCard from "../components/ArticleCard";
import Header from "../components/Header";
import { useEffect } from "react";
import { getUser, getUserPosts, updateUserApi } from "../Services/allApi";
import { toast } from "react-toastify";

export default function Profile() {
  // edit state true or false
  const [edit, setedit] = useState(false);
  // user state for storing user crediantials
  const [user, setUser] = useState({});
  // form state for storing a copy of user credentials
  const [form, setForm] = useState({});
  const [blogs, setBlogs] = useState();
  const fileInputRef = useRef(null);

  // fetching user data
  const fetchUser = async () => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
    };
    const response = await getUser(reqheader);
    // console.log(response);
    if (response.staus === 401) {
      return console.log(response.response.data.message);
    } else if (response.status === 201) {
      // console.log(response.data.user);
      const updatedUser = {
        name: response?.data?.user?.name || "",
        email: response?.data?.user?.email || "",
        avatar: response?.data?.user?.avatar || "",
        websiteLink: response?.data?.user?.websiteLink || "",
        bio: response?.data?.user?.bio || "",
      };
      setUser(updatedUser);
      setForm(updatedUser);
    } else {
      console.log("Something Went Wrong");
    }
  };

  const fetchUserPosts = async () => {
    const token = sessionStorage.getItem("token");
    const reqheader = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
    };
    const response = await getUserPosts(reqheader);
    console.log(response);
    if (response.staus === 401) {
      return console.log(response.response.data.message);
    } else if (response.status === 201) {
      // console.log(response.data.user);
      setBlogs(response.data.userBlogs);
    } else {
      console.log("Something Went Wrong");
    }
  };

  // onloading the profile page
  useEffect(() => {
    fetchUser();
    fetchUserPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // edit the profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setUser(form);
    const token = sessionStorage.getItem("token");
    const { name, email, avatar, websiteLink, bio } = form;
    if (!name || !email) {
      return toast.warning("name and email must not be empty");
    }

    const formdata = new FormData();
    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("avatar", avatar);
    formdata.append("websiteLink", websiteLink);
    formdata.append("bio", bio);

    const reqheader = {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
    };
    try {
      const res = await updateUserApi(formdata, reqheader);
      if (res.status === 200) {
        toast.success("success");
        setUser({ ...form });
        fetchUser();
        setedit(!edit);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  // edit close button fn()
  const handleEditClose = () => {
    setForm({ ...user });
    setedit(!edit);
  };

  // const fetchUserBlogs = async ()=>{
  //   const token = sessionStorage.getItem("token");
  //   const reqheader = {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token ? token : ""}`, // Send token to backend
  //   };
  // }

  return (
    <>
      <Header />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 mt-15">
        {/* Profile Section */}
        <div className="max-w-6xl mx-auto rounded-2xl bg-white shadow-md border border-gray-100 overflow-hidden relative">
          <div className="absolute inset-0 opacity-30" />
          <div className="relative p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center gap-8 ">
              <div
                className="relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 overflow-hidden shadow-lg border-4 border-white ring-2 ring-blue-200 transition-all duration-300 hover:ring-blue-400">
                  {form?.avatar ? (
                    <img
                      src={
                        typeof form.avatar === "string"
                          ? form.avatar
                          : URL.createObjectURL(form.avatar)
                      }
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-blue-400">
                      <svg
                        className="w-12 h-12"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {edit && (
                  <div className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-sm border border-gray-200">
                    <i className="fa-solid fa-pen text-blue-600 text-sm"></i>
                  </div>
                )}
              </div>

              {edit && (
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    setForm({ ...form, avatar: e.target.files[0] });
                  }}
                />
              )}

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-gray-800 mb-2 font-serif">
                  {user?.name}
                </h1>
                <p className="text-gray-600 text-lg">{user?.bio}</p>
                {user?.websiteLink && (
                  <a
                    href={user.websiteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <i className="fas fa-link mr-2"></i>
                    {new URL(user.websiteLink).hostname}
                  </a>
                )}
              </div>
            </div>

            <div className="flex md:justify-end justify-center space-x-4 mb-6">
              <button
                onClick={handleEditClose}
                className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
                  edit
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-blue-100 text-blue-600 hover:bg-blue-200"
                }`}
              >
                {edit ? "Cancel" : "Edit Profile"}
              </button>
              {edit && (
                <button
                  onClick={handleSubmit}
                  className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              )}
            </div>

            {edit && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      value={form?.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form?.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website URL
                  </label>
                  <input
                    name="websiteLink"
                    type="url"
                    value={form?.websiteLink}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={4}
                    value={form?.bio}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    placeholder="Tell us your story..."
                  />
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Posts Section */}
        <div className="max-w-7xl mx-auto">
          <div className="pb-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-800 border-l-4 border-blue-600 pl-4">
              My Articles
            </h2> <br />
            <hr />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.length >0 ?
            blogs?.map((item)=>(
            <ArticleCard blog = {item}/>
            )):
            <p>No Posts Found</p> }
            
          </div>
        </div>
      </div>
    </>
  );
}
