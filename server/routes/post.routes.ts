import { Router } from 'express';
import Post from '../models/Post.model.js';

import {
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostBySlugController,
  getPostsByUserIdController,
  searchPostsController,
  updatePostController,
} from '../controllers/post.controller.js';
import {
  createPostValidator,
  getPostBySlugValidator,
  getPostByUserIdValidator,
  updatePostValidator,
} from '../middlewares/post.validator.js';
import {
  verifyAccessToken,
  verifyRefreshToken,
} from '../middlewares/verify.token.js';
import { verifyUserId } from '../middlewares/verify.userid.js';
import { paginate } from '../middlewares/paginate.js';
import { search } from '../middlewares/search.js';
import { runValidation } from '../middlewares/run-validator.js';

const router = Router();

router.post(
  '/new',
  verifyAccessToken,
  createPostValidator,
  runValidation,
  createPostController
);
router.get(
  '/view/:postSlug',
  getPostBySlugValidator,
  runValidation,
  getPostBySlugController
);
router.get(
  '/uid/:userId',
  getPostByUserIdValidator,
  runValidation,
  getPostsByUserIdController
);
router.get('/all', paginate('posts', true), getAllPostsController);
router.get('/search', search('posts'), searchPostsController);
router.put(
  '/edit/:postSlug',
  verifyAccessToken,
  verifyRefreshToken,
  verifyUserId,
  updatePostValidator,
  runValidation,
  updatePostController
);
router.delete(
  '/delete/:postSlug',
  verifyAccessToken,
  verifyRefreshToken,
  verifyUserId,
  deletePostController
);

export default router;
