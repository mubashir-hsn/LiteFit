import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GetAllProducts from '../../contextApi/GetAllProducts.jsx';
import ProductCard from './ProductCard.jsx';
import ShopFilter from './ShopFilter.jsx';
import { CartContext } from '../../contextApi/CartContext.jsx';
import HeroSection from './women/HeroSection.jsx';
import GetCategories from '../../contextApi/GetCategories.jsx';

// const menFilter = {
//     categories: ['all', 'accessories', 'kurta', 'pentshirt', 'pentcoat', 'hoodie', 'footwear'],
//     color: ['all', 'black', 'blue', 'beige', 'brown', 'grey', 'red', 'white'],
// }
// const womenFilter = {
//     categories: ['all', 'accessories', 'cosmetics', 'dress', 'footwear'],
//     color: ['all', 'black', 'green', 'gold', 'red', 'yellow'],
// }



const Shop = () => {

    const { category } = useParams(); // Extract category from URL
    const [products, loading] = GetAllProducts();
    const [categories] = GetCategories();
    const [menFilter, setMenFilter] = useState({ categories: ['all'], color: ['all', 'black', 'blue', 'beige', 'brown', 'grey', 'red', 'white'] });
    const [womenFilter, setWomenFilter] = useState({ categories: ['all'], color: ['all', 'black', 'green', 'gold', 'red', 'yellow'] });
    const { addToCart } = useContext(CartContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filterState, setFilterState] = useState({
        categories: 'all',
        color: 'all',
        priceRange: '',
    });

    // Filter categories based on type
    useEffect(() => {
        if (categories.length > 0) {
            const menCategories = ['all'];
            const womenCategories = ['all'];

            categories.forEach((cat) => {
                if (cat.type === 'men' || cat.type === 'both') {
                    menCategories.push(cat.name);
                }
                if (cat.type === 'women' || cat.type === 'both') {
                    womenCategories.push(cat.name);
                }
            });

            setMenFilter((prev) => ({ ...prev, categories: menCategories }));
            setWomenFilter((prev) => ({ ...prev, categories: womenCategories }));
        }
    }, [categories]);


    // set filters
    const filter = {
        ...(
            category === 'men'
                ? { ...menFilter }
                : { ...womenFilter }
        ),
        priceRange: [
            { label: 'Under $50', min: 0, max: 50 },
            { label: '$50 - $100', min: 50, max: 100 },
            { label: '$100 - $200', min: 100, max: 200 },
            { label: '$200 & above', min: 200, max: Infinity },
        ],
    };

    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            applyFilter();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products, filterState, category]);

    const applyFilter = () => {
        let filtered = products.filter(product => product.gent.toLowerCase() === category);

        if (filterState.categories !== 'all') {
            filtered = filtered.filter(product => product.category.toLowerCase() === filterState.categories);
        }

        if (filterState.color !== 'all') {
            filtered = filtered.filter(product => product.color.toLowerCase() === filterState.color);
        }

        if (filterState.priceRange) {
            const [min, max] = filterState.priceRange.split('-').map(Number);
            filtered = filtered.filter(product => product.price >= min && product.price <= max);
        }

        setFilteredProducts(filtered);
        setCurrentPage(1);
    };

    const clearFilter = () => {
        setFilterState({ categories: 'all', color: 'all', priceRange: '' });
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <section className={`${category==='men' ? 'bg-[url("assets/casual.jpg")] ' : 'bg-[url("assets/category-4.jpg")] '} h-[23rem] bg-fixed`}>
                <div className='flex flex-col justify-center items-center h-[23rem] bg-[#f4e5ecd5]'>
                    <div>
                        <h1 className='section__header capitalize'>{category} Products</h1>
                        <p className='section__subheader'>
                            Discover the best picks: Elevate your style with our curated collection of trending {category}&apos;s fashion products!
                        </p>
                    </div>
                </div>
            </section>
            {category === 'women' && <HeroSection />}
            <section className='section__container'>
                <div className='flex flex-col md:flex-row md:gap-12 gap-8'>

                    <div className='md:w-[17%]'>
                        <ShopFilter filter={filter} filterState={filterState} setfilterState={setFilterState} clearFilter={clearFilter} />
                    </div>

                    <div className='md:w-[87%]'>
                        <h4 className='text-xl font-medium mb-4'>
                            {filteredProducts.length > 0
                                ? `Showing ${indexOfFirstProduct + 1} to ${Math.min(indexOfLastProduct, filteredProducts.length)} of ${filteredProducts.length} Products`
                                : 'No Product Available'}
                        </h4>
                        <hr />
                        <ProductCard products={currentProducts} addToCart={addToCart} />
                        <div className='pagination mt-2'>
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => paginate(index + 1)}
                                    className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Shop;
