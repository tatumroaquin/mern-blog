import { Request, Response, NextFunction } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';

interface IUserRequest extends Request {
  accessTokenPayload?: JwtPayload | string;
  refreshTokenPayload?: JwtPayload | string;
}

export function verifyAccessToken(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);

  if (!authHeader) return res.sendStatus(401);

  const accessToken = authHeader.split(' ')[1];

  try {
    req.accessTokenPayload = JWT.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_SECRET!
    );
    next();
  } catch (e: any) {
    return res.status(401).json({ error: 'Invalid access token' });
  }
}

export function verifyRefreshToken(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const { jwt } = req.cookies;

  if (!jwt) return res.status(401).json({ error: 'No JWT Cookie Passed' });

  const refreshToken = jwt;

  try {
    req.refreshTokenPayload = JWT.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET!
    );
    next();
  } catch (e: any) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}

export function verifyRTLogout(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const { jwt } = req.cookies;

  if (!jwt) return res.status(401).json({ error: 'No JWT Cookie Passed' });

  try {
    JWT.verify(jwt, process.env.JWT_REFRESH_TOKEN_SECRET!);
    res.locals.jwt = jwt;
    next();
  } catch (e: any) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}
