import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

interface IUserRequest extends Request {
  accessTokenPayload?: JwtPayload | string;
  refreshTokenPayload?: JwtPayload | string;
}

export const checkRole = (role: string) => {
  return async function (req: IUserRequest, res: Response, next: NextFunction) {
    const at_user: any = req.accessTokenPayload;
    if (at_user?.roles.includes(role)) next();
    else
      res.status(401).json({
        error: `Only ${role}s are authorized to access this area!`,
      });
  };
};
