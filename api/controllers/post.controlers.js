import Post from '../models/post.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};

export const getposts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      // ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.postId && { _id: req.query.postId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
  } catch (error) {
    next(error);
  }
};

export const deletepost = async (req, res, next) => {
  try {

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }


    if (req.user.isAdmin || req.user.id === post.userId.toString()) {
      await Post.findByIdAndDelete(req.params.postId);
      return res.status(200).json({ message: 'The post has been deleted' });
    }

    return next(errorHandler(403, 'You are not allowed to delete this post'));

  } catch (error) {

    console.error(error);

    next(errorHandler(500, 'An error occurred while deleting the post'));
  }
};

export const updatePost = async (req, res, next) => {
  try {
    // Check if the user is an admin or if the user is updating their own post
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(errorHandler(404, 'Post not found'));
    }

    if (!req.user.isAdmin && req.user.id !== post.userId.toString()) {
      return next(errorHandler(403, 'You are not allowed to update this post'));
    }

    // Proceed with the update
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};
