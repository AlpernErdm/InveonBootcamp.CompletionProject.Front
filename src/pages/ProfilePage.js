import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchOrderHistory } from "../services/api";

function ProfilePage() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrderHistory = async () => {
            const response = await fetchOrderHistory(user.id);
            setOrders(response.data);
        };
        if (user) {
            getOrderHistory();
        }
    }, [user]);

    return (
        <div className="container mt-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h1 className="card-title">Profilim</h1>
                    <p className="card-text"><strong>E-posta:</strong> {user.email}</p>
                </div>
            </div>
            <h2>Satın Alınan Kurslar</h2>
            {orders.length === 0 ? (
                <p>Henüz satın alınan kurs yok.</p>
            ) : (
                <ul className="list-group">
                    {orders.map((order, index) => (
                        <li key={index} className="list-group-item">
                            <strong>Sipariş Tarihi:</strong> {new Date(order.createdAt).toLocaleDateString()}
                            <ul className="list-unstyled">
                                {order.courses.map((course) => (
                                    <li key={course.id}>{course.name} - {course.price}₺</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default ProfilePage;