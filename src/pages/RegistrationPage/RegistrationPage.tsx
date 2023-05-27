import React from 'react';
import { Register, Register2 } from '../index';

interface Admin {
    _id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegistrationPage = () => {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState<Admin>({
        _id: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const handleStep1 = (data: Admin) => {
        setStep(2);
        setFormData(data);
    };
    return (
        <div>
            {step === 1 && <Register onSubmit={handleStep1} />}
            {step === 2 && <Register2 step1Data={formData} />}
        </div>
    );
};
export default RegistrationPage;
