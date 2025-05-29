import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { registerApi } from "../Services/allApi";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async () => {
    const { name, email, password } = userDetails;
    if (!name || !email || !password || !confirmPassword) {
      return toast.warning("Please Enter All Fields");
    }
    if (password != confirmPassword) {
      return toast.warning("Password Incorrect");
    } else {
      const res = await registerApi(userDetails);
      if (res.status === 409) {
        toast.warning(res.response.data.message);
      } else if (res.status === 201) {
        toast.success(res.data.message);
        setUserDetails({ name: "", email: "", password: "" });
        navigate("/login");
      } else {
        toast.error("Something Wrong Happened");
      }
    }
  };

  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-10 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">Join our community today</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
              value={userDetails.name}
              onChange={(e) =>
                setUserDetails({ ...userDetails, name: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={userDetails.email}
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              value={userDetails.password}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
              onChange={(e) =>
                setUserDetails({ ...userDetails, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              value={confirmPassword}
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2"
            onClick={registerUser}
          >
            Create Account
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              Login here
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
