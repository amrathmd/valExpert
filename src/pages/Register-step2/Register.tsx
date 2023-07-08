import React, { useState, ChangeEvent, FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Register.css';
import Joi, { ValidationError } from 'joi-browser';
import axios from 'axios';

interface Account {
    companyId: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    userType: string;
}
interface Company {
    _id: string;
    companyName: string;
    Address: {
        city: string;
        state: string;
        country: string;
        postalCode: string;
    };
    contact: {
        phone: string;
        companyEmail: string;
    };
}

interface Errors {
    [key: string]: string;
}
interface props {
    step1Data: Company;
}

const Register2: React.FC<props> = ({ step1Data }) => {
    const [account, setAccount] = useState<Account>({
        companyId: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        userType: '',
    });
    const [errors, setErrors] = useState<Errors>({});
    const History = useNavigate();

    const schema = {
        companyId: Joi.string().required(),
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
                    message: 'Passwords do not match',
                };
            })
            .required()
            .label('Confirm Password'),
        userType: Joi.string(),
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        account.companyId = step1Data._id;
        account.userType = 'admin';
        const validationErrors = validate();

        if (validationErrors) {
            setErrors(validationErrors);

            console.log('Error' + validationErrors);
        } else {
            const response = await axios.post(
                'http://localhost:3000/v1/admin',
                account
            );
            if (response.status === 201) {
                alert('Admin for the company created successfully!');
                History('/');
            }
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setAccount((prevAccount) => ({
            ...prevAccount,
            [name]: value,
        }));
    };

    const validate = (): Errors | null => {
        const { error } = Joi.validate(account, schema, {
            abortEarly: false,
        });

        if (!error) {
            setErrors({});
            return;
        }

        const validationErrors: Errors = {};
        for (const item of error.details) {
            validationErrors[item.path[0]] = item.message;
        }

        setErrors(validationErrors);
        return validationErrors;
    };

    return (
        <div className="register">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <p className="info">Note: You will be registered as an Admin</p>
                <div className="input-elements">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="email"
                        placeholder="Enter your email"
                        required
                        name="email"
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="input-elements">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        className="confirm-password"
                        placeholder="Confirm your password"
                        value={account.confirmPassword}
                        onChange={handleChange}
                        name="confirmPassword"
                        required
                    />
                    {errors.password && (
                        <div className="error">{errors.password}</div>
                    )}
                    {errors.confirmPassword && !errors.password && (
                        <div className="error">{errors.confirmPassword}</div>
                    )}
                </div>
                <button className="register-button" type="submit">
                    Register!
                </button>
            </form>
        </div>
    );
};

export default Register2;
