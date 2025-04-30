import express from 'express'
import { deleteReview, getAllReviews, getReviews, postReview, totalReviews } from './reviews.controller.js';
import verifyToken from '../jwt/verifyToken.js';
import { verifyAdmin } from '../jwt/VerifyAdmin.js';

const router = express.Router();

router.get('/:productId' , getReviews);
router.post('/post-review', postReview);
router.get('/total-reviews', verifyToken , verifyAdmin ,totalReviews);
router.get('/api/get-all-reviews',verifyToken , getAllReviews);
router.delete('/delete/:id',verifyToken ,deleteReview)
export default router