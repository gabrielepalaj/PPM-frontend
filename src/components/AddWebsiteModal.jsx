import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddWebsiteModal = ({ show, onHide }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Aggiungi Nuovo Sito Web</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Nome Sito Web</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci il nome del sito" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>URL Sito Web</Form.Label>
                        <Form.Control type="text" placeholder="Inserisci l'URL del sito" />
                    </Form.Group>
                    {/* Aggiungi altri campi del form se necessario */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Chiudi</Button>
                <Button variant="primary">Salva Sito Web</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddWebsiteModal;