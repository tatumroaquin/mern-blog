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
router.get('/logout', userLogOutController);

export default router;
