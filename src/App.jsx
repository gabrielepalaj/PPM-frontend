import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import {getToken, getUserFromToken, removeToken} from './utils/auth';
import './styles/App.css';
import {ToastContainer} from "react-toastify";
import {checkServerHealth} from "./services/api.js";
import NoConnectionModal from "./components/NoConnectionModal.jsx";
const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!getToken());
    const [user, setUser] = useState(getUserFromToken());
    const [serverStatus, setServerStatus] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = getUserFromToken();
        verifyServerStatus();
        if (!serverStatus){
            navigate('/no-connection');
        }else if (currentUser) {
            setUser(currentUser);
            setIsAuthenticated(true);
            navigate('/dashboard');
        } else if (window.location.pathname !== '/register') {
            navigate('/login');
        }
    }, [isAuthenticated, navigate, serverStatus]);

    const verifyServerStatus = async () => {
        try {
            const response = await checkServerHealth();
            if (response.status === 200) {
                setServerStatus(true);
            } else {
                serverStatus(false);
            }
        } catch (error) {
            setServerStatus(false);
        }
    };

    useEffect(() => {
        let intervalId;
        const timeout = 10000;
            intervalId = setInterval(() => {
                verifyServerStatus();
            }, timeout);
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [serverStatus]);

    const handleLogout = () => {
        removeToken();
        setIsAuthenticated(false);
        setUser(null);
        navigate('/login');
    };

    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginForm setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/register" element={<RegisterForm setIsAuthenticated={setIsAuthenticated}/>}/>
                {user && <Route path="/dashboard" element={<Dashboard user={user} handleLogout={handleLogout}/>}/>}
                <Route path="*" element={<LoginForm setIsAuthenticated={setIsAuthenticated}/>}/>
                <Route path="/no-connection" element={<NoConnectionModal/>}/>
            </Routes>
        </>
    );
};

export default App;
