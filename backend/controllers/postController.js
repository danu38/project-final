import Post from "../models/Post.js";

export const getPosts = async (_req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 }).populate("author", "email");
  res.json(posts);
};

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: "Title & content required" });

    const post = await Post.create({ title, content, author: req.user.id });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};