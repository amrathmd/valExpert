import React, { ButtonHTMLAttributes, FormEvent, useContext } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DirectionsViewModel from 'esri/widgets/Directions/DirectionsViewModel';
import AuthContext from '../../contexts/AuthContext';

const Login = () => {
    const History = useNavigate();
    const { isLoggedIn, getLoggedIn } = React.useContext(AuthContext);

    const [type, setType] = React.useState({ user: false, admin: false });
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
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
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = {
            email,
            password,
        };
        if (type.admin) {
            const result = await axios
                .post('http://localhost:3000/v1/admin/login', body, {
                    withCredentials: true,
                })
                .then((result) => {
                    if (result.status === 201) {
                        alert('Login successful');
                        getLoggedIn();
                        History('/');
                    }
                })
                .catch((err) => {
                    if (err.response.data.status === 401)
                        setError(
                            'Invalid credentials,' + err.response.data.message
                        );
                    else if (err.response.data.status === 500) {
                        setError(err.response.data.message);
                    }
                });
        }
    };
    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login form</h2>
                <div className="check-boxes">
                    <div>
                        <input
                            type="radio"
                            id="normal-user"
                            name="usertype"
                            onChange={handleUser}
                        />
                        <label htmlFor="normal-user">Normal User</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            id="admin-user"
                            name="usertype"
                            onChange={handleAdmin}
                        />
                        <label htmlFor="admin-user">Admin User&nbsp;</label>
                    </div>
                </div>
                {!type.user && !type.admin && (
                    <div className="conditional-message">
                        Select the type of user before login
                    </div>
                )}
                {type.user && (
                    <div className="conditional-message">
                        <h3>Note: You are logging in as a Created user</h3>
                    </div>
                )}
                {type.admin && (
                    <div className="conditional-message">
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
                    {error.length > 0 && <p className="login-error">{error}</p>}
                    <div className="message">
                        Don&apos;t have a account &nbsp;
                        <NavLink to="/register">Register here!</NavLink>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
