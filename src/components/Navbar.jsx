import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar 
        position="sticky" 
        sx={{ backgroundColor: '#333', top: 0, left: 0, width: '100%' }}
    >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
            <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}
            >
                Kurs Satış Sitesi
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button component={Link} to="/" sx={{ color: 'white' }}>
                    Ana Sayfa
                </Button>
                {user ? (
                    <>
                        <Button component={Link} to="/profile" sx={{ color: 'white' }}>
                            Profilim
                        </Button>
                        <Button component={Link} to="/cart" sx={{ color: 'white' }}>
                            Sepetim
                        </Button>
                        <Button sx={{ color: 'white' }} onClick={logout}>
                            Çıkış Yap
                        </Button>
                    </>
                ) : (
                    <>
                        <Button component={Link} to="/login" sx={{ color: 'white' }}>
                            Giriş Yap
                        </Button>
                        <Button component={Link} to="/register" sx={{ color: 'white' }}>
                            Kayıt Ol
                        </Button>
                    </>
                )}
            </Box>
        </Toolbar>
    </AppBar>
    
    );
};

export default Navbar;