import { Request, Response } from 'express';
import slugify from 'slugify';
import Post from '../models/Post.model.js';

interface IUserRequest extends Request {
  at_user?: { id: string; roles: string[] };
  rt_user?: { id: string; roles: string[] };
}

export async function createPostController(req: IUserRequest, res: Response) {
  const { author, title, description = '', markdown, tags = [] } = req.body;

  const postExist = await Post.findOne({
    slug: slugify(title, { lower: true, trim: true, strict: true }),
  });

  if (postExist)
    return res.json({ error: 'Post with that title already exist' });

  try {
    await new Post({ author, title, description, markdown, tags }).save();
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
  res.json({ success: 'Post has been created' });
}

export async function getPostBySlugController(req: Request, res: Response) {
  const { postSlug } = req.params;
  try {
    const post = await Post.findOne({ slug: postSlug }).populate(
      'author',
      '-passwordHash'
    );

    if (post?.length === 0) {
      return res.status(404).json({ error: 'Post does not exist' });
    }
    return res.json({ success: 'Post retrieved', post });
  } catch (e: unknown) {
    if (e instanceof Error) return res.json({ error: e.message });
  }
}

export async function getPostsByUserIdController(_: Request, res: Response) {
  const { result } = res.locals;

  if (!result)
    return res.status(404).json({ error: 'User does not have any posts' });

  try {
    return res.json({ success: ` retrieved`, result });
  } catch (e: unknown) {
    if (e instanceof Error) return res.status(500).json({ error: e.message });
  }
}

export async function searchPostsController(_: Request, res: Response) {
  const { result } = res.locals;
  res.json({ success: `Matching posts retrieved`, result });
}

export async function getAllPostsController(_: Request, res: Response) {
  const { result } = res.locals;

  try {
    return res.json({ success: 'All posts retrieved', result });
  } catch (e: any) {
    return res.json({ error: e.message });
  }
}

export async function updatePostController(req: IUserRequest, res: Response) {
  const { postSlug } = req.params;
  const { author, title, description, markdown, tags } = req.body;

  const post = await Post.findOne({ slug: postSlug });

  if (!post) return res.status(404).json({ error: 'Post not found' });

  //https://stackoverflow.com/a/11638106
  if (!post.author.equals(author) && !req?.at_user?.roles.includes('admin'))
    return res.status(401).json({ error: 'You can only edit your own posts' });

  try {
    post.title = title;
    post.description = description;
    post.markdown = markdown;
    post.tags = tags;
    // save triggers 'validate' hooks
    await post.save();
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
  res.json({ success: 'Post has been updated' });
}

export async function deletePostController(req: IUserRequest, res: Response) {
  const { postSlug } = req.params;
  const post = await Post.findOne({ slug: postSlug });

  if (!post) return res.status(404).json({ error: 'Post not found' });

  if (
    !post.author.equals(req.rt_user?.id) &&
    !req?.rt_user?.roles.includes('admin')
  )
    return res
      .status(401)
      .json({ error: 'You can only delete your own posts' });

  try {
    await post.deleteOne();
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
  res.json({ success: 'Post has been deleted' });
}
