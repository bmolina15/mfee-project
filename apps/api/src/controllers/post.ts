import { Post } from '../models/post';

export const getPostByCategory = (category: string) => {
  return posts.find((p) => p.category === category);
};

const posts: Array<Post> = [];

const getPosts = (req, res) => {
  res.status(200).json(posts);
};

const getPostsByCategory = (req, res) => {
  const { category } = req.params;
  const post = getPostByCategory(category);
  if (!post) {
    return res.status(404).json({ message: 'Posts not found' });
  }
  res.status(200).json(post);
};

const getPostById = (req, res) => {
  const { id } = req.params;

  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.status(200).json(post);
};

const postNewPost = (req, res) => {
  const { title, image, description, category, comments } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'The title is required.' });
  }

  const newPost = {
    id: Date.now().toString(),
    title,
    image,
    description,
    category,
    comments
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

const postComment = (req, res) => {
  const { id } = req.params;

  const post = posts.find((p) => p.id === id);
  const { author, content } = req.body;
  const comments = [
    {
      id: Date.now().toString(),
      author: author,
      content: content
    }
  ];

  if (!post) {
    return res.status(400).json({ message: 'Post not found' });
  }

  const newPost = { ...post, comments };
  res.status(201).json(newPost);
};

const editPost = (req, res) => {
  const { id } = req.params;
  const postIndex = posts.findIndex((p) => p.id === id);

  if (postIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  const updatedPost = { ...posts[postIndex] };

  const { title } = req.body;

  if (title) {
    updatedPost.title = title;
  }
  posts[postIndex] = updatedPost;
  res.status(200).json(updatedPost);
};

const deletePost = (req, res) => {
  const { id } = req.params;

  const categoryIndex = posts.findIndex((p) => p.id === id);

  if (categoryIndex === -1) {
    return res.status(404).json({ message: 'Category not found' });
  }
  posts.splice(categoryIndex, 1);

  res.status(204).send();
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
