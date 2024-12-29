import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import alertify from 'alertifyjs';

const PaymentPage = () => {
    const { completePurchase } = useCart();

    const [cardDetails, setCardDetails] = useState({
        number: "",
        name: "",
        expiry: "",
        cvc: "",
    });

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCardDetails({ ...cardDetails, [name]: value });
    };

    const validateCardNumber = (number) => {
        let sum = 0;
        let shouldDouble = false;
        for (let i = number.length - 1; i >= 0; i--) {
            let digit = parseInt(number[i]);
            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }
            sum += digit;
            shouldDouble = !shouldDouble;
        }
        return sum % 10 === 0;
    };

    const validateExpiry = (expiry) => {
        const [month, year] = expiry.split("/")?.map(Number) || [];
        const currentDate = new Date();
        const enteredDate = new Date(`20${year}`, month - 1);
        return month > 0 && month <= 12 && enteredDate >= currentDate;
    };

    const validateCVC = (cvc) => /^\d{3,4}$/.test(cvc);

    const validateForm = () => {
        const newErrors = {};

        // if (!cardDetails.number || !validateCardNumber(cardDetails.number.replace(/\s/g, ""))) {
        //     newErrors.number = "Invalid card number";
        // }
        if (!cardDetails.name) {
            newErrors.name = "Name on card is required";
        }
        if (!cardDetails.expiry || !validateExpiry(cardDetails.expiry)) {
            newErrors.expiry = "Invalid expiry date. Format: MM/YY";
        }
        if (!cardDetails.cvc || !validateCVC(cardDetails.cvc)) {
            newErrors.cvc = "CVC must be 3 or 4 digits";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handlePayment = (e) => {
        e.preventDefault();

        if (validateForm()) {
            completePurchase();
            alertify.success("Payment Successful!");
            navigate("/profile");
        } else {
            alertify.error("Please fix the errors in the form");
        }
    };

    return (
        <div className='container mt-5 d-flex justify-content-center align-items-center'>
            <div className='card shadow-lg p-4' style={{ maxWidth: "500px", width: "100%" }}>
                <h2 className='text-center mb-3'>Ödeme Bilgi Ekranı</h2>
                <form onSubmit={handlePayment}>
                    <div className='mb-3'>
                        <label className='form-label'>Kart Numarası</label>
                        <input
                            type='text'
                            name='number'
                            className={`form-control ${errors.number ? "is-invalid" : ""}`}
                            placeholder='1234 5678 9012 3456'
                            maxLength="19"
                            value={cardDetails.number}
                            onChange={handleInputChange}
                        />
                        {errors.number && <div className='invalid-feedback'>{errors.number}</div>}
                    </div>
                    <div className='mb-3'>
                        <label className='form-label'>Kart Üstünde Yazan İsim</label>
                        <input
                            type='text'
                            name='name'
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            placeholder='Alperen Erdem'
                            value={cardDetails.name}
                            onChange={handleInputChange}
                        />
                        {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                    </div>
                    <div className='row mb-3'>
                        <div className='col-md-6'>
                            <label className='form-label'>Geçerlilik Tarihi</label>
                            <input
                                type='text'
                                name='expiry'
                                className={`form-control ${errors.expiry ? "is-invalid" : ""}`}
                                placeholder='MM/YY'
                                maxLength="5"
                                value={cardDetails.expiry}
                                onChange={handleInputChange}
                            />
                            {errors.expiry && <div className='invalid-feedback'>{errors.expiry}</div>}
                        </div>
                        <div className='col-md-6'>
                            <label className='form-label'>CVC</label>
                            <input
                                type='text'
                                name='cvc'
                                placeholder='123'
                                className={`form-control ${errors.cvc ? "is-invalid" : ""}`}
                                maxLength="4"
                                value={cardDetails.cvc}
                                onChange={handleInputChange}
                            />
                            {errors.cvc && <div className='invalid-feedback'>{errors.cvc}</div>}
                        </div>
                    </div>
                    <button type='submit' className='btn btn-success w-100'>Ödemeyi Gerçekleştir</button>
                </form>

                
            </div>
        </div>
    );
};

export default PaymentPage;