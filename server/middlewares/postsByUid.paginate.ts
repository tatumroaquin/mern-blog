import { Request, Response, NextFunction } from 'express';
import Post from '../models/Post.model.js';
import User from '../models/User.model.js';

interface Page {
  page: number;
  limit: number;
}

interface Author {
  firstName: string;
  lastName: string;
}

export const postsByUidPaginate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    const total = (await Post.countDocuments({ author: userId })) ?? 1;
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 1);
    console.log('PAGE', page, 'LIMIT', limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result: {
      prev?: Page;
      next?: Page;
      data?: Array<object>;
      author?: Author | null;
      total: number;
    } = { total };

    // https://stackoverflow.com/a/48114446
    result.author = await User.findOne({ _id: userId }, 'firstName lastName');
    result.data = await Post.find({ author: userId }, '-markdown')
      .skip(startIndex)
      .limit(limit)
      .sort({ _id: -1 })
      .populate({
        path: 'author',
        select: '-passwordHash',
      });

    if (startIndex > limit - 1) {
      result.prev = { page: page - 1, limit };
    }
    if (endIndex < total) {
      result.next = { page: page + 1, limit };
    }

    res.locals.result = result;
    next();
  };
};
