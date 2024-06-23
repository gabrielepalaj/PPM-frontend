// src/services/api.js

import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const loginUser = (username, password) => {
    return apiClient.post('login', { username, password });
};

export const registerUser = (username, password, email) => {
    return apiClient.post('register', { username, password, email });
};

export const fetchWebsites = () => {
    return apiClient.get('/websites');
};

export const addWebsite = (website) => {
    return apiClient.post('/websites', website);
};

export const fetchChanges = () => {
    return apiClient.get('/changes');
};
