import React, { createContext, useContext, useState } from "react";
import alertify from "alertifyjs";
import { useAuth } from "./AuthContext";
import { createOrder } from "../services/api";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    const addToCart = (course) => {
        if (!user) {
            alertify.error("Giriş yapmadığınız için kursu sepete ekleyemezsiniz!");
            return;
        }
        const existing = cart.find(item => item.id === course.id);
        if (existing) return;
        setCart([...cart, course]);
        alertify.success("Kurs sepete eklendi!");
    };

    const removeFromCart = (courseId) => {
        setCart(cart.filter(item => item.id !== courseId));
        alertify.success("Kurs sepetten çıkarıldı.");
    };

    const completePurchase = async () => {
        try {
            const orderData = { userId: user.id, courses: cart };
            await createOrder(orderData);
            setCart([]);
            alertify.success("Satın alma başarılı!");
        } catch (error) {
            alertify.error("Satın alma sırasında bir hata oluştu!");
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, completePurchase }}>
            {children}
        </CartContext.Provider>
    );
};