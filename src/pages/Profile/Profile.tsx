import React, { useState } from 'react';

import Details from './Details';
import Update from './Update';
import Password from './Password';
import './Profile.css';

const Profile = () => {
    const handleProfile = () => {
        setUpdateActive(!updateactive);
    };
    const handleEdit = () => {
        setUpdateActive(!updateactive);
    };
    const handlePassword = () => {
        setUpdateActive(!updateactive);
        setPassword(!password);
    };

    const [profile, setProfile] = useState(true);
    const [updateactive, setUpdateActive] = useState(false);
    const [password, setPassword] = useState(false);

    return (
        <div className="profile-container">
            <div className="button-group">
                <span>
                    <button onClick={handleProfile}>Profile</button>
                </span>
                <span>
                    <button onClick={handleEdit}>UpdateProfile</button>
                </span>
                <span>
                    <button onClick={handlePassword}>Password</button>
                </span>
            </div>

            {profile && <Details updateactive={updateactive} />}
            {password && <Password />}
        </div>
    );
};

export default Profile;
