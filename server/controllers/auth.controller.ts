import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.ts';

import { generateTokens } from '../utility/generate.tokens.ts';

export async function userSignUpController(req: Request, res: Response) {
  const { firstName, lastName, userName, email, password } = req.body;

  const userExist = await User.exists({ userName, email });

  if (userExist) {
    return res
      .status(400)
      .json({ error: 'That email/username is already taken' });
  }

  const user = new User({ firstName, lastName, userName, email, password });
  try {
    await user.save();
  } catch (error: any) {
    console.log(error.message);
    return res.json({ error: 'User sign up failed, please try again later' });
  }
  res.json({ success: 'User has been created' });
}

export async function userSignInController(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    return res.json({ error: 'That user does NOT exist' });
  }

  if (!user.authenticate(password)) {
    res.status(401);
    return res.json({ error: 'Username or password is incorrect' });
  }

  const { accessToken, refreshToken } = generateTokens(user);

  try {
    user.tokens.push(refreshToken);
    await user.save();
  } catch (error: any) {
    console.log(error.message);
    return res.json({ error: 'User log in failed, please try again later' });
  }

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    maxAge: 24 * Math.pow(60, 2) * 1000, // 1 day
  });

  res.json({
    success: 'User logged in successfully',
    accessToken,
  });
}

export async function userLogOutController(req: Request, res: Response) {
  const { cookies } = req;

  if (!cookies.jwt) return res.status(204).json({ error: 'No jwt cookie found' });

  const refreshCookie = cookies.jwt;

  jwt.verify(
    refreshCookie,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    async (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) return res.json({ error: error.message });

      const { id } = decoded;

      const user = await User.findOne({ _id: id });

      // no user with that refreshtoken
      if (!user) {
        res.clearCookie('jwt', { httpOnly: true });
        return res.status(204).json({ success: 'User has been logged out' });
      }

      // has refreshtoken in db, delete record and clear cookie
      try {
        user.tokens = user.tokens.filter((token) => token !== refreshCookie);
        await user.save();
        res.clearCookie('jwt', { httpOnly: true });
        return res.json({ success: 'User has been logged out' });
      } catch (error: any) {
        return res.json({ error: error.message });
      }
    }
  );
}
