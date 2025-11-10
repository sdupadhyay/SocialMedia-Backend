const asyncWrapper = require("../middleware/async");
const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");
const uploadCloudinaryImage = require("../utils/cloudinary");
const likePost = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  const postId = req.params?.postId;
  // Check if already liked
  const existingLike = await Like.findOne({ userId, postId });
  if (existingLike) {
    return res
      .status(400)
      .json({ message: "You have already liked this post" });
  }
  await Like.create({ userId, postId });
  res.status(200).json({ message: "Post liked successfully" });
});
const unlikePost = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  const postId = req.params?.postId;
  // Check if like exists
  const existingLike = await Like.findOne({ userId, postId });
  if (!existingLike) {
    return res.status(400).json({ message: "You have not liked this post" });
  }
  await Like.deleteOne({ userId, postId });
  res.status(200).json({ message: "Post unliked successfully" });
});
const createComment = asyncWrapper(async (req, res) => {
  const userId = req.userId;
  const postId = req.params?.postId;
  const { text } = req.body;
  //  Validate input
  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Comment text is required" });
  }
  //  Check if post exists
  const post = await Post.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  //  Create comment
  await Comment.create({ post: postId, author: userId, text });
  res.status(201).json({ message: "Comment created successfully" });
});
const createPost = asyncWrapper(async (req, res) => {
  const postImage = req.file;
  const userId = req.userId;
  const { content } = req.body;
  if(!postImage || !content){
    return res.status(400).json({ message: "All fields are required" });
  }
  const customFileName = `${Date.now()}-${postImage?.originalname}`;
  const { url } = await uploadCloudinaryImage(
    postImage?.buffer,
    customFileName
  );
  await Post.create({ content, image: url, author: userId });
  res.status(201).json({ message: "Post created successfully" });
});
module.exports = { likePost, unlikePost, createPost, createComment };
