import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    console.log(productKey)
    const [product, setProduct] = useState({})

    useEffect(() => {
        fetch('http://localhost:5000/product/'+ productKey)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])
    return (
        <div>
            <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;