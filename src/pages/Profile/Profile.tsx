import React from 'react';
import './Profile.css';
import ChangePassword from './ChangePassword';
import Details from './Details';

const Profile = () => {
    const [profile, setProfile] = React.useState<boolean>();
    const [updateProfile, setUpdateProfile] = React.useState<boolean>();
    const [changePassword, setChangePassword] = React.useState<boolean>();
    const handleProfile = () => {
        setProfile(true);
        setUpdateProfile(false);
        setChangePassword(false);
    };
    const handleUpdate = () => {
        setProfile(false);
        setUpdateProfile(true);
        setChangePassword(false);
    };
    const handlePassword = () => {
        setProfile(false);
        setUpdateProfile(false);
        setChangePassword(true);
    };
    return (
        <div className="profile-container">
            <div className="profile-buttons">
                <span>
                    <button className="button-items" onClick={handleProfile}>
                        profile
                    </button>
                </span>
                <span>
                    <button className="button-items" onClick={handleUpdate}>
                        Update profile
                    </button>
                </span>
                <span>
                    <button className="button-items" onClick={handlePassword}>
                        Change Password
                    </button>
                </span>
            </div>
            <div className="profile-content">
                {changePassword && <ChangePassword />}
                {profile && <Details />}
            </div>
        </div>
    );
};
export default Profile;
