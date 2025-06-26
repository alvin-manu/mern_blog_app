import express from 'express'
import { banUser, getAllUsers, getUser, getUserById, loginUser, registerUser, unbanUser, updateUser } from '../Controllers/userController.js';
import { authMiddleware } from '../middleware/authmiddleware.js';
import upload from '../config/multer.js';
import { addCategory, deleteCategory, editCategory, getCategory } from '../Controllers/categoryController.js';
import { addBlog, allBlog, blogLikeController, deleteAdminBlog, deleteBlog, editBlog, getCategoryBlogsById, getUserBlogsById, getUserPosts, searchBlogs, viewBlog } from '../Controllers/blogController.js';
import { addCommentController, getComments } from '../Controllers/commentController.js';


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
router.post('/blog/comment',authMiddleware, addCommentController)
router.get('/getcomments/:id', getComments )
router.patch('/blogs/:id/like', authMiddleware, blogLikeController)
router.put('/:id/editblog', authMiddleware, upload.single('featuredImage') ,editBlog)



// admin
router.post('/admin/addcategory', authMiddleware, addCategory)
router.get('/admin/getcategory', getCategory)
router.put('/admin/update-category', authMiddleware,  editCategory)
router.delete('/admin/delete-category', authMiddleware, deleteCategory)
router.get('/admin/getallusers', authMiddleware, getAllUsers )
router.get('/admin/allblog' ,allBlog)
router.delete('/delete-blog/:id', deleteBlog)
router.delete('/admin/deleteadminblog/:id', authMiddleware, deleteAdminBlog)
router.patch('/admin/banuser/:id', authMiddleware, banUser)
router.patch('/admin/unbanuser/:id', authMiddleware, unbanUser)
// router.put('/admin/updatemodel',  updateUserModel)

