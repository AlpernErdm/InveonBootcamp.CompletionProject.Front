import React from 'react';

const Footer = () => {
    return (
        <footer style={{ textAlign: 'center', padding: '1rem 0', backgroundColor: '#333', color: 'white' }}>
            <p>&copy; {new Date().getFullYear()} © 2024 Pudemy, Inc. . Tüm hakları saklıdır.</p>
        </footer>
    );
};

export default Footer;