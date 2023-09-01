import React from 'react';
import './TestStepForm.css';
import { InputLabel, TextField } from '@mui/material';
interface TestStep {
    testStepNumber: number;
    description: string;
    expectedResult: string;
}
const TestStepForm = () => {
    const [testStep, setTestStep] = React.useState<TestStep>();
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setTestStep((prevTestStep) => ({
            ...prevTestStep,
            [name]: value,
        }));
    };
    return (
        <div className="testStepForm">
            <div className="TestStepFormheader">
                <div>
                    <h3>Step1</h3>
                </div>
                <div className="testStepform-icons">
                    <img
                        src="../../../../../public/vector.png"
                        alt="file"
                        className="testStepform-icon"
                    />
                    <img
                        src="../../../../../public/whiteedit.png"
                        alt="edit"
                        className="testStepform-icon"
                    />
                    <img
                        src="../../../../../public/link.png"
                        alt="link"
                        className="testStepform-icon"
                    />
                    <img
                        src="../../../../../public/Delete.png"
                        alt="delete"
                        className="testStepform-icon"
                    />
                </div>
            </div>
            <div className="TestStepFormInput">
                <div>
                    <label className="testStep-label-name">
                        <b>Description</b>
                    </label>
                    <textarea
                        className="formfield"
                        name="description"
                        rows={4}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div>
                    <label className="testStep-label-name">
                        <b>Expected result</b>
                    </label>
                    <textarea
                        className="formfield"
                        name="expectedResult"
                        rows={4}
                        onChange={handleChange}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};
export default TestStepForm;
