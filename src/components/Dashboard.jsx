import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import WebsiteList from './WebsiteList';
import {addWebsite, deleteWebsite, editWebsite, fetchWebsites, markChangeAsRead} from '../services/api';
import '../styles/Dashboard.css';
import AddWebsiteModal from './AddWebsiteModal';
import EditWebsiteModal from './EditWebsiteModal';
import ChangeDetailsModal from './ChangeDetailsModal';
import Navbar from './Navbar';

const Dashboard = ({user, handleLogout}) => {
    const [websites, setWebsites] = useState([]);
    const [visibleModal, setVisibleModal] = useState(null); // 'add', 'edit', 'change', or null
    const [selectedWebsite, setSelectedWebsite] = useState(null);

    const getWebsites = async () => {
        try {
            const response = await fetchWebsites();
            if (response.status === 200) {
                setWebsites(response.data);
            }
        } catch (err) {
            console.error(err);
            if (err.response.status === 401) {
                handleLogout();
            }
        }
    };

    useEffect(() => {
        getWebsites();
    }, []);

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

    const handleMarkChangeAsRead = async (changeId) => {
        try {
            const response = await markChangeAsRead(changeId);
            if (response.status === 200) {
                await getWebsites();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleRowClick = (website) => {
        setSelectedWebsite(website);
        setVisibleModal('change');
    };

    return (
        <div>
            <Navbar user={user} handleLogout={handleLogout}/>
            <div className="dashboard-container">
                <div className="filter-column">
                    <h3>Filtri</h3>
                </div>
                <div className="table-container">
                    <h2>Dashboard</h2>
                    <button onClick={() => setVisibleModal('add')}>Aggiungi Sito Web</button>
                    <AddWebsiteModal setWebsite={addNewWebsite} show={visibleModal === 'add'} onHide={() => setVisibleModal(null)}/>
                    <div className="website-list-container">
                        <WebsiteList
                            websites={websites}
                            onEdit={(website) => {
                                setSelectedWebsite(website);
                                setVisibleModal('edit');
                            }}
                            onRowClick={handleRowClick}
                            deleteButton={handleDeleteWebsite}
                        />
                    </div>
                </div>
            </div>
            {selectedWebsite && visibleModal === 'edit' && (
                <EditWebsiteModal
                    website={selectedWebsite}
                    show={visibleModal === 'edit'}
                    onHide={() => setVisibleModal(null)}
                    onSave={handleEditWebsite}
                />
            )}
            {selectedWebsite && visibleModal === 'change' && (
                <ChangeDetailsModal
                    website={selectedWebsite}
                    show={visibleModal === 'change'}
                    onHide={() => setVisibleModal(null)}
                    onMarkAsRead={handleMarkChangeAsRead}
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
