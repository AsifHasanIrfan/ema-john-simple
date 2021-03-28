import React, { useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import orderPlaceImg from '../../images/giphy.gif'
import { useHistory } from 'react-router';



const Review = () => {
    const [cart, setCart] = useState([])

    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory()

    const handleProceedCheckout = () => {
        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd  => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey)
    }

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart)

        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    },[])
    let thankYou;
    if(orderPlaced) {
        thankYou  = <img src={orderPlaceImg} alt=""/>
    }
    return (
        <div className="shop-container">
            <div className="products-container">
                {
                    cart.map(pd => <ReviewItem removeProduct={removeProduct} key={pd.key} pd={pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>

            <div className="cart-container">
                <Cart cart= {cart}>
                <button onClick={handleProceedCheckout} className="cart-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;