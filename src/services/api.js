import axios from 'axios';

const API_URL = 'https://localhost:7189/api'; // Doğru URL kullandığınızdan emin olun

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Header içerisindeki token eklemsi
  }
  
  console.log('Request config:', config); // Request Gönderiliyor
  
  return config;
}, error => {
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  console.log('Response:', response); // Response Alındı
  return response;
}, error => {
  console.error('Error response:', error); // Hata Ayıklama
  return Promise.reject(error);
});

export const registerUser = (userData) => axiosInstance.post('/User/RegisterUser', userData);
export const loginUser = (userData) => axiosInstance.post('/Auth/LoginUser/LoginUser', userData);
export const fetchCourses = () => axiosInstance.get('/Courses');
export const fetchCourseById = (id) => axiosInstance.get(`/Courses/${id}`);
export const createOrder = (orderData) => axiosInstance.post('/Orders', orderData);
export const fetchOrderHistory = (userId) => axiosInstance.get(`/Orders/history/${userId}`);