import React from 'react';

const WebsiteItem = ({ website }) => {
    return (
        <tr>
            <td>{website.name}</td>
            <td>{website.url}</td>
            <td>{website.time_interval} minutes</td>
        </tr>
    );
};

export default WebsiteItem;