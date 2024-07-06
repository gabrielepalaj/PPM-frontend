import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard.jsx';
import { getToken, removeToken, saveToken } from './utils/auth';
import './App.css';
import { refreshAccessToken, verifyToken } from './services/api';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    const navigate = useNavigate();

    const checkToken = async () => {
        try {
            await verifyToken();
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Token verification failed:", error);
            // Prova a fare il refresh del token
            try {
                const response = await refreshAccessToken();
                saveToken(response.data.access_token);
                setIsAuthenticated(true);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                removeToken();
                setIsAuthenticated(false);
            }
        }
    };

    useEffect(() => {
        checkToken();
    }, []);

    useEffect(() => {
        if (!isAuthenticated) {
            if (window.location.pathname !== '/register') {
                navigate('/login');
            }
        }else{
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        removeToken();
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <Routes>
            <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/dashboard" element={<Dashboard handleLogout={handleLogout} />} />
            <Route path="*" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
    );
};

export default App;
