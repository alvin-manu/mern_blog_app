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

    // const { _id } = req.user
    const id = req.params.id
    const { title, category, content } = req.body;
    let featuredImage;
    try {
        const blog = await Blog.findOne({ _id: id });
        console.log(blog)

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
        } else {
            featuredImage = req.body.featuredImage
            console.log("inside featuredimage")
        }
        blog.title = title,
            blog.category = category,
            blog.featuredImage = featuredImage,
            blog.content = content

        await blog.save()

        return res.status(201).json({ message: "Blog Updated Successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

export const deleteBlog = async (req, res) => {
    const id = req.params.id
    try {
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



export const deleteAdminBlog = async (req, res) => {
    const id = req.params.id
    const { role } = req.user;
    if (role === "admin") {

        try {
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
    }else{
        return res.status(401).json({ message: "Unauthorised User" })
    }
}
// allblog display for admin
export const allBlog = async (req, res) => {
    try {
        const result = await Blog.find().sort({ createdAt: -1 }).populate({ path: 'user', select: 'name avatar' })
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
            return res.status(201).json({ blogArticles })
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
            return res.status(201).json({ blogArticles })
        } else {
            return res.status(401).json({ message: "Error" })
        }

    } catch (error) {
        console.log(error)
    }
}

export const searchBlogs = async (req, res) => {
    try {
        const query = req.query.q;
        const results = await Blog.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                // { category: { $regex: query, $options: 'i' } },
            ]
        });
        return res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err)
    }
};


export const blogLikeController = async (req, res) => {
    const { _id } = req.user;
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) return res.status(404).json({ message: 'Blog not found' });

        const alreadyLiked = blog.likes.includes(_id);

        if (alreadyLiked) {
            blog.likes.pull(_id); // remove like
        } else {
            blog.likes.push(_id); // add like
        }

        await blog.save();
        res.status(201).json({ message: alreadyLiked ? 'Unliked' : 'Liked', likes: blog.likes.length });
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle like' });
    }
};
