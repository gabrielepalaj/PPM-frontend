import React, { useState } from 'react';
import { registerUser } from '../services/api';
import {saveToken} from "../utils/auth.js";
import '../styles/FormStyles.css';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';

const RegisterForm = ({ setIsAuthenticated }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser(username, password, email);
            if (response.status === 201) {
                saveToken(response.data.access_token);
                setIsAuthenticated(true);
            }
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
            <h2>Register</h2>
            {error && <p className="form-error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <button type="submit">Register</button>
                <p>
                    Have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};


RegisterForm.propTypes = {
    setIsAuthenticated: PropTypes.func.isRequired,
};

export default RegisterForm;
