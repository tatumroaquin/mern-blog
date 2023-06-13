import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import User from '../models/User.model.ts';
import Token from '../models/Token.model.ts';

import { generateTokens } from '../utility/generate.tokens.ts';

//https://dev.to/bahdcoder/the-ultimate-guide-to-jwt-server-side-auth-with-refresh-tokens-4jb3
export async function refreshTokenController(req: Request, res: Response) {
  const { jwt } = req.cookies;

  if (!jwt) return res.sendStatus(403);

  const user = await User.findOne({ tokens: jwt });

  // no user attached to token, means reuse attempt, delete all refresh tokens
  if (!user) {
    JWT.verify(
      jwt,
      process.env.JWT_REFRESH_TOKEN_SECRET!,
      async (error: JWT.VerifyErrors | null, decoded: any) => {
        if (error) return res.status(403).json({ error: error.message });

        const hackedUser = await User.findOne({ _id: decoded.id });

        try {
          await Token.deleteMany({ userId: hackedUser?._id });
        } catch (error: any) {
          return res.json({ error: error.message });
        }
      }
    );
    return res.status(403).json({ error: 'Refresh token reuse detected' });
  }

  JWT.verify(
    jwt,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    async (error: JWT.VerifyErrors | null, decoded: any) => {
      if (error) await Token.findOneAndDelete({ content: jwt });

      const { id, roles } = decoded;

      if (user.id !== id || user.roles !== roles)
        return res.json({
          error: 'User id and roles does not match token',
        });

      const { accessToken, refreshToken } = generateTokens(user);

      try {
        await new Token({ userId: user.id, content: refreshToken }).save();
      } catch (error: any) {
        return res.json({ error: error.message });
      }

      res.clearCookie('jwt', { httpOnly: true });

      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * Math.pow(60, 2) * 1000,
      });

      return res.json({
        success: 'Access token has been refreshed',
        accessToken,
      });
    }
  );
}
