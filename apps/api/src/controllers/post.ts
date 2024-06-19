import Post from '../models/post';


const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const getPostsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const post = await Post.findById(category);
    if (!post) {
      return res.status(404).json({ message: 'Posts not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const postNewPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const postComment = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    post.comments.push(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const editPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndDelete(id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    const { message } = error;
    res.status(500).json({ message });
  }
};

export default {
  getPosts,
  getPostsByCategory,
  getPostById,
  postNewPost,
  postComment,
  editPost,
  deletePost
};
