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
        <div className="Loglogincontainer">
            <div className="Loglogin-form">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h2 className="Loghead">Login form</h2>
                        <div className="Logac">
                            <p className="Logmessage">
                                Welcome Back to valExpert
                            </p>
                        </div>
                    </div>
                    <div className="Loginputform">
                        <label htmlFor="email">Email</label>
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
                            <label htmlFor="password">Password</label>
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
                            <label className="Logrem">Remember me</label>
                        </div>
                        <button type="submit" className="Loglogin-button">
                            Login
                        </button>
                        {error.length > 0 && (
                            <p className="Loglogin-error">{error}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
