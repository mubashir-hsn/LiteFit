import React, { useState } from 'react'
import ProductCard from './ProductCard'
import GetAllProducts from '../../contextApi/GetAllProducts.jsx';
const TrendingProducts = () => {

    const [products, loading] = GetAllProducts();
    const filterData = products.filter(product => (product.trend === 'trending'))
    const [visibleProducts, setvisibleProducts] = useState(8)
    const loadProducts = () => {
        setvisibleProducts(prevCount => prevCount + 4)
    }

    return (
        <section className='section__container product__container'>
           <div data-aos='fade-left'>
           <h2 className='section__header'>
                Trending Products
            </h2>
            <p className='section__subheader mb-12'> Discover the Hottest Picks: Elevate Your Style with Our Curated
                Collection of Trending Fashion Products.
            </p>
           </div>

            {
                loading ? (
                    <div className="flex flex-wrap gap-5 mt-5">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="w-full md:1/2 lg:w-[30%] p-4 bg-gray-200 animate-pulse h-52"></div>
                        ))}
                    </div>
                ) : (

                    <div>
                        <ProductCard products={filterData.slice(0, visibleProducts)} />

                        <div className='product__btn'>
                            {
                                visibleProducts < filterData.length && (
                                    <button className='btn animate-bounce' onClick={loadProducts}>Load More</button>
                                )
                            }
                        </div>
                    </div>
                )
            }

        </section>
    )
}

export default TrendingProducts