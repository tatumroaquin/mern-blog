import { Router } from 'express';
import { refreshTokenController } from '../controllers/token.controller.ts';
import { verifyRefreshToken } from '../middlewares/verify.token.ts';

const router = Router();

router.get('/refresh', verifyRefreshToken, refreshTokenController);

export default router;
