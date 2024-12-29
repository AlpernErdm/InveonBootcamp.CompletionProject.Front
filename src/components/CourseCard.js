import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { truncateText } from '../utils/helpers'; // Kısaltma fonksiyonu

const CourseCard = ({ course }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/course/${course.id}`);
    };

    return (
        <div className="card" onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{truncateText(course.description, 100)}</p>
                <p className="card-text">{course.price} ₺</p>
                <div className="d-flex justify-content-between">
                    <Link to={`/course/${course.id}`} className="btn btn-secondary">
                        Detaylar
                    </Link>
                    <button
                        className="btn btn-primary"
                        onClick={(e) => {
                            e.stopPropagation();  // Kartan sepete ekleme butonu tıklama olayını yaymayı durdur
                            addToCart(course);
                        }}
                    >
                        Sepete Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

CourseCard.propTypes = {
    course: PropTypes.object.isRequired,
};

export default CourseCard;