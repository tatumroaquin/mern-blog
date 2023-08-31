import { Router } from 'express';
import { refreshTokenController } from '../controllers/token.controller.js';
import { verifyRefreshToken } from '../middlewares/verify.token.js';

const router = Router();

router.get('/refresh', verifyRefreshToken, refreshTokenController);

export default router;
