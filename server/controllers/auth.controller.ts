import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import User from '../models/User.model.js';
import Token from '../models/Token.model.js';

import { generateTokens } from '../utility/generate.tokens.js';

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
    await new Token({ userId: user._id, content: refreshToken }).save();
  } catch (error: any) {
    return res.json({ error: 'User log in failed, please try again later' });
  }

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 24 * Math.pow(60, 2) * 1000, // 1 day
  });

  res.json({
    success: 'User logged in successfully',
    roles: user.roles,
    username: user.userName,
    accessToken,
  });
}

export async function userLogOutController(req: Request, res: Response) {
  const { jwt } = req.cookies;

  if (!jwt) return res.status(204).json({ error: 'No jwt cookie found' });

  JWT.verify(
    jwt,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    async (error: JWT.VerifyErrors | null, decoded: any) => {
      if (error) return res.json({ error: error.message });

      const user = await User.findOne({ _id: decoded.id });
      const refreshToken = await Token.findOne({ content: jwt });
      res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none'});

      // no user with that refreshtoken
      if (!user) {
        return res
          .status(204)
          .json({ error: 'Refresh token user does not exists' });
      }

      if (!refreshToken) {
        return res.status(204).json({ error: 'Refresh token does not exist' });
      }

      // has refreshtoken in db, delete record and clear cookie
      try {
        refreshToken.deleteOne();
        return res.json({ success: 'User has been logged out' });
      } catch (error: any) {
        return res.json({ error: error.message });
      }
    }
  );
}
