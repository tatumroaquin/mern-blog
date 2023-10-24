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
import {
  verifyAccessToken,
  verifyRTLogout,
} from '../middlewares/verify.token.js';
import { checkRecaptcha } from '../middlewares/verify.recaptcha.js';
import { checkRole } from '../middlewares/role.checker.js';

const router = Router();

router.post(
  '/signup',
  userSignUpValidator,
  runValidation,
  verifyAccessToken,
  checkRole('admin'),
  checkRecaptcha,
  userSignUpController
);
router.post(
  '/signin',
  userSignInValidator,
  runValidation,
  checkRecaptcha,
  userSignInController
);
router.get(
  '/verify/:userId/:verifyToken',
  verifyUserValidator,
  runValidation,
  userVerifyController
);
router.get(
  '/logout',
  verifyAccessToken,
  verifyRTLogout,
  userLogOutController
);

export default router;
