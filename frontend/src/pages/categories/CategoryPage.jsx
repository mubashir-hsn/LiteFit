import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetAllProducts from '../../contextApi/GetAllProducts.jsx'; 
import ProductCard from '../shop/ProductCard.jsx';

const CategoryPage = () => {
    const [ products , loading ] = GetAllProducts();
    const { categoryName } = useParams();
    const [filterProducts, setFilterProducts] = useState([]);

    useEffect(() => {
        if (products) {
            const filtered = products.filter((product) =>
                product.category.toLowerCase() === categoryName.toLowerCase()
            );
            setFilterProducts(filtered);
        }
    }, [products, categoryName]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []); // Added an empty dependency array to only run this effect once when the component mounts

    if (loading) return <div>Loading....</div>

    return (
        <>
            <div className='section__container bg-primary-light'>
                <h1 className='section__header capitalize'>{categoryName}</h1>
                <p className='section__subheader'>
                    Browse a diverse range of categories, from chic dresses to versatile accessories. Elevate your style today!
                </p>
            </div>
            <div className='section__container'>
                <ProductCard products={filterProducts} />
            </div>
        </>
    );
};

export default CategoryPage;
