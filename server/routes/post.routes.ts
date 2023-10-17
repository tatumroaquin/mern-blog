import { Router } from 'express';

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
  getAllPostsValidator,
  updatePostValidator,
  searchPostsValidator,
} from '../middlewares/post.validator.js';
import {
  verifyAccessToken,
  verifyRefreshToken,
} from '../middlewares/verify.token.js';
import { verifyUserId } from '../middlewares/verify.userid.js';
import { paginate } from '../middlewares/paginate.js';
import { postsByUidPaginate } from '../middlewares/postsByUid.paginate.js';
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
  postsByUidPaginate(),
  getPostsByUserIdController
);
router.get(
  '/all',
  getAllPostsValidator,
  runValidation,
  paginate('posts', true),
  getAllPostsController
);
router.get(
  '/search',
  searchPostsValidator,
  runValidation,
  search('posts'),
  searchPostsController
);
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
