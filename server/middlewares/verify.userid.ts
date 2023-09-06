import { Request, Response, NextFunction } from 'express';
import JWT, { JwtPayload } from 'jsonwebtoken';

interface IUserRequest extends Request {
  accessTokenPayload?: JwtPayload | string;
  refreshTokenPayload?: JwtPayload | string;
}

export function verifyUserId(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const at_user: any = req.accessTokenPayload;
  const rt_user: any = req.refreshTokenPayload;
  const { userId } = req.body;

  if (at_user.id !== userId || rt_user.id !== userId)
    return res.json({ error: 'User ID does not match token details' });

  next();
}
