import express from 'express';
import { addCategory, getCategories } from './category.controller.js';
import { verifyAdmin } from '../jwt/VerifyAdmin.js';
import verifyToken from '../jwt/verifyToken.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', verifyToken, verifyAdmin, addCategory);

export default router;