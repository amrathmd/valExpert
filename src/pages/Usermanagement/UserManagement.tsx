import React from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import './user.css';
import { NavLink } from 'react-router-dom';
interface User {
    _id: string;
    name: string;
    mobile: string;
    email: string;
    status: string;
}
const UserManagement = () => {
    const [users, setUsers] = React.useState([]);
    const [userprompt, setUserprompt] = React.useState<boolean>();

    /* const getUsers = async () => {
        const res = await axios.get('http://localhost:3000/v1/adminusers');
        console.log(res);
        setUsers(res.data);
        console.log(users);
    };
    React.useEffect(() => {
        getUsers();
    }, []);*/
    return (
        <div>
            {users.length === 0 && (
                <div className="message">
                    <div>
                        <p className="para">Welcome to our platform!</p>
                        <ul className="dot-list">
                            <li>
                                You have the power to add users from your
                                company enabling
                                <br /> effective collaboration Enhanced Project
                                Management,Customized User Permissions.
                            </li>
                            <li>
                                We believe that by adding users from your
                                company,
                                <br />
                                you'll unlock the full potential of our platform
                                .
                            </li>
                        </ul>
                        <i className="fa fa-start-o" aria-hidden="true"></i>
                    </div>
                    <NavLink to="/manageaccounts/createnewuser">
                        <span className="create-button">Add Users</span>
                    </NavLink>
                </div>
            )}
        </div>
    );
};
export default UserManagement;
