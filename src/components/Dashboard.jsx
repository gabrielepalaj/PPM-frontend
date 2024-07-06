import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import WebsiteList from './WebsiteList';
import AddWebsiteForm from './AddWebsiteForm';
import { fetchWebsites } from '../services/api';
import '../Dashboard.css';
import AddWebsiteModal from './AddWebsiteModal';

const Dashboard = ({ handleLogout }) => {
    const [websites, setWebsites] = useState([]);
    const [modalShow, setModalShow] = useState(false);


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

    const handleSaveWebsite = async (website) => {
        try {
            await addWebsite(website); // Assicurati che `addWebsite` sia implementato in `services/api.js`
            setModalShow(false);
            getWebsites(); // Ricarica la lista dei siti web
        } catch (error) {
            console.error("Errore nell'aggiunta del sito web", error);
        }
    };

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <button onClick={() => setModalShow(true)}>Aggiungi Sito Web</button>
            <AddWebsiteModal show={modalShow} onHide={() => setModalShow(false)} onSave={handleSaveWebsite}/>
            <div className="table-container">
            <h3>Filtri</h3>
                {/* Inserisci qui la tabella dei filtri */}
            </div>
            <div className="table-container">
                <h3>Siti Web Monitorati</h3>
                <WebsiteList websites={websites} />
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    handleLogout: PropTypes.func.isRequired,
};

export default Dashboard;