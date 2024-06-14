import express from 'express';
import postController from '../controllers/post';

const router = express.Router();

router.get('/', postController.getPosts);

router.get('/category/:category', postController.getPostsByCategory);

router.get('/:id', postController.getPostById);

router.post('/', postController.postNewPost);

router.post('/:id/comments', postController.postComment);

router.patch('/:id', postController.editPost);

router.delete('/:id', postController.deletePost);

export default router;
