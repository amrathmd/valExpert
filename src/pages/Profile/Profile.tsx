import React from 'react';
import './Profile.css';
import ChangePassword from './ChangePassword';
import Details from './Details';
import UpdatedDetails from './UpdateProfile';

const Profile = () => {
    const [profile, setProfile] = React.useState<boolean>(true);
    const [updateProfile, setUpdateProfile] = React.useState<boolean>(false);
    const [changePassword, setChangePassword] = React.useState<boolean>(false);

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
                    <button
                        className={`button-items ${
                            profile ? 'active-button' : 'inactive-button'
                        }`}
                        onClick={handleProfile}
                    >
                        Profile
                    </button>
                </span>
                <span>
                    <button
                        className={`button-items ${
                            updateProfile ? 'active-button' : 'inactive-button'
                        }`}
                        onClick={handleUpdate}
                    >
                        Update profile
                    </button>
                </span>
                <span>
                    <button
                        className={`button-items ${
                            changePassword ? 'active-button' : 'inactive-button'
                        }`}
                        onClick={handlePassword}
                    >
                        Change Password
                    </button>
                </span>
            </div>
            <div className="profile-content">
                {changePassword && <ChangePassword />}
                {profile && <Details />}
                {updateProfile && <UpdatedDetails />}
            </div>
        </div>
    );
};

export default Profile;
