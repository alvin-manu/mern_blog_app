import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import BlogPage from "./pages/BlogPage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from "./redux/user/userSlice";
import Category from "./pages/Category";
import CreateBlog from "./pages/CreateBlog";
import { ToastContainer } from 'react-toastify';
import AllBlogs from "./pages/AllBlogs";
import Users from "./pages/Users";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("existingUser"));
    if (user) {
      dispatch(setUser(user));
    }
  }, []);

  return (
    <>
      <Routes>
        {/* Routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogPage />} />
          <Route path="/category" element={<Category />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/users" element={<Users />} />

          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        </Route>

        {/* Routes without Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
