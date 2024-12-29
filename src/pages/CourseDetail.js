import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../services/api";
import { useCart } from "../context/CartContext";

function CourseDetail() {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        fetchCourseById(id).then((response) => setCourse(response.data));
    }, [id]);

    if (!course) return <div className="text-center mt-5">Yükleniyor...</div>;

    return (
        <div className="container mt-4">
            <div className="card mb-4">
                <div className="card-body">
                    <h1 className="card-title">{course.name}</h1>
                    <p className="card-text">{course.description}</p>
                    <p className="card-text">
                        <strong>Fiyat: {course.price}₺</strong>
                    </p>
                    <button className="btn btn-success" onClick={() => addToCart(course)}>
                        Satın Al
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CourseDetail;