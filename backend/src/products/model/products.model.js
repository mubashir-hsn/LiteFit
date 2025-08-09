import mongoose from  'mongoose'
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    category: { type: String },
    description: { type: String},
    price: { type: Number, required: true },
    oldprice: { type: Number },
    image: { type: String},
    color: { type: String },
    rating: { type: Number, default: 0 },
    stock: { type: Number, default: 0 },
    gent: { type: String },
    sizes: {
        type: [String],
        enum: ["xs", "s", "m", "l", "xl", "xxl"],
      },
    trend: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } 

},{ timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product