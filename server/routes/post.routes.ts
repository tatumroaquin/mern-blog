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
import { postsByUidPaginate } from '../middlewares/postsByUid.paginate.js';
import { postsSearchPaginate } from '../middlewares/postsSearch.paginate.js';
import { runValidation } from '../middlewares/run-validator.js';
import { postsAllPaginate } from '../middlewares/postsAll.paginate.js';
import { checkRecaptcha } from '../middlewares/verify.recaptcha.js';

const router = Router();

router.post(
  '/new',
  verifyAccessToken,
  createPostValidator,
  runValidation,
  checkRecaptcha,
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
  postsAllPaginate(),
  getAllPostsController
);
router.get(
  '/search',
  searchPostsValidator,
  runValidation,
  postsSearchPaginate(),
  searchPostsController
);
router.put(
  '/edit/:postSlug',
  verifyAccessToken,
  verifyRefreshToken,
  verifyUserId,
  updatePostValidator,
  runValidation,
  checkRecaptcha,
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
