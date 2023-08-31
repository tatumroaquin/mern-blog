import { Request, Response } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';
import User from '../models/User.model.js';
import Token from '../models/Token.model.js';

interface IUserRequest extends Request {
  accessTokenPayload?: JwtPayload | { id: string };
  refreshTokenPayload?: JwtPayload | { id: string };
}

export async function getUserByIdController(req: IUserRequest, res: Response) {
  const userId = req.params.id;
  const RTPayload = req.refreshTokenPayload;

  let token;
  try {
    token = await Token.findOne({ userId });
  } catch (e: any) {
    return res.status(403).json({ error: e.message });
  }

  if (!token?.userId.equals(RTPayload?.id))
    return res
      .status(403)
      .json({ error: "You cannot view other people's accounts" });

  const user = await User.findOne(
    { _id: userId },
    { email: false, passwordHash: false }
  );

  if (!user) return res.sendStatus(404);
  res.json(user);
}

export async function editUserController(req: Request, res: Response) {
  const {
    userId,
    userName,
    firstName,
    lastName,
    oldPassword,
    newPassword,
    accessToken,
  } = req.body;

  let payload: any;
  try {
    payload = JWT.verify(accessToken, process.env.JWT_ACCESS_TOKEN_SECRET!);
  } catch (e: any) {
    return res.json({ error: 'Invalid access token provided' });
  }

  if (payload.id !== userId)
    return res.json({ error: 'User Id does not match token' });

  const user = await User.findOne({ _id: payload.id });

  if (!user) return res.json({ error: 'User does not exist' });

  if (!user.authenticate(oldPassword))
    return res.json({
      error: 'Your current password does not match our records',
    });

  try {
    user.userName = userName;
    user.firstName = firstName;
    user.lastName = lastName;
    user.password = newPassword;
    await user.save();
  } catch (e: any) {
    return res.json({ error: e.message });
  }

  res.json({ success: 'User details has been updated' });
}
