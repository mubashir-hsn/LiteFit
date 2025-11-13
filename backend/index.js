import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRoutes from './src/users/routes/user.route.js'
import productRoutes from './src/products/routes/product.route.js'
import orderRoutes from './src/order/order.route.js'
import userReviewRoutes from './src/reviews/review.router.js';
import categoryRoutes from './src/category/category.route.js';
import blogRoutes from './src/blog/blog.route.js';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';


dotenv.config()


const app = express()
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI ;

// This is essential for secure cookies (secure: true) and sameSite: 'none' to work correctly.
app.set('trust proxy', 1);

// middleware setup
app.use(express.json({limit: '50mb'}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
  origin: ['https://lite-fit.vercel.app',],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE','OPTIONS'],
}));

app.use(fileUpload({
  useTempFiles:true,
  tempFileDir: "/tmp/"
}))


// mongoodb connect

try {

    await mongoose.connect(MONGODB_URI)
    console.log('Mongodb is connected successfully.')
    
} catch (error) {
    console.log('Mongoodb connection error: ',error)
}



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// set routes

app.use('/api/user',userRoutes)
app.use('/api/product',productRoutes)
app.use('/api/reviews', userReviewRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/blog', blogRoutes)



app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
