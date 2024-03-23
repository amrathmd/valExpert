import { Avatar } from '@mui/material';
import { react_backend_url } from '../../config';
import axios from 'axios';
import React from 'react';
import './Profile.css';

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

const Details = () => {
    const [user, setUser] = React.useState<Users | undefined>();
    const id = '64d7ed1fd3186b0ec4845352';
    React.useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get(
                `${react_backend_url}/v1/adminusers/${id}`
            );
            console.log(response.data.user);
            setUser(response.data.user);
        };
        fetchUser();
    }, []);
    return (
        <div className="details-container">
            <div>
                <div className="avatar">
                    <Avatar sx={{ width: 100, height: 100 }} />
                </div>
            </div>
            <div className="details-content">
                <table className="details-table">
                    <tbody>
                        <tr>
                            <td className="details-label">Username</td>
                            <td>{user?.username}</td>
                        </tr>
                        <tr>
                            <td className="details-label">Email</td>
                            <td>{user?.email}</td>
                        </tr>
                        <tr>
                            <td className="details-label">Mobile</td>
                            <td>{user?.mobile}</td>
                        </tr>
                        <tr>
                            <td className="details-label">Group</td>
                            <td>
                                <ul className="group-list">
                                    {user?.group?.map((groupName, index) => (
                                        <li key={index}>{groupName}</li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td className="details-label">Office</td>
                            <td>{user?.office}</td>
                        </tr>
                        <tr>
                            <td className="details-label">Department</td>
                            <td>{user?.department}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default Details;
