import React from 'react';
import { NavLink } from 'react-router-dom';
import './Register.css';

const Register = () => {
    return (
        <div className="register">
            <form className="register-form">
                <h2>Register</h2>
                <div className="input-elements">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="email"
                        placeholder="Enter your email"
                        required
                    ></input>
                </div>
                <div className="input-elements">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        className="username"
                        placeholder="Enter your username"
                        required
                    ></input>
                </div>
                <div className="input-elements">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="password"
                        placeholder="Enter a password"
                        required
                    ></input>
                </div>

                <button type="submit" className="register-button">
                    Register
                </button>
                <div className="message">
                    Already have an account &nbsp;
                    <NavLink to="/login">
                        <a>Login!</a>
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Register;
