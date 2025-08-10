import express from 'express';
import { verifyAdmin } from '../jwt/VerifyAdmin.js';
import verifyToken from '../jwt/verifyToken.js';
import { createBlog, getBlogs } from './blog.controller.js';

const router = express.Router();

router.get('/', getBlogs);
router.post('/create-blog', verifyToken,verifyAdmin,createBlog);

export default router;