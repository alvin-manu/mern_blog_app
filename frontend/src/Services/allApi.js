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

export const addCategoryApi = async (reqbody, reqheader) => {
    return await commonApi("POST", `${serverUrl}/api/admin/addcategory`, reqbody, reqheader)
}

export const getAllCategoryApi = async () => {
    return await commonApi("GET", `${serverUrl}/api/admin/getcategory`, "", "")
}

export const editCategoryApi = async (reqbody, reqheader) => {
    return await commonApi("PUT", `${serverUrl}/api/admin/update-category`, reqbody, reqheader)
}

export const deleteCategoryApi = async (reqbody, reqheader) => {
    return await commonApi("DELETE", `${serverUrl}/api/admin/delete-category`, reqbody, reqheader)
}

// to add a blog
export const addBlogApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/api/addblog`, reqBody, reqHeader)
}

// to edit a blog
export const editBlogApi = async (reqBody, reqHeader, id) => {
    return await commonApi('PUT', `${serverUrl}/api/${id}/editblog`, reqBody, reqHeader)
}

// to get all blog to admin
export const allBlogApi = async () => {
    return await commonApi('GET', `${serverUrl}/api/admin/allblog`, {}, {})
}

// delete a blog for user
export const deleteBlogApi = async (id) => {
    return await commonApi("DELETE", `${serverUrl}/api/delete-blog/${id}`, {}, "")
}


// delete a blog for admin
export const deleteAdminBlogApi = async (id, reqheader) => {
    return await commonApi("DELETE", `${serverUrl}/api/admin/deleteadminblog/${id}`, {}, reqheader)
}
// to get userlist to admin

export const getAllUsersApi = (searchTerm = "", reqheader) => {
    // Only create query string if searchTerm exists
    const queryString = searchTerm ? `?search=${encodeURIComponent(searchTerm)}` : '';
    return commonApi("GET", `${serverUrl}/api/admin/getallusers${queryString}`, "", reqheader);
};

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

export const searchBlogsApi = async (query) => {
    return await commonApi("GET", `${serverUrl}/api/blogs/search?q=${encodeURIComponent(query)}`, "", '')
};

// adding comment
export const addCommentApi = async (reqBody, reqHeader) => {
    return await commonApi('POST', `${serverUrl}/api/blog/comment`, reqBody, reqHeader)
}

// getting comments

export const getBlogCommmentsApi = async (id) => {
    return await commonApi('GET', `${serverUrl}/api/getcomments/${id}`, {}, "")
}

export const patchLikeBlogsApi = async (blogId, reqHeader) => {
    return await commonApi('PATCH', `${serverUrl}/api/blogs/${blogId}/like`, {}, reqHeader)
}

