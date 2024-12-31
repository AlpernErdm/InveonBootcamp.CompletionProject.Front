import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchOrderHistory, getOrderById, updateUser, fetchUserByEmail } from "../services/api";
import alertify from "alertifyjs";

function ProfilePage() {
  const { user, setUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false); 
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    role: '',
    password: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.email) {
        try {
          const response = await fetchUserByEmail(user.email);
          const userData = response.data;
          console.log('Fetched user data:', userData);
          setUserData({
            username: userData.username || '',
            email: userData.email || '',
            phoneNumber: userData.phoneNumber || '',
            role: userData.role || '',
            password: '' 
          });
        } catch (error) {
          console.error('Failed to fetch user data:', error.response || error);
          alertify.error(error.response ? `Error ${error.response.status}: ${error.response.data}` : "Kullanıcı bilgileri getirilirken bir hata oluştu!");
        }
      }
    };

    const getOrderHistory = async () => {
      if (!user || !user.email) {
        alertify.error("Kullanıcı e-postası bulunamadı.");
        return;
      }
      try {
        const response = await fetchOrderHistory(user.email);
        const ordersData = Array.isArray(response.data) ? response.data : [];
        setOrders(ordersData);
        console.log("Sipariş Geçmişi:", ordersData);
      } catch (error) {
        console.error('Failed to fetch order history:', error.response || error);
        alertify.error(error.response ? `Error ${error.response.status}: ${error.response.data}` : "Sipariş geçmişi getirilirken bir hata oluştu!");
      }
    };

    fetchUserData();
    if (user) {
      getOrderHistory();
    }   
  }, [user]);

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await getOrderById(orderId);
      console.log('Fetched order details:', response.data);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Failed to fetch order details:', error.response || error);
      alertify.error(error.response ? `Error ${error.response.status}: ${error.response.data}` : "Sipariş detayı getirilirken bir hata oluştu!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alertify.error("Kullanıcı ID'si bulunamadı.");
      return;
    }
    try {
      const response = await updateUser(user.id, userData);
      console.log('Updated user data:', response.data);
      setUser(response.data);
      alertify.success("Kullanıcı bilgileri güncellendi.");
      setEditMode(false);
    } catch (error) {
      console.error('Failed to update user:', error.response || error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;
        for (const key in errors) {
          alertify.error(`${key}: ${errors[key].join(', ')}`);
        }
      } else {
        alertify.error("Kullanıcı bilgileri güncellenirken bir hata oluştu!");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mb-4">
        <div className="card-body">
          <h1 className="card-title">Profilim</h1>
          {editMode ? (
            <form onSubmit={handleUpdateUser}>
              <div className="mb-3">
                <label className="form-label">Kullanıcı Adı</label>
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  value={userData.username}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">E-posta</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={userData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Telefon Numarası</label>
                <input
                  type="text"
                  name="phoneNumber"
                  className="form-control"
                  value={userData.phoneNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <input
                  type="text"
                  name="role"
                  className="form-control"
                  value={userData.role}
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Şifre</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  value={userData.password}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">Güncelle</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditMode(false)}>Vazgeç</button>
            </form>
          ) : (
            <>
              <p className="card-text"><strong>Kullanıcı Adı:</strong> {userData.username}</p>
              <p className="card-text"><strong>E-posta:</strong> {userData.email}</p>
              <p className="card-text"><strong>Telefon Numarası:</strong> {userData.phoneNumber}</p>
              <p className="card-text"><strong>Rol:</strong> {userData.role}</p>
              <button className="btn btn-primary" onClick={() => setEditMode(true)}>Bilgileri Güncelle</button>
            </>
          )}
        </div>
      </div>
      <h2>Satın Alınan Kurslar</h2>
      {orders.length === 0 ? (
        <p>Henüz satın alınan kurs yok.</p>
      ) : (
        <ul className="list-group">
          {orders.map((order) => (
            <li key={order.id} className="list-group-item">
              <strong>Sipariş Tarihi:</strong> {new Date(order.orderDate).toLocaleDateString()}
              <button onClick={() => fetchOrderDetails(order.id)}>Detaylar</button>
              {selectedOrder && selectedOrder.id === order.id && (
                <ul className="list-unstyled">
                  {selectedOrder.orderCourses.map((course) => (
                    <li key={course.courseId}>{course.course.name} - {course.course.price} ₺</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProfilePage;