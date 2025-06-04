import { commonApi } from "./commonApi";
import { serverUrl } from "./serverUrl";

export const registerApi = async (userData) => {
    return await commonApi("POST", `${serverUrl}/api/register`, userData, "")
}

export const loginApi = async (userData) => {
    return await commonApi("POST", `${serverUrl}/api/login`, userData, "")
}

export const getUser = async (reqheader) => {
    return await commonApi("GET", `${serverUrl}/api/get-user`, "", reqheader)
}

export const getUserPosts = async (reqheader) => {
    return await commonApi("GET", `${serverUrl}/api/get-userposts`, "", reqheader)
}

export const updateUserApi = async (reqBody, reqheader) => {
    return await commonApi("PUT", `${serverUrl}/api/update-user`, reqBody, reqheader)
}

export const addCategoryApi = async (reqbody) => {
    return await commonApi("POST", `${serverUrl}/api/admin/addcategory`, reqbody, "")
}

export const getAllCategoryApi = async () => {
    return await commonApi("GET", `${serverUrl}/api/admin/getcategory`, "", "")
}

export const editCategoryApi = async (reqbody) => {
    return await commonApi("PUT", `${serverUrl}/api/admin/update-category`, reqbody, "")
}

export const deleteCategoryApi = async (reqbody) => {
    return await commonApi("DELETE", `${serverUrl}/api/admin/delete-category`, reqbody, "")
}

// to add a blog
export const addBlogApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/api/addblog`, reqBody, reqHeader)
}

// to get all blog to admin
export const allBlogApi = async () => {
    return await commonApi('GET', `${serverUrl}/api/admin/allblog`, {}, {})
}
// delete a blog for admin
export const deleteBlogApi = async (id) => {
    return await commonApi("DELETE", `${serverUrl}/api/admin/delete-blog/${id}`, {}, "")
}

// to get userlist to admin
export const getAllUsersApi = async (reqheader) => {
    return await commonApi('GET', `${serverUrl}/api/admin/getallusers`, {}, reqheader)
}

export const viewBlogArticleApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/api/viewblog/${id}`, {}, "")
}

// Ban a user
export const banUserApi = async (id, reqheader) => {
    return await commonApi('PATCH', `${serverUrl}/api/admin/banuser/${id}`, {}, reqheader)
}

// unban User
export const UnbanUserApi = async (id, reqheader) => {
    return await commonApi('PATCH', `${serverUrl}/api/admin/unbanuser/${id}`, {}, reqheader)
}

export const getUserByIdApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/api/getuserbyid/${id}`, {}, "")
}

export const getUserPostsByIdApi = async (id) => {
    return await commonApi("GET", `${serverUrl}/api/get-userpostsbyid/${id}`, "", '')
}



export const categoryBlogsApi = async (id) => {
    return await commonApi("GET", `${serverUrl}/api/get-categoryposts/${id}`, "", '')
}