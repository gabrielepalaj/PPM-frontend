import React from 'react';

const WebsiteItem = ({ website }) => {
    return (
        <li>
            <p>{website.name}</p>
            <p>{website.url}</p>
            <p>Interval: {website.time_interval} minutes</p>
        </li>
    );
};

export default WebsiteItem;
