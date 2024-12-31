import React from 'react';

function NotFoundPage() {
    return (
        <div style={styles.container}>
            <div style={styles.content}>
                <h1 style={styles.title}>404</h1>
                <p style={styles.message}>Üzgünüz, aradığınız sayfa bulunamadı.</p>
                <button 
                    style={styles.button} 
                    onClick={() => window.history.back()}
                >
                    Ana Sayfaya Dön
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6E7CFD, #8AC6FD)',
        color: '#fff',
        fontFamily: 'Arial, sans-serif',
    },
    content: {
        textAlign: 'center',
        padding: '20px',
        borderRadius: '8px',
        background: 'rgba(0, 0, 0, 0.3)',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
    },
    title: {
        fontSize: '6rem',
        margin: 0,
    },
    message: {
        fontSize: '1.5rem',
        marginBottom: '20px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        color: '#6E7CFD',
        background: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        boxShadow: '0 4px 10px rgba(255, 255, 255, 0.2)',
        transition: 'background 0.3s, color 0.3s',
    },
};

export default NotFoundPage;
