import { Router } from 'express';
import {
  userSignUpValidator,
  userSignInValidator,
  verifyUserValidator,
} from '../middlewares/user.validator.js';
import { runValidation } from '../middlewares/run-validator.js';
import {
  userSignUpController,
  userSignInController,
  userLogOutController,
  userVerifyController,
} from '../controllers/auth.controller.js';

const router = Router();

router.post(
  '/signup',
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
router.get(
  '/verify/:userId/:verifyToken',
  verifyUserValidator,
  runValidation,
  userVerifyController
);
router.get('/logout', userLogOutController);

export default router;
