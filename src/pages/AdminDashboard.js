import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { useCourses } from '../context/CourseContext';

const AdminDashboard = () => {
    const { courses, fetchCourses } = useCourses();
    const { addNewCourse, updateExistingCourse, removeCourse } = useAdmin();
    const [courseData, setCourseData] = useState({ name: '', description: '', instructor: '', price: '', category: '', imageUrl: '' });
    const [editCourseId, setEditCourseId] = useState(null);
    const [editCourseData, setEditCourseData] = useState({});

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditCourseData({ ...editCourseData, [name]: value });
    };

    const handleAddCourse = (e) => {
        e.preventDefault();
        addNewCourse(courseData);
    };

    const handleUpdateCourse = (e, id) => {
        e.preventDefault();
        updateExistingCourse(id, editCourseData);
        setEditCourseId(null);  // Kapat
    };

    const handleEditClick = (course) => {
        setEditCourseId(course.id);
        setEditCourseData(course);
    };

    const handleDeleteCourse = (id) => {
        removeCourse(id);
    };

    return (
        <div className="container mt-4">
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleAddCourse}>
                <h2>Kurs Ekle</h2>
                <input type="text" name="name" placeholder="Kurs İsmi" value={courseData.name} onChange={handleInputChange} required />
                <textarea name="description" placeholder="Açıklama" value={courseData.description} onChange={handleInputChange} required></textarea>
                <input type="text" name="instructor" placeholder="Eğitmen" value={courseData.instructor} onChange={handleInputChange} required />
                <input type="text" name="price" placeholder="Fiyat" value={courseData.price} onChange={handleInputChange} required />
                <input type="text" name="category" placeholder="Kategori" value={courseData.category} onChange={handleInputChange} required />
                <input type="text" name="imageUrl" placeholder="Resim URL" value={courseData.imageUrl} onChange={handleInputChange} required />
                <button type="submit">Ekle</button>
            </form>
            
            <h2>Mevcut Kurslar</h2>
            {courses.map(course => (
                <div key={course.id} className="card mb-3">
                    <div className="card-body">
                        {editCourseId === course.id ? (
                            <form onSubmit={(e) => handleUpdateCourse(e, course.id)}>
                                <input type="text" name="name" value={editCourseData.name} onChange={handleEditInputChange} required />
                                <textarea name="description" value={editCourseData.description} onChange={handleEditInputChange} required></textarea>
                                <input type="text" name="instructor" value={editCourseData.instructor} onChange={handleEditInputChange} required />
                                <input type="text" name="price" value={editCourseData.price} onChange={handleEditInputChange} required />
                                <input type="text" name="category" value={editCourseData.category} onChange={handleEditInputChange} required />
                                <input type="text" name="imageUrl" value={editCourseData.imageUrl} onChange={handleEditInputChange} required />
                                <button type="submit">Güncelle</button>
                                <button onClick={() => setEditCourseId(null)}>Vazgeç</button>
                            </form>
                        ) : (
                            <>
                                <h5>{course.name}</h5>
                                <p>{course.description}</p>
                                <p>{course.instructor}</p>
                                <p>{course.price} ₺</p>
                                <p>{course.category}</p>
                                <p>{course.imageUrl}</p>
                                <button onClick={() => handleEditClick(course)}>Düzenle</button>
                                <button onClick={() => handleDeleteCourse(course.id)}>Sil</button>
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminDashboard;