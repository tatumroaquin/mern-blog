import { Document } from 'mongoose';
import jwt from 'jsonwebtoken';

interface User extends Document {
  roles: string[];
}

export function generateTokens(user: User ) {
  const payload = { id: user.id, roles: user.roles };

  const refreshToken = jwt.sign(
    payload,
    process.env.JWT_REFRESH_TOKEN_SECRET!,
    {
      expiresIn: process.env.JWT_RT_EXPIRY!
    }
  );

  const accessToken = jwt.sign(
    payload,
    process.env.JWT_ACCESS_TOKEN_SECRET!,
    {
      expiresIn: process.env.JWT_AT_EXPIRY!
    }
  );

  return { accessToken, refreshToken };
}
