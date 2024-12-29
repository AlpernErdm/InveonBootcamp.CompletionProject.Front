import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

function CartPage() {
    const { cart, removeFromCart, getTotal } = useCart();

    return (
        <div className="container mt-4">
            <h1>Sepetim</h1>
            {cart.length === 0 ? (
                <p>Sepetiniz boş.</p>
            ) : (
                <ul className="list-group mb-4">
                    {cart.map(item => (
                        <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                            <div>
                                <h5>{item.name}</h5>
                                <p>{item.price} ₺</p>
                            </div>
                            <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.id)}>Çıkar</button>
                        </li>
                    ))}
                </ul>
    
            )
            }
              <h3>Toplam: {getTotal()} ₺</h3>
            {cart.length > 0 && (
                <Link to="/payment" className="btn btn-primary btn-lg btn-block">Ödeme Yap</Link>
            )}
        </div>
    );
}

export default CartPage;