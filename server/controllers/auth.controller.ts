import { randomBytes } from 'node:crypto';
import { Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';

import User from '../models/User.model.js';
import RefreshToken from '../models/RefreshToken.model.js';
import VerifyToken from '../models/VerifyToken.model.js';

import { generateTokens } from '../utility/generate.tokens.js';
import { sendEmail } from '../utility/sendEmail.js';

interface IUserRequest extends Request {
  accessTokenPayload?: JwtPayload | { id: string };
  refreshTokenPayload?: JwtPayload | { id: string };
}

export async function userSignUpController(req: Request, res: Response) {
  const { firstName, lastName, userName, email, password } = req.body;

  const userExist = await User.exists({ userName, email });

  if (userExist) {
    return res
      .status(400)
      .json({ error: 'That email/username is already taken' });
  }

  const user = new User({ firstName, lastName, userName, email, password });
  const verifyToken = new VerifyToken({
    content: randomBytes(16).toString('hex'),
  });
  try {
    await user.save();

    verifyToken.userId = user._id;
    await verifyToken.save();

    const emailData = {
      toAddress: email as string,
      subject: 'Account Verification',
      firstName: firstName as string,
      userId: user._id as string,
      verifyToken: verifyToken.content as string,
    };
    sendEmail(emailData);
    // console.log(
    //   'V_TOKEN',
    //   `${process.env.CLIENT_URL}/auth/verify/${user._id}/${verifyToken.content}`
    // );
  } catch (e: unknown) {
    if (e instanceof Error) {
      // return res.json({ error: 'User sign up failed, please try again later' });
      return res.json({ error: e.message });
    }
  }
  res.json({ success: 'User has been created' });
}

export async function userSignInController(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(401);
    return res.json({ error: 'Email or password is incorrect' });
  }

  if (!user.authenticate(password)) {
    return res.status(401).json({ error: 'Email or password is incorrect' });
  }

  if (!user.verified) {
    return res.status(403).json({
      error: `${user.userName} you must verify your account to sign in.`,
    });
  }

  const { accessToken, refreshToken } = generateTokens(user);

  try {
    await new RefreshToken({ userId: user._id, content: refreshToken }).save();
  } catch (error: any) {
    return res.json({ error: 'User log in failed, please try again later' });
  }

  res.cookie('jwt', refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 24 * Math.pow(60, 2) * 1000, // 1 day
  });

  res.json({
    success: 'User logged in successfully',
    roles: user.roles,
    username: user.userName,
    accessToken,
  });
}

export async function userLogOutController(_: IUserRequest, res: Response) {
  const { jwt } = res.locals;

  try {
    const refreshToken = await RefreshToken.findOneAndDelete({
      content: jwt,
    });
    if (!refreshToken) {
      return res.status(204).json({ error: 'Refresh token does not exist' });
    }
    return res
      .clearCookie('jwt', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      .json({ success: 'You have been logged out' });
  } catch (e: unknown) {
    if (e instanceof Error)
      return res.status(500).json({ error: `${e.message}` });
  }
}

export async function userVerifyController(req: Request, res: Response) {
  const { userId, verifyToken } = req.params;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(403)
        .json({ error: 'Unable to verify user, account does not exist!' });
    }

    const token = await VerifyToken.findOneAndDelete({
      userId,
      content: verifyToken,
    });
    if (!token) {
      return res.status(403).json({
        error:
          'Your verification link is invalid, if your token has expired request a new link.',
      });
    }

    user.verified = true;
    user.save();

    return res.json({
      success: `${user?.userName} has been verified sucessfully.`,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
      return res.status(500).json({
        error: e.message,
      });
    }
  }
}
