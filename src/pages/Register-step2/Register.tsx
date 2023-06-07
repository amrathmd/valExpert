import React, { ChangeEvent, FormEvent } from 'react';
import './Register.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
interface Company {
    adminId: string;
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
interface Admin {
    _id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface props {
    step1Data: Admin;
}

const Register2: React.FC<props> = ({ step1Data }) => {
    const [submitStatus, setSubmitStatus] = React.useState(false);
    const History = useNavigate();
    const [data, setData] = React.useState<Company>({
        adminId: '',
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
    const handleSubmissionFailure = async () => {
        try {
            await axios.delete(
                `http://localhost:3000/v1/admin/${step1Data._id}`
            );

            await axios.delete(
                `http://localhost:3000/v1/company/YOUR_COMPANY_ID`
            );

            prompt('Registration was unsuccessful');
            History('/');
        } catch (error) {
            console.error('Error deleting step 1 data:', error);
        }
    };
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const body = {
            adminId: step1Data._id,

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
        };
        const response = await axios.post(
            'http://localhost:3000/v1/company',
            body
        );
        if (response.status === 201) {
            alert('Registration successful');
            History('/');
        } else {
            handleSubmissionFailure();
        }
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