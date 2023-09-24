import { Request, Response } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.model.js';
import Token from '../models/Token.model.js';

interface IUserRequest extends Request {
  accessTokenPayload?: JwtPayload | { id: string };
  refreshTokenPayload?: JwtPayload | { id: string };
}

export async function getAllUsersController(_: Request, res: Response) {
  const { result } = res.locals;
  res.json({ result });
}

export async function getUserByIdController(req: IUserRequest, res: Response) {
  const userId = req.params.id;

  let user: any;
  try {
    user = await User.findOne({ _id: userId }, { passwordHash: false });
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }

  if (!user) return res.sendStatus(404);

  res.json(user);
}

export async function editUserController(req: Request, res: Response) {
  const {
    userId,
    userName,
    firstName,
    lastName,
    email,
    oldPassword,
    newPassword,
  } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) return res.json({ error: 'User does not exist' });

  if (!user.authenticate(oldPassword))
    return res.json({
      error: 'Your current password does not match our records',
    });

  try {
    if (newPassword) user.password = newPassword;

    user.userName = userName;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;

    await user.save();
  } catch (e: any) {
    return res.json({ error: e.message });
  }

  res.json({ success: 'User details has been updated' });
}
