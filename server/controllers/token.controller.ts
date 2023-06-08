import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export function refreshTokenController(req: Request, res: Response) {
  const { cookies } = req;

  console.log(cookies);

  if (!cookies?.jwt) return res.sendStatus(403);

  jwt.verify(
    cookies.jwt,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    (error: jwt.VerifyErrors | null, decoded: any) => {
      if (error) return res.status(403).json({ error });

      const { id, roles } = decoded;

      const accessToken = jwt.sign(
        { id, roles },
        process.env.JWT_ACCESS_TOKEN_SECRET!
      );

      return res.json({
        success: 'Access token has been refreshed',
        accessToken,
      });
    }
  );
}
