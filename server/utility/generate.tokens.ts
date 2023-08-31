import jwt from 'jsonwebtoken';
import User from '../models/User.model.js';

export function generateTokens(user: InstanceType<typeof User> ) {
  const payload = { id: user._id, roles: user.roles };

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
