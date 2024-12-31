import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import { registerUser, loginUser } from '../services/api';
import { jwtDecode } from 'jwt-decode'; 

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            const decoded = jwtDecode(savedToken);
            if (decoded) {
                setUser({
                    id: decoded.userId,
                    email: decoded.email,
                 //   role: decoded.role
                });
                console.log("Restored user from token:", decoded); 
            }
        }
        
        const savedUser = JSON.parse(localStorage.getItem('user'));
        if (savedUser) {
            setUser(savedUser);
        }
        console.log("Restored user from localStorage:", savedUser); 
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginUser({ email, password });
            if (response.data.authToken) {
                const token = response.data.authToken;
                const decodedToken = jwtDecode(token);
                
                const userData = {
                    id: decodedToken.userId,
                    email: decodedToken.email,
                   // role: decodedToken.role
                };

                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);

                alertify.success("Giriş başarılı!");
                navigate("/");
            } else {
                alertify.error("Geçersiz e-posta veya şifre!");
            }
        } catch (error) {
            alertify.error("Geçersiz e-posta veya şifre!");
        }
    };

    const register = async (userDetails) => {
        try {
            const response = await registerUser(userDetails);
            console.log('Register response:', response.data);
            if (response.status === 201) {
                const userData = response.data;
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(userData);
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
        localStorage.removeItem('user');
        alertify.success("Çıkış yapıldı!");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};