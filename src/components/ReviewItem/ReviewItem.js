import React from 'react';

const ReviewItem = (props) => {
    const removeProduct = props.removeProduct
    const {name, quantity, key, price} = props.pd;
    const itemStyle = {
        borderBottom:'1px solid lightgray', padding:'10px',
        width:'60%',
        marginLeft: '100px'
    }
    return (
        <div style={itemStyle} className="item-details">
            <h3 style={{color:'blue'}}>{name}</h3>
            <p>quantity: {quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <button className="cart-btn" onClick={() => removeProduct(key) }>Remove</button>
        </div>
    );
};

export default ReviewItem;