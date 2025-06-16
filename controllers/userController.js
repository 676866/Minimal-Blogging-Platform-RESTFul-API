import prisma from "../db/prisma.js";

//  new user
export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, emailAdress, userName } = req.body;

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ emailAdress }, { userName }]
      }
    });

    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await prisma.user.create({
      data: { firstName, lastName, emailAdress, userName }
    });

    res.status(201).json({ success: true, message: "User created", user });

  } catch (err) {
    console.error("Create user error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all users
export const fetchUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// Get one user
export const singleUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching user" });
  }
};
// Get posts by user
export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const posts = await prisma.post.findMany({
      where: { authorId: id, isDeleted: false },
      include: { author: true }
    });

    if (!posts.length) {
      return res.status(404).json({
        success: false,
        message: "No user posts found"
      });
    }

    res.status(200).json({
      success: true,
      posts
    });

  } catch (err) {
    console.error("Error fetching user's posts:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts"
    });
  }
};
