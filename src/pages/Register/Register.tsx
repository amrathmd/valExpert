import React, { Component, ChangeEvent, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import './Register.css';
import Joi from 'joi-browser';

interface Account {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface Errors {
    [key: string]: string;
}

class Register extends Component {
    state = {
        account: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        } as Account,
        errors: {} as Errors,
    };

    schema = {
        username: Joi.string()
            .alphanum()
            .min(3)
            .max(30)
            .required()
            .label('Username'),
        email: Joi.string().email().required().label('Email'),
        password: Joi.string()
            .min(8)
            .regex(/^(?=.*[!@#$%^&*])/)
            .regex(/^(?=.*[A-Z])/)
            .regex(/^(?=.*[a-z])(?=.*\d)/)
            .error((_errors: any) => {
                return {
                    message:
                        'Password must be at least 8 characters long and contain at least one special character, one lowercase letter, and one numeric character',
                };
            })
            .required()
            .label('Password'),
        confirmPassword: Joi.string()
            .valid(Joi.ref('password'))
            .error((_errors: any) => {
                return {
                    message: 'Password do not match',
                };
            })
            .required()
            .label('Confirm Password'),
    };

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { account } = this.state;
        const errors = this.validate();

        if (Object.keys(errors).length === 0) {
            console.log('Form submitted successfully!');
        } else {
            this.setState({ errors });
        }
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { account } = this.state;
        const { name, value } = event.target;
        account[name] = value;
        this.setState({ account });
    };

    validate = (): Errors | null => {
        const { account } = this.state;
        const options = { abortEarly: false };
        const { error } = Joi.validate(account, this.schema, options);

        if (!error) {
            this.setState({ errors: {} });
            return null;
        }

        const errors: Errors = {};
        for (const item of error.details) {
            console.log(errors);
            errors[item.path[0]] = item.message;
        }

        this.setState({ errors });
        return errors;
    };

    render() {
        const { errors, account } = this.state;

        return (
            <div className="register">
                <form className="register-form" onSubmit={this.handleSubmit}>
                    <h2>Register</h2>
                    <p className="info">
                        Note: You will be registered as an Admin
                    </p>
                    <div className="input-elements">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            className="email"
                            placeholder="Enter your email"
                            required
                            name="email"
                            onChange={this.handleChange}
                        ></input>
                        {errors.email && (
                            <div className="error">{errors.email}</div>
                        )}
                    </div>
                    <div className="input-elements">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="username"
                            placeholder="Enter your username"
                            required
                            name="username"
                            onChange={this.handleChange}
                        ></input>
                        {errors.username && (
                            <div className="error">{errors.username}</div>
                        )}
                    </div>
                    <div className="input-elements">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="password"
                            value={account.password}
                            placeholder="Enter a password"
                            required
                            name="password"
                            onChange={this.handleChange}
                        ></input>
                    </div>

                    <div className="input-elements">
                        <label htmlFor="confirmPassword">
                            Confirm Password:
                        </label>
                        <input
                            type="password"
                            className="confirm-password"
                            placeholder="Confirm your password"
                            value={account.confirmPassword}
                            onChange={this.handleChange}
                            name="confirmPassword"
                            required
                        />
                        {errors.password && (
                            <div className="error">{errors.password}</div>
                        )}
                        {errors.confirmPassword && !errors.password && (
                            <div className="error">
                                {errors.confirmPassword}
                            </div>
                        )}
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
    }
}

export default Register;
