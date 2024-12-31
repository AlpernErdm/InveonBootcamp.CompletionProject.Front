import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../Navbar.css';
import teachHubLogo from '../styles/Teach_Hub_logo.png'; // Logoyu import edin

function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
      <img src={teachHubLogo} alt="TeachHub Logo" className="footer-logo me-3" /> {}
        <Link className="navbar-brand" to="/"><strong>TeachHub</strong></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="btn btn-dark me-2" to="/"><strong>Ana Sayfa</strong></Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="btn btn-dark me-2" to="/profile"><strong>Profilim</strong></Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-dark me-2" to="/cart"><strong>Sepetim</strong></Link>
                </li>
                <li className="nav-item">
                  <button className="btn btn-dark" onClick={handleLogout}><strong>Çıkış Yap</strong></button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-dark me-2" to="/login"><strong>Giriş Yap</strong></Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-dark" to="/register"><strong>Kayıt Ol</strong></Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;