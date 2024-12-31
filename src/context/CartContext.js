import React, { createContext, useContext, useState } from 'react';
import alertify from 'alertifyjs';
import { useAuth } from './AuthContext';
import { createOrder } from '../services/api'; // sipariş oluşturmak için gerekli fonksiyon

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

    const completePurchase = async () => {
        if (!user || !user.id) {
            alertify.error("Giriş yapmadan satın alım işlemi yapılamaz.");
            return;
        }
        if (cart.length === 0) {
            alertify.error("Sepetiniz boş, satın alım işlemi yapılamaz.");
            return;
        }

        const orderData = {
            userId: user.id,
            orderCourses: cart.map(course => ({ courseId: course.id }))
        };

        try {
            const response = await createOrder(orderData);
            console.log('Created new order:', response.data);
            alertify.success("Satın alma başarıyla tamamlandı!");
            clearCart(); // Sepeti temizle
        } catch (error) {
            console.error('Failed to create order:', error.response || error);
            alertify.error(error.response ? `Error ${error.response.status}: ${error.response.data}` : "Satın alma işlemi yapılırken bir hata oluştu!");
        }
    };

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + item.price, 0); 
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, completePurchase, getTotal }}>
            {children}
        </CartContext.Provider>
    );
};