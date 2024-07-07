import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WebsiteList from './WebsiteList';
import { addWebsite, fetchWebsites, editWebsite, deleteWebsite } from '../services/api';
import '../styles/Dashboard.css';
import AddWebsiteModal from './AddWebsiteModal';
import EditWebsiteModal from './EditWebsiteModal';
import Navbar from './Navbar';

const Dashboard = ({ user, handleLogout }) => {
    const [websites, setWebsites] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [selectedWebsite, setSelectedWebsite] = useState(null);

    const getWebsites = async () => {
        try {
            const response = await fetchWebsites();
            setWebsites(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Ottengo i siti web monitorati all'avvio
    useEffect(() => {
        getWebsites();
    }, []);

    // Ogni 10s aggiorno i siti web monitorati
    useEffect(() => {
        const interval = setInterval(() => {
            getWebsites();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const addNewWebsite = async (newWebsite) => {
        try {
            const response = await addWebsite(newWebsite);
            if (response.status === 201) {
                await getWebsites();
                return ['', true];
            }
        } catch (err) {
            return [err.response.data.message, false];
        }
    };

    const handleEditWebsite = async (updatedWebsite) => {
        try {
            const response = await editWebsite(updatedWebsite);
            if (response.status === 200) {
                await getWebsites();
                return ['', true];
            }
        } catch (err) {
            return [err.response.data.message, false];
        }
    };

    const handleDeleteWebsite = async (websiteId) => {
        try {
            const response = await deleteWebsite(websiteId);
            if (response.status === 200) {
                await getWebsites();
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <Navbar user={user} handleLogout={handleLogout} />
            <div className="dashboard-container">
                <div className="filter-column">
                    <h3>Filtri</h3>
                    {/* Inserisci qui i filtri per nome e URL */}
                </div>
                <div className="table-container">
                    <h2>Dashboard</h2>
                    <button onClick={() => setModalShow(true)}>Aggiungi Sito Web</button>
                    <AddWebsiteModal setWebsite={addNewWebsite} show={modalShow} onHide={() => setModalShow(false)} />
                    <div className="website-list-container">
                        <WebsiteList
                            websites={websites}
                            onEdit={(website) => {
                                setSelectedWebsite(website);
                                setEditModalShow(true);
                            }}
                            deleteButton={handleDeleteWebsite}
                        />
                    </div>
                </div>
            </div>
            {selectedWebsite && (
                <EditWebsiteModal
                    website={selectedWebsite}
                    show={editModalShow}
                    onHide={() => setEditModalShow(false)}
                    onSave={handleEditWebsite}
                />
            )}
        </div>
    );
};

Dashboard.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
};

export default Dashboard;
