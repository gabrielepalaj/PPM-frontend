import React from 'react';
import WebsiteItem from './WebsiteItem';

const WebsiteList = ({ websites }) => {
    return (
        <div>
            <h3>Monitored Websites</h3>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>URL</th>
                    <th>Interval</th>
                </tr>
                </thead>
                <tbody>
                {websites.map((website) => (
                    <WebsiteItem key={website.id} website={website} />
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default WebsiteList;