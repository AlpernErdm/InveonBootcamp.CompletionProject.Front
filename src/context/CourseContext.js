import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCourses } from '../services/api';
import alertify from 'alertifyjs';

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allCourses, setAllCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Tüm Kategoriler");

    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetchCourses();
                setCourses(response.data);
                setLoading(false);
                setAllCourses(response.data);
                const uniqueCategories = ["Tüm Kategoriler", ...new Set(response.data.map(course => course.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                alertify.error("Kurslar yüklenirken bir hata oluştu!");
            }
        };

        getCourses();
    }, []);

    const filterCourses = (searchTerm) => {
        if (searchTerm.trim() === "" && selectedCategory === "Tüm Kategoriler") {
            setCourses(allCourses); // Arama terimi boşsa ve tüm kategoriler seçildiyse tüm kursları göster
        } else {
            const filteredCourses = allCourses.filter(course => {
                const matchCategory = selectedCategory === "Tüm Kategoriler" || course.category === selectedCategory;
                const matchTerm = course.name.toLowerCase().includes(searchTerm.toLowerCase());
                return matchCategory && matchTerm;
            });
            setCourses(filteredCourses);
        }
    };

    const filterCoursesByCategory = (category) => {
        setSelectedCategory(category);
        setCourses(allCourses.filter(course => category === "Tüm Kategoriler" || course.category === category));
    };

    return (
        <CourseContext.Provider value={{ courses, loading, filterCourses, filterCoursesByCategory, categories, selectedCategory }}>
            {children}
        </CourseContext.Provider>
    );
};