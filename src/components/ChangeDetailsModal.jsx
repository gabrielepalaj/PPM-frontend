import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ChangeDetailsModal = ({ website, show, onHide, onMarkAsRead }) => {
    const handleMarkAsRead = () => {
        if (website.last_change) {
            onMarkAsRead(website.last_change.id);
        }
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
                <h4>URL</h4>
                <p>{website.url}</p>
                {website.last_change && (
                    <>
                        <h4>Last Change</h4>
                        <img src={`data:image/png;base64,${website.last_change.screenshot}`} alt="Screenshot" style={{ width: '300px' }} />
                        {website.previous_change && (
                            <>
                                <h4>Previous Change</h4>
                                <img src={`data:image/png;base64,${website.previous_change.screenshot}`} alt="Screenshot" style={{ width: '300px' }} />
                                <h4>Differences</h4>
                                <img src={`data:image/png;base64,${website.differences.diff_image}`} alt="Differences" style={{ width: '300px' }} />
                            </>
                        )}
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleMarkAsRead}>Mark as Read</Button>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
};

ChangeDetailsModal.propTypes = {
    website: PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        last_change: PropTypes.object,
        previous_change: PropTypes.object,
        differences: PropTypes.object,
    }).isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func.isRequired,
    onMarkAsRead: PropTypes.func.isRequired,
};

export default ChangeDetailsModal;
