import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import './userDetails.css';
// import { Link } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { red } from '@mui/material/colors';
import UserForm from './UserForm';
import UserEditForm from './UserEditForm';
interface Users {
    _id: string;
    fullname: string;
    username: string;
    email: string;
    mobile: string;
    status: string;
    group: string[];
    country: string;
    office: string;
    department: string;
    password: string;
}

const UserDetailsPage = () => {
    const [userDetails, setUserDetails] = React.useState<Users>();
    const [isEditMode, setIsEditMode] = useState(false);

    const user = useParams();

    const handleEditClick = () => {
        setIsEditMode(true);
    };
    useEffect(() => {
        const fetchUserData = async () => {
            console.log(user);
            const response = await axios.get(
                `http://localhost:3000/v1/adminUsers/${user.id}`
            );
            const userDetails = response.data.user;
            setUserDetails(userDetails);
            console.log(userDetails);
        };
        fetchUserData();
    }, []);
    return (
        <div>
            {userDetails && (
                <div>
                    {isEditMode ? (
                        <UserEditForm userDetails={userDetails} />
                    ) : (
                        <div className="main">
                            <h1>{userDetails.fullname}</h1>
                            <hr />
                            <div className="details">
                                <div className="detailsleft">
                                    <div className="field">
                                        <strong>User Name:</strong>{' '}
                                        {userDetails.username}
                                    </div>
                                    <div className="field">
                                        <strong>Mobile:</strong>{' '}
                                        {userDetails.mobile}
                                    </div>
                                    <div className="field">
                                        <strong>Email:</strong>{' '}
                                        {userDetails.email}
                                    </div>
                                    <div className="field">
                                        <strong>Status:</strong>{' '}
                                        {userDetails.status}
                                    </div>
                                    <div className="field">
                                        <strong>Group:</strong>{' '}
                                        {userDetails.group.join(', ')}
                                    </div>
                                    <div className="field">
                                        <strong>Country:</strong>{' '}
                                        {userDetails.country}
                                    </div>
                                    <div className="field">
                                        <strong>Office:</strong>{' '}
                                        {userDetails.office}
                                    </div>
                                    <div className="field">
                                        <strong>Department:</strong>{' '}
                                        {userDetails.department}
                                    </div>
                                </div>
                                <div className="detailsright">
                                    <div className="field">
                                        <strong>User Name:</strong>{' '}
                                        {userDetails.username}
                                    </div>
                                    <div className="field">
                                        <strong>Mobile:</strong>{' '}
                                        {userDetails.mobile}
                                    </div>
                                    <div className="field">
                                        <strong>Email:</strong>{' '}
                                        {userDetails.email}
                                    </div>
                                    <div className="field">
                                        <strong>Status:</strong>{' '}
                                        {userDetails.status}
                                    </div>
                                    <div className="field">
                                        <strong>Group:</strong>{' '}
                                        {userDetails.group.join(', ')}
                                    </div>
                                    <div className="field">
                                        <strong>Country:</strong>{' '}
                                        {userDetails.country}
                                    </div>
                                    <div className="field">
                                        <strong>Office:</strong>{' '}
                                        {userDetails.office}
                                    </div>
                                    <div className="field">
                                        <strong>Department:</strong>{' '}
                                        {userDetails.department}
                                    </div>
                                </div>
                            </div>
                            <button className="form-button">
                                <Link to="/manageaccounts">Go Back</Link>
                            </button>
                            <button onClick={handleEditClick}>Edit</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserDetailsPage;
