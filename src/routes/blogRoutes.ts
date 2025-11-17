import { Router } from 'express';
import { createBlog, getBlogs, getBlog } from '../controllers/blogController';
import { protect } from '../middleware/authMiddleware';
const router = Router();
router.get('/', getBlogs);
router.get('/:id', getBlog);
router.post('/', protect, createBlog);
export default router;
