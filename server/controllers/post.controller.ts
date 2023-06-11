import { Request, Response } from 'express';
import Post from '../models/Post.model.ts';

interface IUserRequest extends Request {
  user?: { id: string; roles: string[] };
}

export async function createPostController(req: IUserRequest, res: Response) {
  const { title, description = '', markdown, tags = [] } = req.body;

  const userId = req.user?.id;

  try {
    await new Post({ userId, title, description, markdown, tags }).save();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
  res.json({ success: 'Post has been created' });
}

export async function getPostBySlugController(req: Request, res: Response) {
  const { postSlug } = req.params;
  const post = await Post.findOne({ slug: postSlug });
  if (!post) {
    return res.status(404).json({ error: 'Post does not exist' });
  }
  res.json({ success: 'Post retrieved', post });
}

export async function getPostsByUserIdController(req: Request, res: Response) {
  const { userId } = req.body;
  const posts = await Post.find({ userId });

  if (!posts)
    return res.status(404).json({ error: `Post by ${userId} not found` });

  res.json({ success: `Posts by ${userId} retrieved`, posts });
}

export async function getAllPostsController(req: Request, res: Response) {
  const posts = Post.find({});

  if (!posts)
    res.status(204).json({ success: 'No posts the database is empty' });
  res.json({ success: 'All posts retrieved', posts });
}

export async function updatePostController(req: IUserRequest, res: Response) {
  const { postSlug } = req.params;
  const { title, description, markdown, tags } = req.body;
  const post = await Post.findOne({ slug: postSlug });

  if (!post) return res.status(404).json({ error: 'Post not found' });

  console.log(post.userId, req.user?.id);

  //https://stackoverflow.com/a/11638106
  if (!post.userId.equals(req.user?.id))
    return res.status(401).json({ error: 'You can only edit your own posts' });

  try {
    await post.updateOne({ title, description, markdown, tags });
  } catch (error: any) {
    return res.status(500).json({ error });
  }
  res.json({ success: 'Post has been updated' });
}

export async function deletePostController(req: IUserRequest, res: Response) {
  const { postSlug } = req.params;
  const post = await Post.findOne({ slug: postSlug });

  if (!post) return res.status(404).json({ error: 'Post not found' });

  if (post.userId.equals(req.user?.id))
    return res
      .status(401)
      .json({ error: 'You can only delete your own posts' });

  try {
    await post.deleteOne();
  } catch (error: any) {
    return res.status(500).json({ error });
  }
  res.json({ success: 'Post has been deleted' });
}
