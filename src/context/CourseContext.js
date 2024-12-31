import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCourses } from "../services/api";
import alertify from "alertifyjs";

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [allCourses, setAllCourses] = useState([]); // Orijinal kurs verilerini saklamak için
  
    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetchCourses();
                setCourses(response.data);
                setLoading(false);
                setAllCourses(response.data); // Orijinal verileri de sakla
            } catch (error) {
                alertify.error("Kurslar yüklenirken bir hata oluştu!");
            }
        };

        getCourses();
    }, []);
  
    const filterCourses = (searchTerm) => {
        if (searchTerm.trim() === "") {
            setCourses(allCourses); 
        } else {
            const filteredCourses = allCourses.filter(course =>
                course.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setCourses(filteredCourses);
        }
    };

    return (
        <CourseContext.Provider value={{ courses, loading, filterCourses }}>
            {children}
        </CourseContext.Provider>
    );
};