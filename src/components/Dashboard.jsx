import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WebsiteList from './WebsiteList';
import AddWebsiteForm from './AddWebsiteForm';
import { fetchWebsites } from '../services/api';

const Dashboard = ({ handleLogout }) => {
    const [websites, setWebsites] = useState([]);

    const getWebsites = async () => {
        try {
            const response = await fetchWebsites();
            console.log('Received websites:', response.data);
            setWebsites(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getWebsites();

        const intervalId = setInterval(getWebsites, 5000); // 5 s

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
            <AddWebsiteForm setWebsites={setWebsites} getWebsites={getWebsites} />
            <WebsiteList websites={websites} />
        </div>
    );
};

Dashboard.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};

export default Dashboard;