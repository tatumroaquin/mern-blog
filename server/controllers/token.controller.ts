import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import User from '../models/User.model.js';
import Token from '../models/Token.model.js';

import { generateTokens } from '../utility/generate.tokens.js';

//https://dev.to/bahdcoder/the-ultimate-guide-to-jwt-server-side-auth-with-refresh-tokens-4jb3
export async function refreshTokenController(req: Request, res: Response) {
  const { jwt } = req.cookies;

  let payload: any;
  try {
    payload = JWT.verify(jwt, process.env.JWT_REFRESH_TOKEN_SECRET!);
  } catch (e: any) {
    await Token.deleteOne({ content: jwt });
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(403).json({ error: 'Invalid refresh token' });
  }

  const tokenExists = await Token.exists({ userId: payload.id });

  // token is NOT in database, reuse attempt, delete all refresh tokens
  if (!tokenExists) {
    const hackedUser = await User.findOne({ _id: payload.id });

    try {
      await Token.deleteMany({ userId: hackedUser?._id });
    } catch (error: any) {
      return res.status(500).json({ error: error.message });
    }
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    });
    return res.status(403).json({ error: 'Refresh token reuse detected' });
  }

  const { id, roles } = payload;

  const user = await User.findOne({ _id: id });

  if (!user)
    return res.status(403).json({ error: 'No user attached to token' });

  if (user.id !== id)
    return res.json({
      error: 'User id does not match token',
    });

  user.roles.forEach((role: string) => {
    if (!roles.includes(role))
      return res.status(403).json({ error: 'User roles does not match token' });
  });

  const { accessToken } = generateTokens(user);

  res.json({
    success: 'Access token has been refreshed',
    roles,
    username: user.userName,
    accessToken,
  });
}
