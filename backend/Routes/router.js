import express from 'express'
import { banUser, getAllUsers, getUser, getUserById, loginUser, registerUser, unbanUser, updateUser } from '../Controllers/userController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';
import upload from '../config/multer.js';
import { addCategory, deleteCategory, editCategory, getCategory } from '../Controllers/categoryController.js';
import { addBlog, allBlog, deleteBlog, getCategoryBlogsById, getUserBlogsById, getUserPosts, searchBlogs, viewBlog } from '../Controllers/blogController.js';


export const router = new express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/get-user', authMiddleware, getUser)
router.get('/get-userposts', authMiddleware, getUserPosts)
router.put('/update-user', authMiddleware, upload.single("avatar"), updateUser)
router.get('/getuserbyid/:id', getUserById)

// blog
router.post('/addblog', authMiddleware, upload.single('featuredImage') ,addBlog)
router.get('/viewblog/:id', viewBlog )
router.get('/get-userpostsbyid/:id', getUserBlogsById )
router.get('/get-categoryposts/:id', getCategoryBlogsById )
router.get('/blogs/search' ,searchBlogs)


// admin
router.post('/admin/addcategory', addCategory)
router.get('/admin/getcategory', getCategory)
router.put('/admin/update-category',  editCategory)
router.delete('/admin/delete-category',  deleteCategory)
router.get('/admin/getallusers', authMiddleware, getAllUsers )
router.get('/admin/allblog' ,allBlog)
router.delete('/admin/delete-blog/:id', deleteBlog)
router.patch('/admin/banuser/:id', authMiddleware, banUser)
router.patch('/admin/unbanuser/:id', authMiddleware, unbanUser)
// router.put('/admin/updatemodel',  updateUserModel)

