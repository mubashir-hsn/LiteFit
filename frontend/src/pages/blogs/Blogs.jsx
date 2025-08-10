import GetAllBlogs from '../../contextApi/GetAllBlogs.jsx';
import BlogCard from './BlogCard';


const Blogs = () => {
  const [blogs] = GetAllBlogs();

  const spliceBlog = blogs.slice(0,4);
  return (
    <section id='blogs' className='section__container blog__container'>
      <h2 className='section__header'>Latest From Blogs</h2>
      <p className='section__subheader'>Elevate your wardrobe with our freshest style tips, trends, and inspiration on our blog.</p>
       <div>
        <BlogCard blogs={spliceBlog}/>
       </div>
    </section>
  );
};

export default Blogs;
