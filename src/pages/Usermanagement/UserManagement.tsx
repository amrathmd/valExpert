import React from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import './user.css';
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
    const handleUserPrompt = () => {
        setUserprompt(!userprompt);
    };
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
                    <span className="create-button" onClick={handleUserPrompt}>
                        Add Users
                    </span>
                    <UserForm
                        userprompt={userprompt}
                        handleUserPrompt={handleUserPrompt}
                    />
                </div>
            )}
        </div>
    );
};
export default UserManagement;
