import React, { ButtonHTMLAttributes, FormEvent, useContext } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';
import { react_backend_url } from '../../config';
import StickyHeader from '../../components/ProjectHeader/StickyHeader';
import { Reactangle } from '../../../public/Rectangle 4.jpg';
import group from '../../../public/Group 3.png';

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
            .post(`${react_backend_url}/v1/admin/login`, body, {
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
        <>
            <StickyHeader />
            <div className="Loglogincontainer">
                <div className="loginImage">
                    <img
                        src="../../../public/Best.png"
                        alt=""
                        className="rectangle"
                    />
                </div>
                <div className="Loglogin-form">
                    <form onSubmit={handleSubmit}>
                        <div className="Loginputform">
                            <label htmlFor="email" className="text">
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                placeholder="Email"
                                className="Logtext"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            ></input>
                            <div className="Logpass">
                                <label htmlFor="password" className="text">
                                    Password
                                </label>
                                <a>Forgot Your Password?</a>
                            </div>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="Logtext"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                            <div className="Logaccount">
                                <input type="checkbox"></input>
                                <label className="msg">Remember me</label>
                            </div>
                            <button type="submit" className="Loglogin-button">
                                <h2 className="buttontext">Login</h2>
                            </button>
                            {error.length > 0 && (
                                <p className="Loglogin-error">{error}</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
