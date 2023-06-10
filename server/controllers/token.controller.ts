import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.model.ts';
import { generateTokens } from '../utility/generate.tokens.ts';

//https://dev.to/bahdcoder/the-ultimate-guide-to-jwt-server-side-auth-with-refresh-tokens-4jb3
export async function refreshTokenController(req: Request, res: Response) {
  const { cookies } = req;

  if (!cookies?.jwt) return res.sendStatus(403);

  const user = await User.findOne({ tokens: cookies.jwt });

  // no user attached to token, means reuse attempt, delete all refresh tokens
  if (!user) {
    jwt.verify(
      cookies.jwt,
      process.env.JWT_REFRESH_TOKEN_SECRET!,
      async (error: jwt.VerifyErrors | null, decoded: any) => {
        if (error) return res.json({ error: error.message });

        const hackedUser = await User.findOne({ id: decoded.id });

        if (!hackedUser) {
          return res.json({
            error: 'Refresh token details are invalid',
          });
        }

        hackedUser.tokens = [];

        try {
          await hackedUser.save();
        } catch (error: any) {
          return res.json({ error: error.message });
        }
      }
    );
    return res.status(403).json({ error: 'Refresh token reuse detected' });
  }

  jwt.verify(
    cookies.jwt,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    async (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) {
        user.tokens = user.tokens.filter((token) => token !== cookies.jwt);
        await user.save();
      }

      const { id, roles } = decoded;

      if (user.id !== id || user.roles !== roles)
        return res.json({
          error: 'User id and roles does not match token',
        });

      const { accessToken, refreshToken } = generateTokens(user);

      user.tokens.push(refreshToken);

      try {
        await user.save();
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
