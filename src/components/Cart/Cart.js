import React from 'react';

const Cart = (props) => {
    const cart = props.cart;

//    const total = cart.reduce((total, product) => total + product.price, 0);

let total = 0;
// const totalPrice = parseFloat(total);
 for (let i = 0; i < cart.length; i++) {
     const product = cart[i];
     total = total + product.price;
 }

 let shipping = 0;
 if (total > 35){
     shipping = 0;
 }
 else if (total > 15){
     shipping = 4.99;
 }

    return (
        <div>
            <h3>Order Summary</h3>
            <p>Items ordered: {cart.length}</p>
            <p><small>Shipping & Handling: {shipping}</small></p>
            <p>Tota price: {total + shipping}</p>
        </div>
    );
};

export default Cart;