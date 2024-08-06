import axios from 'axios';
import {getToken, removeToken} from '../utils/auth';

const API_URL = 'http://localhost:5000';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        removeToken();
    }
    return Promise.reject(error);
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
    return apiClient.post('/login', { username, password });
};

export const registerUser = (username, password, email) => {
    return apiClient.post('/register', { username, password, email });
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

export const deleteWebsite = (websiteId) => {
    return apiClient.delete(`/websites/${websiteId}`);
};

export const editWebsite = (website) => {
    return apiClient.put(`/websites/${website.id}`, website);
};

export const markChangeAsRead = (changeId) => {
    return apiClient.post(`/changes/${changeId}/read`);
};

export const checkServerHealth = async () => {
    return apiClient.get('/health', { timeout: 500 });
}