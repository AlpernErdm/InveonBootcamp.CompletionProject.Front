import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCourses, fetchCourseById } from "../services/api";
import alertify from "alertifyjs";

const CourseContext = createContext();

export const useCourses = () => useContext(CourseContext);

export const CourseProvider = ({ children }) => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const getCourses = async () => {
            try {
                const response = await fetchCourses();
                setCourses(response.data);
                setLoading(false);
            } catch (error) {
                alertify.error("Kurslar yüklenirken bir hata oluştu!");
            }
        };

        getCourses();
    }, []);
  
    const filterCourses = (searchTerm) => {
        const filtered = courses.filter(course => 
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setCourses(filtered);
    };

    return (
        <CourseContext.Provider value={{ courses, loading, filterCourses }}>
            {children}
        </CourseContext.Provider>
    );
};