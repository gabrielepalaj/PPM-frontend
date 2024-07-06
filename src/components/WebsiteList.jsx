import React from 'react';

const WebsiteList = ({ websites }) => {
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
                        <td>{website.interval}</td>
                        <td>
                            <i className="fas fa-edit action-icons"></i>
                            <i className="fas fa-trash-alt action-icons"></i>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WebsiteList;