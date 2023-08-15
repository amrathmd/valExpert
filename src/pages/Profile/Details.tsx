import React, { useState } from 'react';
import './Profile.css';

interface DetailsProps {
    updateactive: boolean;
}

const Details: React.FC<DetailsProps> = ({ updateactive }) => {
    const initialData = {
        fullname: 'Arbaz',
        username: 'Naveen',
        status: 'Done',
        country: 'India',
        group: 'Cse',
    };
    const [obj, setObj] = useState(initialData);

    const model = [
        { key: 'fullname', label: 'FullName' },
        { key: 'username', label: 'UserName' },
        { key: 'status', label: 'Status' },
        { key: 'country', label: 'Country' },
        { key: 'group', label: 'Group' },
    ];

    const handleInputChange = (key: string, value: string) => {
        setObj((prevObj) => ({
            ...prevObj,
            [key]: value,
        }));
    };
    const [success, setSuccess] = useState(false);
    const handleSuccess = () => {
        setSuccess(true);
        console.log(obj);
        alert('Success!');
    };

    return (
        <div className="details-container">
            {model.map((items) => (
                <div key={items.key} className="detail-item">
                    <span className="key-label">{items.label}</span>
                    {updateactive ? (
                        <input
                            className="edit-input"
                            value={obj[items.key]}
                            onChange={(e) =>
                                handleInputChange(items.key, e.target.value)
                            }
                        />
                    ) : (
                        <span>{obj[items.key]}</span>
                    )}
                </div>
            ))}
            {updateactive && (
                <button className="save-button" onClick={handleSuccess}>
                    Save
                </button>
            )}
            {success && (
                <p className="success-message">Success message displayed!</p>
            )}
        </div>
    );
};

export default Details;
