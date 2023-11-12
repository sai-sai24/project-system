import React, { Fragment, useEffect, useState } from 'react'
import MetaData from './layout/MetaData'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'

import { getProducts } from '../actions/productActions'
import Product from './product/Product'
import Loader from './layout/Loader'

// ... (other imports)

const Home = () => {
    const dispatch = useDispatch();
    const { loading, products, error, productsCount, resPerPage, filteredProductsCount } = useSelector(state => state.products);

    const [currentPage, setCurrentPage] = useState(1)
    const [price, setPrice] = useState([1, 1000])
    const [category, setCategory] = useState('');
    let { keyword } = useParams()

    const notify = (error = '') => toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER
    });

    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const categories = [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]

    useEffect(() => {
        if (error) {
            notify(error)
        }
        dispatch(getProducts(keyword, currentPage, price, category))
    }, [dispatch, error, currentPage, keyword, price, category]);

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }
    let count = productsCount;

    if (keyword) {
        count = filteredProductsCount;
    }

    return (
        <Fragment>
            {loading ? <Loader /> : (
                <Fragment>
                    <MetaData title={'Buy Best Products Online'} />
                    <h1 id="products_heading">Latest Products</h1>
                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map(product => (
                                <Product key={product._id} product={product} />
                            ))}
                        </div>
                        <div className="row">
                            {keyword ? (
                                <Fragment>
                                    <div className="col-6 col-md-3 mt-5 mb-5">
                                        {/* ... (your code remains unchanged) */}
                                    </div>
                                    <div className="col-6 col-md-9">
                                        <div className="row">
                                            {products && products.map(product => (
                                                <Product key={product._id} product={product} col={4} />
                                            ))}
                                        </div>
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {products && products.map(product => (
                                        <Product key={product._id} product={product} col={3} />
                                    ))}
                                </Fragment>
                            )}
                        </div>
                    </section>
                    {resPerPage <= count && (
                        <div className="d-flex justify-content-center mt-5">
                            {/* ... (your pagination code remains unchanged) */}
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Home;
