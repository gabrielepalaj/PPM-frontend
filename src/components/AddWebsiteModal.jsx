import React, {useState} from 'react';
import {Button, Form, Modal} from 'react-bootstrap';

const AddWebsiteModal = ({show, onHide, setWebsite, onSave}) => {
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [timeInterval, setTimeInterval] = useState('');
    const [error, setError] = useState('');

    const resetAndClose = () => {
        setUrl('');
        setName('');
        setTimeInterval('');
        setError('');
        onHide();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newWebsite = {url, name, timeInterval, selector: ''};
        const [errorMessage, success] = await setWebsite(newWebsite);
        if (!success) {
            console.error(errorMessage);
            setError(errorMessage);
        } else {
            resetAndClose();
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Title>Aggiungi Nuovo Sito Web</Modal.Title>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nome Sito Web</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci il nome del sito" value={name}
                                      onChange={(e) => setName(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>URL Sito Web</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci l'URL del sito" value={url}
                                      onChange={(e) => setUrl(e.target.value)} required/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Intervallo di aggiornamento</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci l'intervallo di aggiornamento"
                                      value={timeInterval} onChange={(e) => setTimeInterval(e.target.value)} required/>
                    </Form.Group>
                </Form>
                {error && <Form.Label >{error}</Form.Label>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Chiudi</Button>
                <Button variant="primary" onClick={handleSubmit}>Salva Sito Web</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddWebsiteModal;