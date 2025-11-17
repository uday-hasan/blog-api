"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBlog = exports.getBlogs = exports.createBlog = void 0;
const Blog_1 = __importDefault(require("../models/Blog"));
const createBlog = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content)
        return res.status(400).json({ message: 'Missing fields' });
    const blog = await Blog_1.default.create({ title, content, author: req.user.id });
    res.json(blog);
};
exports.createBlog = createBlog;
const getBlogs = async (_req, res) => {
    const blogs = await Blog_1.default.find().populate('author', 'name email');
    res.json(blogs);
};
exports.getBlogs = getBlogs;
const getBlog = async (req, res) => {
    const blog = await Blog_1.default.findById(req.params.id).populate('author', 'name email');
    if (!blog)
        return res.status(404).json({ message: 'Not found' });
    res.json(blog);
};
exports.getBlog = getBlog;
