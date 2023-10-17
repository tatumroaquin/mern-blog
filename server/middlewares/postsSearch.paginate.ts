import { Request, Response, NextFunction } from 'express';
// import { PipelineStage } from 'mongoose';
import Post from '../models/Post.model.js';

interface Page {
  page: number;
  limit: number;
}
//https://stackoverflow.com/a/48307554

export const postsSearchPaginate = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;

    if (!q) {
      return res.json({ error: 'No query string provided' });
    }

    const total = await Post.countDocuments({
      $text: { $search: q as string },
    });

    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? total ?? 1);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result: {
      prev?: Page;
      next?: Page;
      data?: Array<object>;
      total: number;
    } = { total };

    if (startIndex > 1) {
      result.prev = { page: page - 1, limit };
    }
    if (endIndex < total) {
      result.next = { page: page + 1, limit };
    }

    result.data = await Post.find(
      { $text: { $search: q as string } },
      '-markdown'
    )
      .skip(startIndex)
      .limit(limit)
      .sort({ _id: -1 })
      .populate('author', '-passwordHash');

    res.locals.result = result;
    next();
  };
};
