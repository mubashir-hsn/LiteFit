import Blog from "./blog.model.js"

export const getBlogs = async(req,res)=>{

    try {

        const blogs = await Blog.find({}).sort({ createdAt: -1 });

        if (!blogs) {
            return res.status(404).send({success:true, message:"No Blog Found."});
        }
        
        res.status(201).send(blogs);

    } catch (error) {
        console.log("Error while fetching blogs:" , error);
        return res.status(500).send({success:false, message:"Failed to get blogs."})
    }
}

export const createBlog = async(req,res)=>{

    const {title , subtitle , imageUrl ,description ,author} = req.body;
try {
    
        if (!title || !subtitle || !imageUrl || !description) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
    
        const createBlog = new Blog({
            title,
            subtitle,
            imageUrl,
            description,
            author
        });
    
        const saveBlog = await createBlog.save();
        res.status(201).send({success:true,message:"Blog created successfully.",saveBlog})

} catch (error) {
    console.log("Error while creating new blogs:" , error);
        res.status(500).send({success:false, message:"Failed to create blog."})
}

}