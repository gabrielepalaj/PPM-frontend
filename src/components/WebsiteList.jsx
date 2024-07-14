import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const WebsiteList = ({ websites, onEdit, deleteButton, onRowClick }) => {

    return (
        <div className="website-list-container">
            <h3>Monitored Websites</h3>
            <table className="website-list-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Last Change</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {websites.map((website) => (
                    <tr key={website.id} onClick={() => onRowClick(website)}>
                        <td>{website.name}</td>
                        <td>{website.url}</td>
                        <td>
                            {website.last_change ? (
                                <img src={`data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(website.last_change.screenshot)))}`} alt="Screenshot" style={{ maxWidth: '100px' }} />
                            ) : (
                                'No changes detected'
                            )}
                        </td>
                        <td>
                            <FaEdit className="action-icons" onClick={(e) => { e.stopPropagation(); onEdit(website); }} />
                            <FaTrashAlt className="action-icons" onClick={(e) => { e.stopPropagation(); deleteButton(website.id); }} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

WebsiteList.propTypes = {
    websites: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        last_change: PropTypes.object,
    })).isRequired,
    onEdit: PropTypes.func.isRequired,
    deleteButton: PropTypes.func.isRequired,
    onRowClick: PropTypes.func.isRequired,
};

export default WebsiteList;
