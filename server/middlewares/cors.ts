import { Request, Response, NextFunction } from 'express';
import { allowedOrigins } from '../config.js';

export default function () {
  return function (req: Request, res: Response, next: NextFunction) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Accept, Content-Type, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, PATCH, DELETE, OPTION'
    );
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    const origin = req.headers.origin || '';
    console.log(origin);

    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
    next();
  };
}
