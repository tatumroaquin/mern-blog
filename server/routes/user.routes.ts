import { Router } from 'express';
import { getUserById } from '../controllers/user.controller.ts';

const router = Router();

router.get('/:id', getUserById);

export default router;
