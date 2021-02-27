import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './product.css';

const Product = (props) => {
    return (
        <div className="product">
            <div className="product-img">
                <img src={props.product.img} alt="" />
            </div>
            <div className="product-details">
                <h4>{props.product.name}</h4>
                <p><small>by: {props.product.seller}</small></p>
                <p>${props.product.price}</p>
                <p><small>Only {props.product.stock} left in stock - order soon</small></p>
                <button className="cart-btn" onClick={() => props.addProducts(props.product)}><FontAwesomeIcon icon={faCartPlus} /> add to cart</button>
            </div>
        </div>
    );
};

export default Product;