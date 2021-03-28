import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    // console.log(props.product.key);
    return (
        <div className="product">
            <div className="product-img">
                <img src={props.product.img} alt="" />
            </div>
            <div className="product-details">
                <h4><Link to={"/product/" + props.product.key}>{props.product.name}</Link></h4>
                <p><small>by: {props.product.seller}</small></p>
                <p>${props.product.price}</p>
                <p><small>Only {props.product.stock} left in stock - order soon</small></p>
                { props.showAddToCart && <button className="cart-btn" onClick={() => props.addProducts(props.product)}><FontAwesomeIcon icon={faCartPlus} /> add to cart</button>}
            </div>
        </div>
    );
};

export default Product;