import { Router } from 'express';
import {
  verifyAccessToken,
  verifyRefreshToken,
} from '../middlewares/verify.token.js';
import {
  getUserByIdController,
  editUserController,
} from '../controllers/user.controller.js';
import { editUserValidator } from '../middlewares/user.validator.js';
import { verifyUserId } from '../middlewares/verify.userid.js';

const router = Router();

router.get(
  '/:id',
  verifyAccessToken,
  verifyRefreshToken,
  verifyUserId,
  getUserByIdController
);
router.post(
  '/edit/:id',
  verifyAccessToken,
  editUserValidator,
  editUserController
);

export default router;
