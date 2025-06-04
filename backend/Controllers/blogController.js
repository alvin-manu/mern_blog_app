import cloudinary from '../config/cloudinary.js';
import { Blog } from "../Models/blogModel.js";

export const addBlog = async (req, res) => {
    try {
        const { _id } = req.user
        console.log(_id);
        const { title, category, content } = req.body;
        let featuredImage;
        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'blog', resource_type: 'auto' }

                )
                .catch((error) => {
                    console.log(error);
                });
            featuredImage = uploadResult.secure_url
        }
        const blog = new Blog({
            title,
            category: category,
            featuredImage,
            content,
            user: _id
        })
        await blog.save()
        return res.status(201).json({ message: "Blog Published Successfully" })
    } catch (error) {
        res.status(500).json(error)
    }
}

export const editBlog = async (req, res) => {
    try {

    } catch (error) {
        res.status(500).json(error)
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const id = req.params.id
        if (id) {
            const blog = await Blog.findByIdAndDelete(id);
            if (blog) {
                return res.status(201).json({ message: "Blog Deleted Successfully" })
            }
        } else {
            return res.status(401).json({ message: "Uncaught Error" })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

// allblog display for admin
export const allBlog = async (req, res) => {
    try {
        const result = await Blog.find().populate({ path: 'user', select: 'name avatar' })
            .populate({ path: 'category', select: 'categoryName' });
        if (result) {
            return res.status(201).json(result)
        } else {
            return res.status(401).json({ message: "Error" })
        }

    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

export const viewBlog = async (req, res) => {
    try {
        const id = req.params.id
        console.log(id)
        const blogArticle = await Blog.find({ _id: id }).populate({ path: 'user', select: 'name avatar' })
            .populate({ path: 'category', select: 'categoryName' })
        if (blogArticle) {
            return res.status(201).json(blogArticle)
        } else {
            return res.status(401).json({ message: "Error" })
        }

    } catch (error) {
        console.log(error)
    }
}

// GetUserPosts on profile
export const getUserPosts = async (req, res) => {
    try {
        const id = req.user._id;
        const userBlogs = await Blog.find({ user: id }).populate({ path: 'user', select: 'name avatar' })
            .populate({ path: 'category', select: 'categoryName' })
        if (userBlogs) {
            return res.status(201).json({ message: "User Blogs", userBlogs })
        } else {
            return res.status(401).json({ message: "User Blogs Not Found" })
        }
    } catch (error) {
        return res.status(401).json({ message: "Server Error", error });
    }
}

export const getUserBlogsById = async (req, res) => {
    try {
        const { id } = req.params
        const blogArticles = await Blog.find({ user: id }).populate({ path: 'user', select: 'name avatar' })
            .populate({ path: 'category', select: 'categoryName' })
        if (blogArticles) {
            return res.status(201).json({blogArticles})
        } else {
            return res.status(401).json({ message: "Error" })
        }

    } catch (error) {
        console.log(error)
    }
}


// getting blogs based on category
export const getCategoryBlogsById = async (req, res) => {
    try {
        const { id } = req.params
        const blogArticles = await Blog.find({ category: id }).populate({ path: 'user', select: 'name avatar' })
            .populate({ path: 'category', select: 'categoryName' })
        if (blogArticles) {
            return res.status(201).json({blogArticles})
        } else {
            return res.status(401).json({ message: "Error" })
        }

    } catch (error) {
        console.log(error)
    }
}