// src/components/Navbar.jsx
import React, { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/Navbar.css';
import PropTypes from "prop-types";

const Navbar = ({ user, handleLogout }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <a href="/dashboard" className="navbar-brand">Home</a>
            </div>
            <div className="navbar-right">
                <div className="user-info" onClick={toggleDropdown}>
                    <FaUserCircle size={24} />
                    <span className="username">{user}</span>
                </div>
                {dropdownOpen && (
                    <div className="dropdown-menu">
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )}
            </div>
        </div>
    );
};

Navbar.PropTypes = {
    user: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
};

export default Navbar;
