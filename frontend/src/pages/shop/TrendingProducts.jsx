import React, { useState } from 'react'
import ProductCard from './ProductCard'
import GetAllProducts from '../../contextApi/GetAllProducts.jsx';
const TrendingProducts = () => {

    const [products , loading] = GetAllProducts();
    const filterData = products.filter(product=>(product.trend === 'trending'))
    const [visibleProducts, setvisibleProducts] = useState(8)
    const loadProducts = ()=>{
        setvisibleProducts(prevCount => prevCount + 4)
    }

    if (loading) return <div>Loading....</div>

    return (
        <section className='section__container product__container'>
            <h2 className='section__header'>
                Trending Products
            </h2>
            <p className='section__subheader mb-12'> Discover the Hottest Picks: Elevate Your Style with Our Curated
                Collection of Trending Fashion Products.
            </p>

            {/* Product Cards */}
            <ProductCard products={filterData.slice(0,visibleProducts)}/>
          
          <div className='product__btn'>
            {
                visibleProducts < filterData.length && (
                    <button className='btn' onClick={loadProducts}>Load More</button>
                )
            }
          </div>

        </section>
    )
}

export default TrendingProducts