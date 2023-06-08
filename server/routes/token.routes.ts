import { Router } from 'express';
import { refreshTokenController } from '../controllers/token.controller.ts';

const router = Router();

router.get('/refresh', refreshTokenController);

export default router;
