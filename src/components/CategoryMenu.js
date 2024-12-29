import React from 'react';
import PropTypes from 'prop-types';

const CategoryMenu = ({ categories, selectedCategory, onCategorySelect }) => {
    if (!categories) {
        return null; // Kategoriler yüklenene kadar boş dön.
    }
    
    return (
        <div className="category-menu">
            <ul className="nav nav-pills">
                {categories.map(category => (
                    <li className="nav-item" key={category}>
                        <button 
                            className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                            onClick={() => onCategorySelect(category)}
                        >
                            {category}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

CategoryMenu.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onCategorySelect: PropTypes.func.isRequired,
};

export default CategoryMenu;