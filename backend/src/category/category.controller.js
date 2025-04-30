import Category from "./category.model.js";

export const getCategories = async (req,res)=>{
   try {

    const categories = await Category.find({});

    if (!categories) {
         return res.status(400).send({success:false, message:"Category not found ."});
    }

    res.status(201).send(categories);
    
   } catch (error) {
    console.log("Error while fetching categories." + error);
    res.status(500).send({success:false, message:"Failed to fetch categories."})
   }
}

export const addCategory = async(req,res)=>{

    const {name , type } = req.body;

    try {
        if (!name || !type) {
           return res.status(401).send({success:false, message:"All fiels are required."});
        }

        const existCategory = await Category.findOne({name});
        if (existCategory) {
            return res.status(401).send({success:false, message:"Category already existed.It must be unique"});
        }

        const addCategory = new Category({name,type});
        await addCategory.save();
        
        res.status(201).send({success:true, message:"Category added successfully."});
        
    } catch (error) {
        console.log("Error while adding category." + error);
       res.status(500).send({success:false, message:"Failed to add category."})
    }
}