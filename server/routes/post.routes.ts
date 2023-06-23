import { Router } from 'express';
import Post from '../models/Post.model.ts';

import { verifyToken } from '../middlewares/verify.token.ts';
import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostBySlugController,
  getPostsByUserIdController,
  updatePostController,
} from '../controllers/post.controller.ts';
import {
  createPostValidator,
  getPostBySlugValidator,
  getPostByUserIdValidator,
} from '../middlewares/post.validator.ts';
import { paginate } from '../middlewares/paginate.ts';

const router = Router();

router.post('/new', verifyToken, createPostValidator, createPostController);
router.get('/view/:postSlug', getPostBySlugValidator, getPostBySlugController);
router.get(
  '/uid/:userId',
  getPostByUserIdValidator,
  getPostsByUserIdController
);
router.get('/all', paginate('posts', true), getAllPostsController);
router.put('/edit/:postSlug', verifyToken, updatePostController);
router.delete('/delete/:postSlug', verifyToken, deletePostController);

export default router;
