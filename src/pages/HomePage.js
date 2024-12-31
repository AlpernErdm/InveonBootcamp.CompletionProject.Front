// HomePage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCourses } from "../services/api";
import { useCart } from "../context/CartContext"; 
import '../index.css';  

function HomePage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();  
  
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  const [currentPage, setCurrentPage] = useState(1); 
  const coursesPerPage = 6;  

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await fetchCourses();
        const coursesData = response.data;

        setCourses(coursesData);
        setFilteredCourses(coursesData);

       
        const allCategories = coursesData.map(course => course.category);
        setCategories([...new Set(allCategories)]); 
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    getCourses();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);  // Sayfa numarasını sıfırla
    filterCourses(category, searchTerm);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setCurrentPage(1);  // Sayfa numarasını sıfırla
    filterCourses(selectedCategory, value);
  };

  const filterCourses = (category, searchTerm) => {
    const filteredByCategory = category === "" ? courses : courses.filter(course => course.category === category);
    const finalFilteredCourses = searchTerm === "" ? filteredByCategory : filteredByCategory.filter(course => course.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredCourses(finalFilteredCourses);
  }

  const handleDetails = (courseId) => {
    navigate(`/course/${courseId}`);
  };

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
       <h1 className="page-title"><strong>Tüm Kurslar</strong></h1>
      <input 
        type="text" 
        placeholder="Kurs Ara..." 
        className="form-control mb-3"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="mb-3">
        {categories.map(category => (
          <button 
            key={category} 
            className={`btn btn-${selectedCategory === category ? "primary" : "secondary"} me-2`} 
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
        <button 
          className={`btn btn-${selectedCategory === "" ? "primary" : "secondary"}`} 
          onClick={() => handleCategoryChange("")}
        >
          Hepsi
        </button>
      </div>
      {currentCourses.length === 0 ? (
        <p>Kurs bulunamadı.</p>
      ) : (
      <div className="row">
        {currentCourses.map(course => (
          <div key={course.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text"><strong>Kategori:</strong> {course.category}</p>
                <p className="card-text"><strong>Price:</strong> {course.price} ₺</p>
                <p className="card-text"><strong>Eğitmen:</strong> {course.instructor}</p>
                <p className="card-text"><strong>Değerlendirme:</strong> {course.rating}</p>
                <button className="btn btn-primary" onClick={() => handleDetails(course.id)}>Detaylar</button>
                <button className="btn btn-success ms-2" onClick={() => addToCart(course)}>Sepete Ekle</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
      {filteredCourses.length > coursesPerPage && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

export default HomePage;