import React from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const WebsiteList = ({ websites, onEdit, deleteButton }) => {

    return (
        <div className="website-list-container">
            <h3>Monitored Websites</h3>
            <table className="website-list-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Interval</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {websites.map((website) => (
                    <tr key={website.id}>
                        <td>{website.name}</td>
                        <td>{website.url}</td>
                        <td>{website.time_interval} minutes</td>
                        <td>
                            <FaEdit className="action-icons" onClick={() => onEdit(website)} />
                            <FaTrashAlt className="action-icons" onClick={() => deleteButton(website.id)} />
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
        time_interval: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,
    onEdit: PropTypes.func.isRequired,
    deleteButton: PropTypes.func.isRequired,
};

export default WebsiteList;
