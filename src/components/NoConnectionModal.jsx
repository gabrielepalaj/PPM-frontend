import {Link} from "react-router-dom";
import React from "react";
import '../styles/FormStyles.css';


const NoConnectionModal = () => {
    return (
        <div className="form-container">
            <h2>No connection</h2>
            <p>
                Wait, the server is not responding. Please try again later.
            </p>
        </div>
    );
}

export default NoConnectionModal;