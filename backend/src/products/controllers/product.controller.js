import Review from "../../reviews/review.model.js";
import Product from "../model/products.model.js"
import { v2 as cloudinary } from 'cloudinary';


// get products from frontend

export const getAllProducts= async (req, res) => {
    try {
      const products = req.body;
      const insertedProducts = await Product.insertMany(products);
      res.status(200).json({ message: 'Products uploaded successfully!', data: insertedProducts });
    } catch (error) {
      res.status(500).json({ message: 'Error uploading products', error });
    }
  }

// post product
export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, color, gent ,stock ,sizes } = req.body;
    const size = JSON.parse(sizes) ?? '';

    // Check required fields
    if (!name || !category || !description || !price || !color || !gent || !stock) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if an image is uploaded
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Image is required.' });
    }

    const imageFile = req.files.image;

    try {
      // Upload image to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(imageFile.tempFilePath, {
        folder: 'products',
        allowed_formats: ['jpeg', 'png', 'jpg'], // Restrict formats
      });

      // Create a new product with the uploaded image URL
      const newProduct = new Product({
        name,
        category,
        description,
        price,
        color,
        gent,
        stock,
        image: uploadResponse.secure_url,
        sizes: size
      });

      const savedProduct = await newProduct.save();

      res.status(201).json({ message: 'Product created successfully!', product: savedProduct });
    } catch (uploadError) {
      // Handle image upload errors
      if (uploadError.http_code === 400 && uploadError.message.includes('Invalid image format')) {
        return res
          .status(400)
          .json({ message: 'Invalid image format. Allowed formats are jpeg, png, and jpg.' });
      }
      throw uploadError;
    }
  } catch (error) {
    console.error('Error while creating new product:', error);
    return res.status(500).json({ message: 'Failed to create new product.', error });
  }
};

// get products

// export const getProducts = async(req,res)=>{
//     try {
//         const {category,color,minPrice,maxPrice,page=1,limit=10} = req.query;
//         let filter = {};
//         if (category && category !== "all") {
//             filter.category = category
//         }
//         if (color && color !== "all") {
//             filter.color = color
//         }
//         if (minPrice && maxPrice) {
//             const min = parseFloat(minPrice);
//             const max = parseFloat(maxPrice);
//             if (isNaN(min) && isNaN(max)) {
//                 filter.price = {$gte:min , $lte:max}
//             }
//         }

//         const skip = (parseInt(page)-1)*parseInt(limit);
//         const totalProduct = await Product.countDocuments(filter);
//         const totalPages = Math.ceil(totalProduct/parseInt(limit))
//         const products = await Product.find(filter)
//                                .skip(skip)
//                                .limit(parseInt(limit))
//                                .populate("email")
//                                .sort({createdAt : -1});
//         res.status(200).send({products,totalPages,totalProduct});

//     } catch (error) {
//         console.log("Error while fetching products: " + error)
//         res.status(500).send({message: "Failed to fetch products."})
//     }
// }

export const getProducts = async(req,res)=>{
    try {
        const products = await Product.find({}).sort({createdAt : -1});
        if (!products) {
           return res.status(401).send({message: "No product found."})
        }

        res.status(200).send(products)
    } catch (error) {
        console.log('Error while get All products: ' + error);
        res.status(500).send({message: "Failed to get all products."})
    }
}

// get single product 

export const getSingleProduct = async(req,res)=>{
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId).populate('username email');
        if (!product) {
            return res.status(404).send({message : "Product not found"})
        }
        const review = await Review.find({productId}).populate('userId','username,email')
        res.status(200).send({product,review})

    } catch (error) {
        console.log("Error while fetching the  single product: " + error)
        res.status(500).send({message: "Failed to fetch the product."})
    }
}

// update product

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    // Check if the product ID is valid
    if (!productId) {
      return res.status(400).send({ message: "Product ID is required." });
    }

    // Validate that the request body is not empty
    if (!Object.keys(req.body).length && !req.files) {
      return res.status(400).send({ message: "Request body is empty." });
    }

    let updatedData = { ...req.body };

    // Ensure sizes is an array
    if (req.body.sizes) {
      try {
        updatedData.sizes = JSON.parse(req.body.sizes); // Convert from string to array
        
      } catch (err) {
        return res.status(400).send({ message: "Invalid sizes format. Expecting an array." });
      }
    }

    // Check if an image file is included
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: "products",
        use_filename: true,
      });

      updatedData.image = result.secure_url;
    }

    // Attempt to update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found." });
    }

    res.status(201).send({
      message: "Product updated successfully.",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error while updating the product:", error);

    if (error.name === "CastError") {
      return res.status(400).send({ message: "Invalid product ID format." });
    }

    res.status(500).send({
      message: "Failed to update the product.",
      error: error.message,
    });
  }
};


// delete product

export const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.id
        const deleteProduct = await Product.findByIdAndDelete(productId)
        if (!deleteProduct) {
            return res.status(404).send({message : "Product not found"})
        }
        // delete reviews of that product
         await Review.deleteMany({productId: productId})

         res.status(200).send({message: "Product deleted successfully."})
    } catch (error) {
        console.log("Error while delete the  product: " + error)
        res.status(500).send({message: "Failed to delete the product."})
    }
}

// get related product

export const getRelatedProduct = async (req, res) => {
    try {
      const { id } = req.params; 
  
      if (!id) {
        return res.status(400).send({ message: "Product id is required." }); 
      }
  
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).send({ message: "Product not found." }); 
      }
  
      const titleRegex = new RegExp(
        product.name.split(" ")
          .filter((word) => word.length > 1)
          .join("|"),
        "i"
      );
  
      const relatedProduct = await Product.find({
        _id: { $ne: id }, // Exclude similar id product
        $or: [
          { name: { $regex: titleRegex } },  // Get similar name for related product
          { description: product.description },    // Get similar description for related product
          { category: product.category }    // Get similar category for related product
        ]
      });
  
      return res.status(200).send(relatedProduct); 
    } catch (error) {
      console.error("Error while fetching the related products:", error);
      return res.status(500).send({ message: "Failed to fetch related products." }); // Ensure single error response
    }
  };
  