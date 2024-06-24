import React, { useState } from 'react';
import Selecto from "react-selecto";
import { addWebsite } from '../services/api';

const AddWebsiteForm = ({ setWebsites, getWebsites }) => {
    const [url, setUrl] = useState('');
    const [name, setName] = useState('');
    const [timeInterval, setTimeInterval] = useState(60);
    const [selectedArea, setSelectedArea] = useState(null);
    const [showFrame, setShowFrame] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newWebsite = { url, name, timeInterval, selectedArea, selector: '' };
        try {
            await addWebsite(newWebsite);
            getWebsites();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Add Website</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>URL:</label>
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required/>
                </div>
                <div>
                    <label>Name:</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                </div>
                <div>
                    <label>Time Interval:</label>
                    <input type="number" value={timeInterval} onChange={(e) => setTimeInterval(e.target.value)}
                           required/>
                </div>
                <button type="button" onClick={() => setShowFrame(true)}>Open Website</button>
                <button type="button" onClick={() => setShowFrame(false)}>Close Website</button>
                {showFrame && (
                    <div className="website-preview">
                        <iframe src={url} width="1000px" height="500px"></iframe>
                        <Selecto
                            dragContainer={".website-preview"}
                            onDragEnd={({rect}) => {
                                setSelectedArea(rect);
                            }}
                        />
                    </div>
                )}
                <button type="submit">Add Website</button>
            </form>
        </div>
    );
};

export default AddWebsiteForm;