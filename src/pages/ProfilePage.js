import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { fetchOrderHistory, getOrderById, updateUser, fetchUserByEmail, deleteUser } from "../services/api";
import alertify from "alertifyjs";
import '../index.css'; 
import CircularProgress from '@mui/material/CircularProgress';

function ProfilePage() {
  const { user, setUser, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editMode, setEditMode] = useState(false); 
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      if (user && user.email) {
        try {
          const response = await fetchUserByEmail(user.email);
          const userData = response.data;
          console.log('Fetched user data:', userData);
          setUserData({
            username: userData.username || '',
            email: userData.email || '',
            phoneNumber: userData.phoneNumber || '',
            password: '' 
          });
        } catch (error) {
          console.error('Failed to fetch user data:', error.response || error);
          alertify.error(error.response ? `Error ${error.response.status}: ${error.response.data}` : "Kullanıcı bilgileri getirilirken bir hata oluştu!");
        } finally {
          setLoading(false);
        }
      }
    };

    const getOrderHistory = async () => {
      setOrderLoading(true);
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
      } finally {
        setOrderLoading(false);
      }
    };

    fetchUserData();
    if (user) {
      getOrderHistory();
    }   
  }, [user]);

  const fetchOrderDetails = async (orderId) => {
    setOrderLoading(true);
    try {
      const response = await getOrderById(orderId);
      console.log('Fetched order details:', response.data);
      setSelectedOrder(response.data);
    } catch (error) {
      console.error('Failed to fetch order details:', error.response || error);
      alertify.error(error.response ? `Error ${error.response.status}: ${error.response.data}` : "Sipariş detayı getirilirken bir hata oluştu!");
    } finally {
      setOrderLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!user || !user.id) {
      alertify.error("Kullanıcı ID'si bulunamadı.");
      setLoading(false);
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
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (window.confirm("Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz!")) {
      try {
        await deleteUser(user.id);
        alertify.success("Hesap başarıyla silindi!");
        logout(); // Log out user after account deletion
      } catch (error) {
        console.error('Failed to delete user:', error.response || error);
        alertify.error(error.response ? `Error ${error.response.status}: ${error.response.data}` : "Kullanıcı silinirken bir hata oluştu!");
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="card mb-4 profile-card">
        <div className="card-body">
          <h1 className="card-title">Profilim</h1>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
              <CircularProgress />
            </div>
          ) : editMode ? (
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
              <button className="btn btn-dark me-2" onClick={() => setEditMode(true)}>Bilgileri Güncelle</button>
              <button className="btn btn-danger" onClick={handleDeleteUser}>Hesabı Sil</button>
            </>
          )}
        </div>
      </div>
      <div className="purchase-history">
        <h2>Satın Alınan Kurslar</h2>
        {orderLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            {orders.length === 0 ? (
              <p>Henüz satın alınan kurs yok.</p>
            ) : (
              <ul className="list-group">
                {orders.map((order) => (
                  <li key={order.id} className="list-group-item">
                    <div>
                      <strong>Sipariş Tarihi:</strong> {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                    <button className="btn btn-dark me-2" onClick={() => fetchOrderDetails(order.id)}>Detaylar</button>
                    {selectedOrder && selectedOrder.id === order.id && (
                      <ul className="list-unstyled mt-2">
                        {selectedOrder.orderCourses.map((course) => (
                          <li key={course.courseId}>{course.course.name} - {course.course.price} ₺</li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;