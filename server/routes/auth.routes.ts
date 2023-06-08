import { Router } from 'express';
import {
  userSignUpValidator,
  userSignInValidator,
} from '../middlewares/user.validator.ts';
import { runValidation } from '../middlewares/run-validator.ts';
import {
  userSignUpController,
  userSignInController,
  userLogOutController,
} from '../controllers/auth.controller.ts';
import { verifyToken } from '../middlewares/verify.token.ts';
import { checkRole } from '../middlewares/role.checker.ts';

const router = Router();

router.post(
  '/signup',
  verifyToken,
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
