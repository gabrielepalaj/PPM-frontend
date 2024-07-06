import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import { getToken, removeToken, saveToken, getUserFromToken } from './utils/auth';
import './styles/App.css';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    const [user, setUser] = useState(getUserFromToken());
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getUserFromToken();
        if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
            navigate('/dashboard')
        } else if (window.location.pathname !== '/register'){
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleLogout = () => {
        removeToken();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <Routes>
            <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated} />} />
            {user && <Route path="/dashboard" element={<Dashboard user={user} handleLogout={handleLogout} />} />}
            <Route path="*" element={<LoginForm setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
    );
};

export default App;
