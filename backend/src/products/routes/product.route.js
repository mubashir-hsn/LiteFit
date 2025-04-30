import express from "express"
import {createProduct, deleteProduct, getAllProducts, getProducts, getRelatedProduct, getSingleProduct, updateProduct } from "../controllers/product.controller.js";
import verifyToken from "../../jwt/verifyToken.js";
import { verifyAdmin } from "../../jwt/VerifyAdmin.js";

const router = express.Router();

// API route to add products
router.post('/upload', getAllProducts);
router.post('/create-product',verifyToken ,verifyAdmin ,createProduct)
router.get('/', getProducts)
router.get('/:id', getSingleProduct)
router.patch('/update-product/:id',verifyToken , verifyAdmin , updateProduct)
router.delete('/delete/:id',verifyToken , verifyAdmin ,deleteProduct)
router.get('/related/:id', getRelatedProduct)

export default router