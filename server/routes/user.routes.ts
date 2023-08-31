import { Router } from 'express';
import {
  verifyAccessToken,
  verifyRefreshToken,
} from '../middlewares/verify.token.js';
import {
  getUserByIdController,
  editUserController,
} from '../controllers/user.controller.js';

const router = Router();

router.get(
  '/:id',
  verifyAccessToken,
  verifyRefreshToken,
  getUserByIdController
);
router.post('/edit/:id', editUserController);

export default router;
