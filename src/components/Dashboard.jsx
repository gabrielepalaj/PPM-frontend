import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import WebsiteList from './WebsiteList';
import {addWebsite, fetchWebsites} from '../services/api';
import '../styles/Dashboard.css';
import AddWebsiteModal from './AddWebsiteModal';
import Navbar from './Navbar';

const Dashboard = ({user, handleLogout}) => {
    const [websites, setWebsites] = useState([]);
    const [modalShow, setModalShow] = useState(false);

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

    // Ogni 1s aggiorno i siti web monitorati
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
                return ['',true];
            }
        } catch (err) {
            return [err.response.data.message, false];
        }
    }

    return (
        <div>
            <Navbar user={user} handleLogout={handleLogout}/>
            <div className="dashboard-container">
                <h2>Dashboard</h2>
                <button onClick={() => setModalShow(true)}>Aggiungi Sito Web</button>
                <AddWebsiteModal setWebsite={addNewWebsite} show={modalShow} onHide={() => setModalShow(false)}/>
                <div className="table-container">
                    <h3>Filtri</h3>
                    {/* Inserisci qui la tabella dei filtri */}
                </div>
                <div className="table-container">
                    <h3>Siti Web Monitorati</h3>
                    <WebsiteList websites={websites}/>
                </div>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    handleLogout: PropTypes.func.isRequired,
    user: PropTypes.string.isRequired,
};

export default Dashboard;
