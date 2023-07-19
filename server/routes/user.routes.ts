import { Router } from 'express';
import {
  verifyAccessToken,
  verifyRefreshToken,
} from '../middlewares/verify.token.ts';
import {
  getUserByIdController,
  editUserController,
} from '../controllers/user.controller.ts';

const router = Router();

router.get(
  '/:id',
  verifyAccessToken,
  verifyRefreshToken,
  getUserByIdController
);
router.post('/edit/:id', editUserController);

export default router;
