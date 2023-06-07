import { Router } from 'express';
import {
  userSignUpValidator,
  userSignInValidator,
} from '../middlewares/user.validator.ts';
import { runValidation } from '../middlewares/run-validator.ts';
import { userSignUpController } from '../controllers/auth.controller.ts';
import { userSignInController } from '../controllers/auth.controller.ts';
import { verifyToken } from '../middlewares/verify.token.ts';

const router = Router();

router.post(
  '/signup',
  verifyToken,
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

export default router;
