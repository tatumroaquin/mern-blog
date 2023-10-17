import { Request, Response, NextFunction } from 'express';
import Post from '../models/Post.model.js';

interface Page {
  page: number;
  limit: number;
}

export const postsAllPaginate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const total = (await Post.countDocuments()) ?? 1;

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
    result.data = await Post.find({}, '-markdown')
      .skip(startIndex)
      .limit(limit)
      .sort({ _id: -1 })
      .populate({
        path: 'author',
        select: '-passwordHash',
      });

    res.locals.result = result;
    next();
  };
};
