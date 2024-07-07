import React, { useState } from 'react';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

const EditWebsiteModal = ({ website, show, onHide, onSave }) => {
    const [url, setUrl] = useState(website.url);
    const [name, setName] = useState(website.name);
    const [timeInterval, setTimeInterval] = useState(website.time_interval);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const resetAndClose = () => {
        setUrl(website.url);
        setName(website.name);
        setTimeInterval(website.time_interval);
        setError('');
        setIsLoading(false);
        onHide();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const timeoutId = setTimeout(() => {
            if (isLoading) {
                setError('Timeout: Impossibile completare la richiesta.');
                setIsLoading(false);
            }
        }, 10000); // Timeout di 10 secondi
        const id = website.id;
        const updatedWebsite = { id, url, name, timeInterval, selector: '' };
        const [errorMessage, success] = await onSave(updatedWebsite);
        clearTimeout(timeoutId); // Cancella il timeout se la richiesta viene completata prima di 10 secondi
        if (!success) {
            console.error(errorMessage);
            setError(errorMessage);
        } else {
            toast.success('Modifiche salvate con successo!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            resetAndClose();
        }
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && (
                <div style={{ position: 'fixed', top: 0, left: 0, height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1060, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner animation="border" variant="light" />
                </div>
            )}
            <Modal show={show} onHide={onHide}>
                <Modal.Title>Modifica Sito Web</Modal.Title>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci il nome del sito" value={name}
                                          onChange={(e) => setName(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>URL</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci l'URL del sito" value={url}
                                          onChange={(e) => setUrl(e.target.value)} required/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Intervallo</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci l'intervallo di aggiornamento"
                                          value={timeInterval} onChange={(e) => setTimeInterval(e.target.value)} required/>
                        </Form.Group>
                        {error && <div className="form-error">{error}</div>}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={resetAndClose}>Chiudi</Button>
                    <Button variant="primary" onClick={handleSubmit}>Salva Modifiche</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
};

EditWebsiteModal.propTypes = {
    website: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        url: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        time_interval: PropTypes.number.isRequired,
    }).isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditWebsiteModal;
