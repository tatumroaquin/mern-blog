import { Router, } from 'express';
import { userSignUpValidator, userSignInValidator } from '../middleware/user.validator.ts';
import { runValidation } from '../middleware/run-validator.ts';
import { userSignUpController } from '../controllers/auth.controller.ts';
import { userSignInController } from '../controllers/auth.controller.ts';

const router = Router();

router.post('/signup', userSignUpValidator, runValidation, userSignUpController);
router.post('/signin', userSignInValidator, runValidation, userSignInController);

export default router;
