import React from 'react';
import { Register2, Register1 } from '../index';

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

const RegistrationPage = () => {
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState<Company>({
        _id: '',
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
    const handleStep1 = (data: Company) => {
        setStep(2);
        console.log(data);
        setFormData(data);
    };
    return (
        <div>
            {step === 1 && <Register1 onSubmit={handleStep1} />}
            {step === 2 && <Register2 step1Data={formData} />}
        </div>
    );
};
export default RegistrationPage;
