import React, { ButtonHTMLAttributes, FormEvent, useContext } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../contexts/AuthContext';

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
    };
    return (
        <div className="container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login form</h2>
                <div className="message">
                    Welcome to valXert,Please enter your credentials
                </div>
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
                </div>
            </form>
        </div>
    );
};

export default Login;
