import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard.jsx';
import { getToken, removeToken } from './utils/auth';
import './App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        } else if (!isAuthenticated && window.location.pathname !== '/register') {
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        removeToken();
        setIsAuthenticated(false);
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
