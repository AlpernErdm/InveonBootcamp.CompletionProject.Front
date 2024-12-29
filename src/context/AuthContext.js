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
            console.log('Login response:', response.data);
            if (response.data.authenticateResult) {
                setUser({ email: email });
                localStorage.setItem('token', response.data.authToken);
                alertify.success("Giriş başarılı!");
                navigate("/");
            } else {
                alertify.error("Geçersiz e-posta veya şifre!");
            }
        } catch (error) {
            console.log('Login error:', error.response);
            alertify.error("Geçersiz e-posta veya şifre!");
        }
    };

    const register = async (userDetails) => {
        try {
            const response = await registerUser(userDetails);
            console.log('Register response:', response.data);
            if (response.status === 201) {  
                setUser(response.data);
                localStorage.setItem('token', response.data.token || '');
                alertify.success("Kayıt başarılı!");
                navigate("/");
            } else {
                alertify.error("Kayıt sırasında bir hata oluştu!");
            }
        } catch (error) {
            console.log('Register error:', error.response);
            if (error.response && error.response.data && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                for (const [field, errorMessages] of Object.entries(validationErrors)) {
                    errorMessages.forEach(msg => {
                        alertify.error(`${field}: ${msg}`);
                    });
                }
            } else {
                alertify.error("Kayıt sırasında bir hata oluştu!");
            }
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