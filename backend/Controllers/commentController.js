import { commentModel } from "../Models/commentModel.js";

export const addCommentController = async (req, res) => {
    const { _id } = req.user
    console.log(_id)

    const { comment, blog } = req.body;
    console.log(comment, blog)
    try {
        const newComment = new commentModel({ user: _id, comment: comment, blog: blog });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(500).json({ error: 'Failed to post comment' });
    }
}

// GET /api/comments?blogId=...
export const getComments= async (req, res) => {
  try {
    console.log(req.params.id)
    const comments = await commentModel.find({ blog: req.params.id }).populate('user', 'name');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};
