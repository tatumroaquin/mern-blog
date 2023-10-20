import { Request, Response, NextFunction } from 'express';
import axios from 'axios';

export const checkRecaptcha = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { recaptcha } = req.body;

  if (!recaptcha)
    return res.status(403).json({ error: 'Recaptcha token is not supplied' });

  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptcha}`
  );

  if (!response.data.success) {
    return res.status(403).json({ error: 'Recaptcha verification failed!' });
  }
  next();
};
