import { Request, Response, NextFunction } from 'express';

export default function (origin?: string) {
  return function (_: Request, res: Response, next: NextFunction) {
    const domain = origin ?? process.env.CLIENT_URL;
    res.setHeader('Acess-Control-Allow-Origin', domain ?? '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin X-Requested-With Accept, Content-Type, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTION'
    );
    next();
  };
}
