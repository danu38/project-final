import Comment from "../models/Comment.js";

export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("author", "email")
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Comment text required" });

    const comment = await Comment.create({
      text,
      post: postId,
      author: req.user.id,
    });

    res.json(await comment.populate("author", "email"));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};