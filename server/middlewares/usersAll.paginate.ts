import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model.js';

interface Page {
  page: number;
  limit: number;
}

export const usersAllPaginate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {

    const total = (await User.countDocuments()) || 1;

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? total);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result: {
      prev?: Page;
      next?: Page;
      data?: Array<object>;
      total: number;
    } = { total };

    if (startIndex > limit - 1) {
      result.prev = { page: page - 1, limit };
    }
    if (endIndex < total) {
      result.next = { page: page + 1, limit };
    }

    // https://stackoverflow.com/a/48114446
        result.data = await User.find({}, '-passwordHash')
          .skip(startIndex)
          .limit(limit)
          .sort({ _id: -1 });

    res.locals.result = result;
    next();
  };
};
