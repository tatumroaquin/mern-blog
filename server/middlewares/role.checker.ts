import { Request, Response, NextFunction } from 'express';

interface IUserRequest extends Request {
  user?: {
    roles: string[];
  };
}

export const checkRole = (role: string) => {
  return async function (req: IUserRequest, res: Response, next: NextFunction) {
    if (req.user?.roles.includes(role)) next();
    else
      res.status(401).json({
        error: `Only ${role}s are authorized to access this area!`,
      });
  };
};
