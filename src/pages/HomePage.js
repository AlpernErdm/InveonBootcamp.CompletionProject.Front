import React, { useState } from "react";
import { useCourses } from "../context/CourseContext";
import CourseCard from "../components/CourseCard";

function HomePage() {
    const { courses, loading, filterCourses } = useCourses();
    const [searchTerm, setSearchTerm] = useState("");

    if (loading) {
        return <div className="text-center mt-5">Yükleniyor...</div>;
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        filterCourses(e.target.value);
    };

    return (
        <div className="container mt-4">
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
                {courses.map((course) => (
                    <div className="col-md-4 mb-4" key={course.id}>
                        <CourseCard course={course} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomePage;