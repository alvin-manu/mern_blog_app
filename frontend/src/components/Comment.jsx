import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { addCommentApi, getBlogCommmentsApi } from "../Services/allApi";

const Comment = ({ blogId }) => {
  // Comment functionality state
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = async () => {
    try {
      const res = await getBlogCommmentsApi(blogId);
      console.log(res)
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments");
    }
  };

  useEffect(() => {
    if (blogId) fetchComments();
  }, [blogId]);

  // Handle comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log(commentText);
    if (commentText) {
      const token = sessionStorage.getItem("token");
      const reqheader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token ? token : ""}`,
      };
      const reqbody = {
        blog: blogId,
        comment: commentText,
      };
      try {
        const res = await addCommentApi(reqbody, reqheader);
        console.log(res);
        if (res.status === 201) {
          toast.success("Comment posted successfully");
        }

        setCommentText("");
        fetchComments();
      } catch (error) {
        toast.error(error);
      }
    } else {
      toast.warning("Enter text to post comment");
    }
  };

  return (
    <section className="mb-12">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        {comments?.length} Comment{comments?.length !== 1 ? "s" : ""}
      </h3>
      {comments?.length > 0 ? (

        <div className="space-y-6 mb-8">
          {comments?.map((comment) => (
            <div
              key={comment?._id}
              className="border-b border-gray-100 pb-6 last:border-0"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">
                  {comment?.user?.name}
                </span>
                <span className="text-sm text-gray-500">
                  {comment?.timestamp}
                </span>
              </div>
              <p className="text-gray-700">{comment?.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}

      {/* Comment Form */}
      <form
        onSubmit={handleCommentSubmit}
        className="bg-gray-50 p-6 rounded-lg"
      >
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Write a thoughtful comment...
        </h4>
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
          rows="4"
          placeholder="Add to the discussion..."
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Post Comment
        </button>
      </form>
    </section>
  );
};

export default Comment;
