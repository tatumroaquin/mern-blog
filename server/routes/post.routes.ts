import { Router } from 'express';
import Post from '../models/Post.model.ts';

import { verifyAccessToken } from '../middlewares/verify.token.ts';
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

router.post(
  '/new',
  verifyAccessToken,
  createPostValidator,
  createPostController
);
router.get('/view/:postSlug', getPostBySlugValidator, getPostBySlugController);
router.get(
  '/uid/:userId',
  getPostByUserIdValidator,
  getPostsByUserIdController
);
router.get('/all', paginate('posts', true), getAllPostsController);
router.put('/edit/:postSlug', verifyAccessToken, updatePostController);
router.delete('/delete/:postSlug', verifyAccessToken, deletePostController);

export default router;
