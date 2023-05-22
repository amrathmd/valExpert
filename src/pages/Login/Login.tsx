import React from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DirectionsViewModel from 'esri/widgets/Directions/DirectionsViewModel';

const Login = () => {
    const [type, setType] = React.useState({ user: false, admin: false });
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const handleUser = () => {
        setType({
            user: true,
            admin: false,
        });
    };
    const handleAdmin = () => {
        setType({
            user: false,
            admin: true,
        });
    };
    const handleChange = () => {};
    return (
        <div className="container">
            <form>
                <h2>Login form</h2>
                <div className="check-boxes">
                    <div>
                        <input
                            type="radio"
                            id="normal-user"
                            name="usertype"
                            onChange={handleUser}
                        />
                        <label htmlFor="normal-user">Normal user &nbsp;</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="admin-user"
                            name="usertype"
                            onChange={handleAdmin}
                        />
                        <label htmlFor="admin-user">Admin User</label>
                    </div>
                </div>
                {!type.user && !type.admin && <div className="message"></div>}
                {type.user && (
                    <div className="message">
                        <h3>Note: You are logging in as a Created user</h3>
                    </div>
                )}
                {type.admin && (
                    <div className="message">
                        <h3>Note: You are logging as an Admin</h3>
                    </div>
                )}
                <div className="inputform">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        placeholder="Enter your email"
                        className="text"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    ></input>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        className="text"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <button type="submit" className="button">
                        Login
                    </button>
                    <div className="message">
                        Don't have a account &nbsp;
                        <NavLink to="/register">
                            <a>Register here!</a>
                        </NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
