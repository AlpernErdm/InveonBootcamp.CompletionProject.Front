import React, { useEffect, useState } from "react";
import { addCourse, deleteCourse, fetchCourses } from "../services/api";
import alertify from "alertifyjs";
import CircularProgress from '@mui/material/CircularProgress';

const AdminCourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseForm, setCourseForm] = useState({
    id: null,
    name: "",
    description: "",
    instructor: "",
    category: "",
    price: 0,
    rating: 0,
  });

  useEffect(() => {
    const fetchAllCourses = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response.data);
      } catch (error) {
        alertify.error("Kurslar yüklenirken bir hata oluştu!");
      } finally {
        setLoading(false);
      }
    };

    fetchAllCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseForm({ ...courseForm, [name]: value });
  };

  const handleAddCourse = async () => {
    try {
      const newCourse = {
        name: courseForm.name,
        description: courseForm.description,
        instructor: courseForm.instructor,
        category: courseForm.category,
        price: parseFloat(courseForm.price),
        rating: parseFloat(courseForm.rating),
      };
      const response = await addCourse(newCourse);
      setCourses([...courses, response]);
      alertify.success("Kurs başarıyla eklendi!");
      resetForm();  // Formu temizle
    } catch (error) {
      console.log('Error response:', error)
      alertify.error("Kurs eklenirken bir hata oluştu!");
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Bu kursu silmek istediğinize emin misiniz?")) return;
    try {
      await deleteCourse(id);
      setCourses(courses.filter(course => course.id !== id));
      alertify.success("Kurs başarıyla silindi!");
    } catch (error) {
      alertify.error("Kurs silinirken bir hata oluştu!");
    }
  };

  const resetForm = () => {
    setCourseForm({
      id: null,
      name: "",
      description: "",
      instructor: "",
      category: "",
      price: 0,
      rating: 0,
    });
  };

  return (
    <div className="container mt-4">
      <h1>Kurs Yönetimi</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-3">
              <label className="form-label">Kurs Adı</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={courseForm.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Açıklama</label>
              <textarea
                className="form-control"
                name="description"
                value={courseForm.description}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Eğitmen</label>
              <input
                type="text"
                className="form-control"
                name="instructor"
                value={courseForm.instructor}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Kategori</label>
              <input
                type="text"
                className="form-control"
                name="category"
                value={courseForm.category}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fiyat</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={courseForm.price}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Değerlendirme</label>
              <input
                type="number"
                className="form-control"
                name="rating"
                value={courseForm.rating}
                onChange={handleInputChange}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddCourse}
            >
              Ekle
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
              style={{ marginLeft: "10px" }}
            >
              Temizle
            </button>
          </form>
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Kurs Adı</th>
                <th>Eğitmen</th>
                <th>Kategori</th>
                <th>Fiyat</th>
                <th>Değerlendirme</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course.id}>
                  <td>{course.name}</td>
                  <td>{course.instructor}</td>
                  <td>{course.category}</td>
                  <td>{course.price} ₺</td>
                  <td>{course.rating}</td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDeleteCourse(course.id)}>Sil</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminCourseManagement;