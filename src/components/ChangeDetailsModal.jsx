import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/ChangeDetailsModal.css';

const ChangeDetailsModal = ({ website, show, onHide, onMarkAsRead }) => {
    const handleMarkAsRead = () => {
        if (website.last_change) {
            onMarkAsRead(website.last_change.id);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>URL: {website.url} </h4>
                <div className="changes-container">
                    {website.last_change && (
                        <div className="change-item">
                            <h4>Last Change</h4>
                            <p>Detected at: {new Date(website.last_change.change_detected_at).toLocaleString()}</p>
                            <img
                                src={`data:image/png;base64,${website.last_change.screenshot}`}
                                alt="Last Change Screenshot"
                                className="change-screenshot"
                            />
                        </div>
                    )}
                    {website.previous_change && (
                        <div className="change-item">
                            <h4>Previous Change</h4>
                            <p>Detected at: {new Date(website.previous_change.change_detected_at).toLocaleString()}</p>
                            <img
                                src={`data:image/png;base64,${website.previous_change.screenshot}`}
                                alt="Previous Change Screenshot"
                                className="change-screenshot"
                            />
                        </div>
                    )}
                </div>
            </Modal.Body>
            <Modal.Footer>
                {website.last_change && !website.last_change.reviewed && (
                    <Button onClick={handleMarkAsRead}>Mark as Read</Button>
                )}
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

ChangeDetailsModal.propTypes = {
    website: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        last_change: PropTypes.shape({
            id: PropTypes.number.isRequired,
            change_detected_at: PropTypes.string.isRequired,
            change_summary: PropTypes.string,
            screenshot: PropTypes.string.isRequired,
            reviewed: PropTypes.bool.isRequired,
        }),
        previous_change: PropTypes.shape({
            id: PropTypes.number.isRequired,
            change_detected_at: PropTypes.string.isRequired,
            change_summary: PropTypes.string,
            screenshot: PropTypes.string.isRequired,
            reviewed: PropTypes.bool.isRequired,
        }),
    }).isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onMarkAsRead: PropTypes.func.isRequired,
};

export default ChangeDetailsModal;