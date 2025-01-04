import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CourseProvider } from "./context/CourseContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CourseDetail from "./pages/CourseDetail";
import ProfilePage from "./pages/ProfilePage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PaymentPage from "./pages/PaymentPage";
import NotFoundPage from "./pages/NotFoundPage";
import AdminCourseManagement from "./pages/AdminCourseManagement";

export default function App() {
    return (
        <AuthProvider>
             <Navbar />
            <CourseProvider>
                <CartProvider>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/course/:id" element={<CourseDetail />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/admin/courses" element={<AdminCourseManagement />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </CartProvider>
            </CourseProvider>
            <Footer />
        </AuthProvider>
    );
}