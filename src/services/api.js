import axios from 'axios';
import {getToken, removeToken, saveToken} from '../utils/auth';

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

apiClient.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
            const response = await refreshAccessToken();
            const newToken = response.data.access_token;
            saveToken(newToken);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            return apiClient(originalRequest);
        } catch (refreshError) {
            removeToken();
            return Promise.reject(refreshError);
        }
    }
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

export const refreshAccessToken = () => {
    return axios.post(`${API_URL}/refresh`, {}, {
        headers: {
            'Authorization': `Bearer ${getToken()}`
        }
    });
};

export const verifyToken = () => {
    return apiClient.post('/verify');
};
