import React from 'react';

const WebsiteItem = ({ website, onEdit, onDelete }) => {
    return (
        <tr>
            <td>{website.name}</td>
            <td>{website.url}</td>
            <td>{website.time_interval} minutes</td>
            <td>{website.last_change}</td>
            <td>{website.previous_change}</td>
            <td>
                <i className="fas fa-edit action-icons" onClick={() => onEdit(website)}></i>
                <i className="fas fa-trash-alt action-icons" onClick={() => onDelete(website.id)}></i>
            </td>
        </tr>
    );
};

export default WebsiteItem;
