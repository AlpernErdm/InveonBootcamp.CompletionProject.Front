import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { registerUser, loginUser } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await loginUser({ email, password });
            console.log('Login response:', response.data); // Gelen yanıtı kontrol edelim
            
            if (response.data.authenticateResult) {
                setUser({ email: email }); // Sadece email almak bu noktada yeterli
                localStorage.setItem('token', response.data.authToken); // JWT token'ı saklanması
                alertify.success("Giriş başarılı!");
                navigate("/");
            } else {
                alertify.error("Geçersiz e-posta veya şifre!");
            }
        } catch (error) {
            console.log('Login error:', error.response); // Hata mesajını kontrol edelim
            alertify.error("Geçersiz e-posta veya şifre!");
        }
    };

    const register = async (userDetails) => {
        try {
            const response = await registerUser(userDetails); // Tüm kullanıcı bilgilerini gönder
            console.log('Register response:', response.data);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token); // JWT token'ı sakla
            alertify.success("Kayıt başarılı!");
            navigate("/");
        } catch (error) {
            console.log('Register error:', error.response); // Hata mesajını kontrol edelim
            alertify.error("Kayıt sırasında bir hata oluştu!");
        }
    };
    

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        alertify.success("Çıkış yapıldı!");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};