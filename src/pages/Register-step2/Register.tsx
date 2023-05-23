import React, { ChangeEvent, FormEvent } from 'react';
import './Register.css';
import { NavLink } from 'react-router-dom';
interface Account {
    Admin: {
        username: string;
        email: string;
        password: string;
    };
    Company: {
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
    };
}
interface Admin {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface props {
    step1Data: Admin;
}
const Register2: React.FC<props> = ({ step1Data }) => {
    const [data, setData] = React.useState<Account['Company']>({
        companyName: '',
        Address: {
            city: '',
            state: '',
            country: '',
            postalCode: '',
        },
        contact: {
            phone: '',
            companyEmail: '',
        },
    });
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = {
            Admin: {
                username: step1Data.username,
                email: step1Data.email,
                password: step1Data.password,
            },
            Company: {
                companyName: data.companyName,
                Address: {
                    city: data.Address.city,
                    state: data.Address.state,
                    country: data.Address.country,
                    postalCode: data.Address.postalCode,
                },
                contact: {
                    phone: data.contact.phone,
                    companyEmail: data.contact.companyEmail,
                },
            },
        };
    };
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const keys = name.split('.');
        const topLevelKey = keys[0];

        if (keys.length === 1) {
            setData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setData((prevData) => ({
                ...prevData,
                [topLevelKey]: {
                    ...prevData[topLevelKey],
                    [keys[1]]: value,
                },
            }));
        }
    };
    return (
        <div className="register2-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>Register</h2>
                <div className="input-elements">
                    <label htmlFor="company-name">Company name</label>
                    <input
                        type="text"
                        className="company-name"
                        placeholder="Enter your company name"
                        required
                        value={data.companyName}
                        name="companyName"
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="input-elements">
                    <label htmlFor="company-city">City</label>
                    <input
                        type="text"
                        className="company-city"
                        placeholder="Enter the city in which the company located"
                        required
                        value={data.Address.city}
                        name="Address.city"
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="input-elements">
                    <label htmlFor="company-state">State</label>
                    <input
                        type="text"
                        className="company-state"
                        placeholder=""
                        name="Address.state"
                        value={data.Address.state}
                        required
                        onChange={handleChange}
                    ></input>
                </div>

                <div className="input-elements">
                    <label htmlFor="country">Country</label>
                    <input
                        type="text"
                        className="company-country"
                        placeholder="Enter your country"
                        name="Address.country"
                        value={data.Address.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-elements">
                    <label htmlFor="company-postalcode">Postal code</label>
                    <input
                        type="text"
                        className="company-postalcode"
                        placeholder="Enter the postal code"
                        name="Address.postalCode"
                        value={data.Address.postalCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-elements">
                    <label htmlFor="company-phone">Phone</label>
                    <input
                        type="text"
                        className="company-phone"
                        placeholder="Enter the mobile number"
                        name="contact.phone"
                        value={data.contact.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-elements">
                    <label htmlFor="company-email">Email</label>
                    <input
                        type="text"
                        className="company-email"
                        placeholder="Enter the Email of your company"
                        onChange={handleChange}
                        value={data.contact.companyEmail}
                        name="contact.companyEmail"
                        required
                    />
                </div>
                <button type="submit" className="register-button">
                    Step 2/2
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
export default Register2;
