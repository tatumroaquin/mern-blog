import { Router } from 'express';
import {
  userSignUpValidator,
  userSignInValidator,
} from '../middlewares/user.validator.js';
import { runValidation } from '../middlewares/run-validator.js';
import {
  userSignUpController,
  userSignInController,
  userLogOutController,
} from '../controllers/auth.controller.js';
import { verifyAccessToken } from '../middlewares/verify.token.js';
import { checkRole } from '../middlewares/role.checker.js';

const router = Router();

router.post(
  '/signup',
  verifyAccessToken,
  checkRole('admin'),
  userSignUpValidator,
  runValidation,
  userSignUpController
);
router.post(
  '/signin',
  userSignInValidator,
  runValidation,
  userSignInController
);
router.get('/logout', userLogOutController);

export default router;
