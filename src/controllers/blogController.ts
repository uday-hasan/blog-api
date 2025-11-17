import { Request, Response } from 'express';
import Blog from '../models/Blog';
export const createBlog = async (req: Request & { user?: any }, res: Response) => {
  const { title, content } = req.body;
  if (!title || !content) return res.status(400).json({ message: 'Missing fields' });
  const blog = await Blog.create({ title, content, author: req.user.id });
  res.json(blog);
};
export const getBlogs = async (_req: Request, res: Response) => {
  const blogs = await Blog.find().populate('author', 'name email');
  res.json(blogs);
};
export const getBlog = async (req: Request, res: Response) => {
  const blog = await Blog.findById(req.params.id).populate('author', 'name email');
  if (!blog) return res.status(404).json({ message: 'Not found' });
  res.json(blog);
};
