import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function PaymentPage() {
    const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvc: '' });
    const { completePurchase } = useCart();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        completePurchase();
        navigate('/profile');
    };

    return (
        <div className="container mt-4">
            <h1>Ödeme Bilgilerini Girin</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Kart Numarası</label>
                    <input 
                        type="text" 
                        name="number" 
                        className="form-control" 
                        value={cardDetails.number} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Kart Üzerindeki İsim</label>
                    <input 
                        type="text" 
                        name="name" 
                        className="form-control" 
                        value={cardDetails.name} 
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label className="form-label">Son Kullanma Tarihi</label>
                        <input 
                            type="text" 
                            name="expiry" 
                            className="form-control" 
                            value={cardDetails.expiry} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">CVC</label>
                        <input 
                            type="text" 
                            name="cvc" 
                            className="form-control" 
                            value={cardDetails.cvc} 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-success btn-lg btn-block">Ödemeyi Tamamla</button>
            </form>
        </div>
    );
}

export default PaymentPage;