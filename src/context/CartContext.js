import React, { createContext, useContext, useState } from 'react';
import alertify from 'alertifyjs';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    const addToCart = (course) => {
        if (!user) {
            alertify.error("Giriş yapmadan sepete ekleme yapamazsınız!");
            return;
        }
        const exists = cart.some(item => item.id === course.id);
        if (!exists) {
            setCart([...cart, course]);
            alertify.success("Kurs sepete eklendi!");
        } else {
            alertify.error("Kurs zaten sepette!");
        }
    };

    const removeFromCart = (courseId) => {
        setCart(cart.filter(item => item.id !== courseId));
        alertify.success("Kurs sepetten çıkarıldı!");
    };

    const clearCart = () => {
        setCart([]);
        alertify.success("Sepetiniz boşaltıldı!");
    };

    const completePurchase = () => {
        if (cart.length === 0) {
            alertify.error("Sepetiniz boş, satın alım işlemi yapılamaz.");
            return;
        }
        clearCart();
        alertify.success("Satın alma başarıyla tamamlandı!");
    };

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + item.price, 0); // Fiyatı toplama ekleyerek toplam tutarı hesapla
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, completePurchase, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};