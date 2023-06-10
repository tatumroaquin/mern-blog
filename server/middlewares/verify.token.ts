import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface IUserRequest extends Request {
  user?: JwtPayload | string;
}

export function verifyToken(
  req: IUserRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);

  if (!authHeader) return res.sendStatus(401);

  const accessToken = authHeader.split(' ')[1];

  jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_TOKEN_SECRET!,
    (error, decoded) => {
      if (error) return res.sendStatus(403);
      req.user = decoded;
      next();
    }
  );
}
