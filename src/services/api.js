import axios from 'axios';

const API_URL = 'https://localhost:7189/api'; 

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; 
  }
  
  console.log('Request config:', config); 
  
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  console.log('Response:', response); 
  return response;
}, error => {
  console.error('Error response:', error); 
  return Promise.reject(error);
});

export const registerUser = (userData) => axiosInstance.post('/User/RegisterUser', userData);
export const loginUser = (userData) => axiosInstance.post('/Auth/LoginUser/LoginUser', userData);
export const fetchCourses = () => axiosInstance.get('/Course/GetCourses');
export const fetchCourseById = (id) => axiosInstance.get(`/Course/GetCourse/${id}`);
export const createOrder = (orderData) => axiosInstance.post('/Orders', orderData);
export const fetchOrderHistory = (userId) => axiosInstance.get(`/User/GetUser/${userId}`);
export const addCourse = (courseData) => axiosInstance.post('/Course/Create', courseData);
export const updateCourse = (id, updatedData) => axiosInstance.put(`/Course/UpdateCourse/${id}`, updatedData);
export const deleteCourse = (id) => axiosInstance.delete(`/Course/DeleteCourse/${id}`);