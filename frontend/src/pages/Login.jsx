import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { loginApi } from "../Services/allApi";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
import { toast } from "react-toastify";

const Login = () => {
  const [logindetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = async () => {
    const { email, password } = logindetails;
    if (!email || !password) {
      return toast.warning("Please Fill the form");
    } else {
      const res = await loginApi(logindetails);
      if (res.status === 401) {
        return toast.warning(res.response.data.message);
      } else if (res.status === 201) {
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(res.data.userInfo)
        );
        sessionStorage.setItem("token", res.data.jwt_token);
        dispatch(setUser(res.data.userInfo));
        toast.success(res.data.message);
        navigate("/");
      } else {
        toast.error("Something Wrong Happened");
      }
    }
  };

  return (
    <div className=" flex items-center justify-center p-4 md:p-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 sm:p-10 transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome!</h1>
          <p className="text-gray-600">Log in to your account</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Your Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
              onChange={(e) => {
                setLoginDetails({ ...logindetails, email: e.target.value });
              }}
              value={logindetails.email}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
              required
              onChange={(e) => {
                setLoginDetails({ ...logindetails, password: e.target.value });
              }}
              value={logindetails.password}
            />
          </div>

          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            onClick={loginUser}
          >
            Login
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have any account?{" "}
          <Link to="/register">
            <span className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
