import { Request, Response, NextFunction } from 'express';
import { PipelineStage } from 'mongoose';
import Post from '../models/Post.model.js';

interface Page {
  page: number;
  limit: number;
}
//https://stackoverflow.com/a/48307554

export const search = (modelName: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;

    if (!q) {
      return res.json({ error: 'No query string provided' });
    }

    let total = 0;
    switch (modelName) {
      case 'posts': {
        total = await Post.find({ $text: { $search: q as string } }).count();
        break;
      }
      case 'users': {
        total = await Post.find({ $text: { $search: q as string } }).count();
        break;
      }
    }

    const page = +req.query.page! || 1;
    const limit = +req.query.limit! || total || 1;

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

    const pipeline: PipelineStage[] = [
      { $match: { $text: { $search: q as string } } },
      { $skip: startIndex },
      { $limit: limit },
      { $sort: { $score: { $meta: 'textScore' } } },
    ];

    switch (modelName) {
      case 'posts': {
        result.data = await Post.aggregate([
          ...pipeline,
          {
            $lookup: {
              from: 'users',
              localField: 'userId',
              foreignField: '_id',
              as: 'author',
            },
          },
          { $unwind: '$author' },
          {
            $unset: [
              'markdown',
              'userId',
              'author.email',
              'author.roles',
              'author.passwordHash',
            ],
          },
        ]);
        break;
      }
    }

    res.locals.result = result;
    next();
  };
};
