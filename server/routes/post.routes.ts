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
} from '../middlewares/post.validator.js';
import {
  verifyAccessToken,
  verifyRefreshToken,
} from '../middlewares/verify.token.js';
import { verifyUserId } from '../middlewares/verify.userid.js';
import { paginate } from '../middlewares/paginate.js';
import { search } from '../middlewares/search.js';

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
router.get('/search', search('posts'), searchPostsController);
router.put(
  '/edit/:postSlug',
  verifyAccessToken,
  verifyRefreshToken,
  verifyUserId,
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
