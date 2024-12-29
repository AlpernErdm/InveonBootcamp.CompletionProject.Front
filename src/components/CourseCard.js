import React from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <p className="card-text">{course.price} ₺</p>
                <Link to={`/course/${course.id}`} className="btn btn-primary">Detaylar</Link>
            </div>
        </div>
    );
};

export default CourseCard;