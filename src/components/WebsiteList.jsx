import React from 'react';
import WebsiteItem from './WebsiteItem';

const WebsiteList = ({ websites }) => {
    return (
        <div>
            <h3>Monitored Websites</h3>
            <ul>
                {websites.map((website) => (
                    <WebsiteItem key={website.id} website={website} />
                ))}
            </ul>
        </div>
    );
};

export default WebsiteList;
