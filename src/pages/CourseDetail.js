import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`https://localhost:7189/api/Course/GetCourse/${id}`);
                setCourse(response.data);
            } catch (error) {
                console.error('Failed to fetch course:', error);
            }
        };
        fetchCourse();
    }, [id]);
    
    if (!course) return <div className="text-center mt-5">Yükleniyor...</div>;

    return (
        <div className="container mt-4">
            <h1>{course.name}</h1>
         
            <p>{course.description}</p>
            <p className='card-text'><strong>Eğitmen:</strong> {course.instructor}</p>
            <p className='card-text'><strong>Değerlendirme:</strong> {course.rating}</p>
            <p className='card-text'><strong>Fiyat:</strong> {course.price} ₺</p>
            <p className='card-text'><strong>Kategori:</strong>{course.category}</p>
        </div>
    );
};

export default CourseDetail