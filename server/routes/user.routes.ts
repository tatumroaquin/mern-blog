import { Router } from 'express';
import {
  verifyAccessToken,
  verifyRefreshToken,
} from '../middlewares/verify.token.js';
import { checkRole } from '../middlewares/role.checker.js';
import {
  getUserByIdController,
  getAllUsersController,
  editUserController,
  deleteUserController,
} from '../controllers/user.controller.js';
import { editUserValidator } from '../middlewares/user.validator.js';
import { verifyUserId } from '../middlewares/verify.userid.js';
import { usersAllPaginate } from '../middlewares/usersAll.paginate.js';
import { checkRecaptcha } from '../middlewares/verify.recaptcha.js';

const router = Router();

router.get(
  '/all',
  verifyAccessToken,
  verifyRefreshToken,
  usersAllPaginate(),
  checkRole('admin'),
  getAllUsersController
);

router.get(
  '/view/:id',
  verifyAccessToken,
  verifyRefreshToken,
  verifyUserId,
  getUserByIdController
);

router.post(
  '/edit/:id',
  verifyAccessToken,
  verifyRefreshToken,
  editUserValidator,
  verifyUserId,
  checkRecaptcha,
  editUserController
);

router.delete(
  '/delete/:id',
  verifyAccessToken,
  verifyRefreshToken,
  verifyUserId,
  checkRecaptcha,
  deleteUserController
);

export default router;
