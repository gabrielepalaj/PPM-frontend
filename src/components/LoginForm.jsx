import React, { useState } from 'react';
import {loginUser} from '../services/api';
import { saveToken } from '../utils/auth';
import {Link} from 'react-router-dom';
import '../styles/FormStyles.css';
import PropTypes from 'prop-types';

const LoginForm = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(username, password);
            saveToken(response.data.access_token);
            setIsAuthenticated(true);

        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message);
            } else {
                setError('Unknown error: ' + err.message);
            }
        }
    };

    return (
        <div className="form-container">
            <h2>Login</h2>
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <p>
                Don't have an account? <Link to="/register">Register</Link>
            </p>
        </div>
    );
};


LoginForm.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default LoginForm;
