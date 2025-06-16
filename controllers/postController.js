import prisma from "../db/prisma.js";

// Create post
export const createPost = async (req, res) => {
  try {
    const { authorId, title, content } = req.body;

    const user = await prisma.user.findUnique({ where: { id: authorId } });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const post = await prisma.post.create({
      data: {
        title,
        content,
        author: { connect: { id: authorId } }
      }
    });

    res.status(201).json({ success: true, message: "Post created", post });

  } catch (err) {
    res.status(500).json({ success: false, message: "Error creating post" });
  }
};

// Get all posts
export const getAllPosts = async (_req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { isDeleted: false },
      include: { author: true }
    });

    res.status(200).json({ success: true, posts });

  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching posts" });
  }
};

// Get one post
export const getOnePost = async (req, res) => {
  try {
    const post = await prisma.post.findFirst({
      where: { id: req.params.id, isDeleted: false },
      include: { author: true }
    });

    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching post" });
  }
};

// Get posts by user
export const getUserPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { authorId: req.params.id, isDeleted: false },
      include: { author: true }
    });

    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching user posts" });
  }
};

// Update post
export const editPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId, title, content } = req.body;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.isDeleted) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.authorId !== authorId) return res.status(403).json({ success: false, message: "Unauthorized" });

    const updated = await prisma.post.update({
      where: { id },
      data: { title: title || post.title, content: content || post.content }
    });

    res.status(200).json({ success: true, message: "Post updated", updated });

  } catch (err) {
    res.status(500).json({ success: false, message: "Error updating post" });
  }
};

// Delete post (soft delete)
export const removePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId } = req.body;

    const post = await prisma.post.findUnique({ where: { id } });
    if (!post || post.isDeleted) return res.status(404).json({ success: false, message: "Post not found" });

    if (post.authorId !== authorId) return res.status(403).json({ success: false, message: "Unauthorized" });

    await prisma.post.update({ where: { id }, data: { isDeleted: true } });

    res.status(200).json({ success: true, message: "Post deleted" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Error deleting post" });
  }
};
