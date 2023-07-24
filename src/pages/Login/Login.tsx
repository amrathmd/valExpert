import React, { ButtonHTMLAttributes, FormEvent, useContext } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import { react_frontend_url } from '../../config';

const Login = () => {
    const History = useNavigate();
    const { loggedIn, getLoggedIn } = React.useContext(AuthContext);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = {
            email,
            password,
        };

        const result = await axios
            .post(`${react_frontend_url}/v1/admin/login`, body, {
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
    };
    return (
        <div className="container">
            <div className="login-form">
                <form className="" onSubmit={handleSubmit}>
                    <h2 className="head">Login form</h2>
                    <div className="ac">
                        <p className="message">Welcome Back to valExpert</p>
                    </div>
                    <div className="inputform">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            className="text"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        ></input>
                        <div className="pass">
                            <label htmlFor="password">Password</label>
                            <a>Forgot Your Password?</a>
                        </div>

                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="text"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                        <div className="account">
                            <input type="checkbox"></input>
                            <label className="rem">Remember me</label>
                        </div>
                        <button type="submit" className="login-button">
                            Login
                        </button>
                        {error.length > 0 && (
                            <p className="login-error">{error}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
