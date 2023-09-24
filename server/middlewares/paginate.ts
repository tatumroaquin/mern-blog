import { Request, Response, NextFunction } from 'express';
import { PipelineStage } from 'mongoose';
import Post from '../models/Post.model.js';
import User from '../models/User.model.js';

interface Page {
  page: number;
  limit: number;
}

export const paginate = (modelName: string, reverse?: boolean) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    let total = 0;
    switch (modelName) {
      case 'posts':
        total = (await Post.countDocuments()) || 0;
        break;
      case 'users':
        total = (await User.countDocuments()) || 0;
        break;
    }

    const page = +req.query.page! || 1;
    const limit = +req.query.limit! || total;

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
      { $skip: startIndex },
      { $limit: limit },
      { $sort: { _id: -1 } },
    ];

    if (reverse) {
      pipeline.unshift(pipeline.pop() as PipelineStage);
    }

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
            $unset: ['markdown', 'userId', 'author.email', 'author.roles', 'author.passwordHash'],
          },
        ]);
        break;
      }
      case 'users': {
        result.data = await User.aggregate([
          ...pipeline,
          {
            $unset: ['passwordHash']
          }
        ]);
        break;
      }
    }

    res.locals.result = result;
    next();
  };
};
