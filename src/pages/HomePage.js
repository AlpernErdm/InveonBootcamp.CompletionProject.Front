import React, { useState, useEffect } from 'react';
import { useCourses } from '../context/CourseContext';
import CourseCard from '../components/CourseCard';
import Pagination from '../components/Pagination';
import CategoryMenu from '../components/CategoryMenu';

const ITEMS_PER_PAGE = 6; 

function HomePage() {
    const { courses, loading, filterCourses, filterCoursesByCategory, categories, selectedCategory } = useCourses();
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        filterCourses(searchTerm);
    }, [searchTerm, filterCourses, currentPage]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Yükleniyor...</span>
                </div>
            </div>
        );
    }

    const totalPages = Math.ceil(courses.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentCourses = courses.slice(startIndex, endIndex);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); 
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCategorySelect = (category) => {
        filterCoursesByCategory(category);
        setSearchTerm("");     
        setCurrentPage(1); 
    };

    return (
        <div className="container mt-4">
            <CategoryMenu 
                categories={categories} 
                selectedCategory={selectedCategory} 
                onCategorySelect={handleCategorySelect} 
            />
            <h1 className="text-center mb-4">Tüm Kurslar</h1>
            <div className="row mb-4">
                <div className="col-md-6 offset-md-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Kurs Ara..." 
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="row">
                {currentCourses.map(course => (
                    <div className="col-md-4 mb-4" key={course.id}>
                        <CourseCard course={course} />
                    </div>
                ))}
            </div>
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default HomePage;