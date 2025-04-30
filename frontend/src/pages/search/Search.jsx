import React, { useEffect, useState } from 'react'
import ProductCard from '../shop/ProductCard';
import GetAllProducts from '../../contextApi/GetAllProducts.jsx';
const Search = () => {
    const [query, setQuery] = useState('');
    const [products , loading] = GetAllProducts();
    const [filterProducts, setfilterProducts] = useState(products);

    useEffect(() => {
      const handleProducts = ()=>{
      const searchQuery = query.toLowerCase();
      const filter = products.filter((product) => 
          product?.name.toLowerCase().includes(searchQuery) || 
          product?.description.toLowerCase().includes(searchQuery) ||
          product?.category.toLowerCase().includes(searchQuery) ||
          product?.color.toLowerCase().includes(searchQuery)
      );
      setfilterProducts(filter);
      }

      handleProducts();
  }, [query, products]);

  if (loading) return <div>Loading....</div>

  return (
    <>
        <section className='section__container bg-primary-light'>
            <h1 className='section__header capitalize'>Search Products</h1>
            <p className='section__subheader'>Browse a diverse range of categories , from chic dresses to versatile accessories. Elevate your style today!</p>
        </section>

        <section className='section__container'>
           <div className='w-full flex flex-col md:flex-row items-center justify-center mb-12'>
           <input type="text" 
             value={query}
             onChange={(e)=> setQuery(e.target.value)}
             className='search-bar w-full max-w-4xl border bg-slate-100 outline-none p-3 '
             placeholder='Search for Products...'
           />

           <button  className='search-button w-full md:w-auto bg-primary uppercase text-white py-3 px-8  hover:bg-indigo-500'>Search</button>
           </div>

           <ProductCard products={filterProducts}/>
        </section>
    </>
  )
}

export default Search