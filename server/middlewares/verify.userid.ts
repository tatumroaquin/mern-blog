import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface IUserRequest extends Request {
  accessTokenPayload?: JwtPayload | string;
  refreshTokenPayload?: JwtPayload | string;
  at_user?: JwtPayload | string;
  rt_user?: JwtPayload | string;
}

export function verifyUserId(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const at_user: any = req.accessTokenPayload;
  const rt_user: any = req.refreshTokenPayload;

  let id: string;

  if (req.body.userId) {
    id = req.body.userId;
  } else if (req.params.id) {
    id = req.params.id;
  } else {
    id = rt_user.id || at_user.id;
  }

  req.at_user = at_user;
  req.rt_user = rt_user;

  if (at_user.roles.includes('admin') && rt_user.roles.includes('admin'))
    return next();

  if (at_user.id !== id || rt_user.id !== id) {
    return res
      .status(403)
      .json({ error: 'User ID does not match token details' });
  }
  next();
}
