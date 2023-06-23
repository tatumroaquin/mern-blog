import { Request, Response } from 'express';
import User from '../models/User.model.ts';

export async function getUserById(req: Request, res: Response) {
  const user = await User.findOne(
    { _id: req.params.id },
    { email: false, passwordHash: false, roles: false } 
  );
  if (!user) return res.sendStatus(404);
  res.json(user);
}
