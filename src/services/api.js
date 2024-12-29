import axios from 'axios';

// Backend API URL'nizi buraya yerleştirin
const API_URL = 'https://localhost:7189';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const registerUser = (userDetails) => axiosInstance.post('/api/User/RegisterUser', userDetails); // Register endpoint'ini kontrol edin
export const loginUser = (userData) => axiosInstance.post('/api/Auth/LoginUser/LoginUser', userData);
export const fetchCourses = () => axiosInstance.get('api/Course/GetCourses'); 
export const fetchCourseById = (id) => axiosInstance.get(`api/Course/GetCourses/${id}`);
export const createOrder = (orderData) => axiosInstance.post('api/Orders', orderData);
export const fetchOrderHistory = (userId) => axiosInstance.get(`api/Orders/${userId}`);