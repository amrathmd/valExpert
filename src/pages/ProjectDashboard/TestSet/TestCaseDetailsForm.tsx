import { ExpandLess, ExpandMore, FifteenMp } from '@mui/icons-material';
import {
    Button,
    Collapse,
    InputLabel,
    List,
    ListItemText,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './TestCaseForm.css';
import TestStepForm from './TestStep/TestStepForm';
import axios from 'axios';
import { react_backend_url } from '../../../config';
import TestCaseDetails from './TestCaseDetails';
import Joi from 'joi-browser';
interface TestCase {
    testsetId: string;
    Type: string;
    testCaseNumber: number;
    purpose: string;
    acceptanceCriteria: string;
    prerequisites: string;
    result: string;
    author: string;
}
const defaultTestCase: TestCase = {
    Type: 'Hi',
    testsetId: '',
    testCaseNumber: 0,
    purpose: '',
    acceptanceCriteria: '',
    prerequisites: '',
    result: 'not started',
    author: 'hello',
};
interface Props {
    handleTestCaseForm: () => void;
    testsetId: string;
    projectId: string;
    setSelectedList: (selectedList: number) => void;
}
interface TestStep {
    stepNumber: number;
    description: string;
    expectedResult: string;
    testscriptId: string;
}
const defaultForm: TestStep = {
    stepNumber: 0,
    description: '',
    expectedResult: '',
    testscriptId: '',
};

const TestCaseDetailsForm: React.FC<Props> = ({
    handleTestCaseForm,
    testsetId,
    projectId,
    setSelectedList,
}) => {
    const [openTestCaseForm, setOpenTestCaseForm] = useState(true);
    const [testCase, setTestCase] = useState(defaultTestCase);
    const [openTestStepForm, setOpenTestStepForm] = useState(false);
    const [savedTestCase, setSaveTestCase] = useState();
    const [error, setError] = useState<string>('');
    const [count, setcount] = React.useState<number>(1);
    const [currPage, setCurrentPage] = React.useState<number>(1);
    const [testStep, setTestStep] = React.useState<TestStep>(defaultForm);
    const [isSaved, setIsSaved] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);

    const schema = {
        testCaseNumber: Joi.number().required(),
        purpose: Joi.string().required(),
        acceptanceCriteria: Joi.string().required(),
        prerequisites: Joi.string().required(),
    };

    const ToggleOpenTestCaseForm = () => {
        setOpenTestCaseForm(!openTestCaseForm);
    };
    const handleTestStepForm = () => {
        setcount((prevcount) => {
            setCurrentPage(prevcount + 1);
            return prevcount + 1;
        });

        setTestStep(defaultForm);
        setIsSaved(false);
        setIsEditMode(false);
    };

    const handleInputFieldChange = (event: any) => {
        const { name, value } = event.target;
        setTestCase((prevTestCase) => ({
            ...prevTestCase,
            [name]: value,
        }));
    };
    const handleSubmitTestCaseForm = async (event: any) => {
        event.preventDefault();
        testCase.testsetId = testsetId;
        const { error } = Joi.validate(testCase, schema, {
            allowUnknown: true,
        });
        if (error) {
            console.log(error);
            setError(error.details[0].message);
            return;
        } else {
            try {
                const result = await axios.post(
                    `${react_backend_url}/v1/testscripts`,
                    testCase
                );
                if (result) {
                    console.log(result.data);
                    setSaveTestCase(result.data._id);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    return (
        <div className="TesCaseForm-container">
            {!savedTestCase ? (
                <List
                    sx={{
                        width: '60vw',
                        bgcolor: 'background.paper',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                    <div
                        className="TestCaseFrom-header"
                        onClick={ToggleOpenTestCaseForm}
                    >
                        {openTestCaseForm ? <ExpandLess /> : <ExpandMore />}

                        <span className="header-text-testcase">
                            Test case Details
                        </span>
                    </div>
                    <Collapse
                        in={openTestCaseForm}
                        timeout="auto"
                        unmountOnExit
                    >
                        <form>
                            <label className="testCaseFormLabel">
                                <b>Test Case Number</b>
                            </label>
                            <input
                                name="testCaseNumber"
                                className="testCaseFormInput"
                                onChange={handleInputFieldChange}
                            ></input>
                            <label className="testCaseFormLabel">
                                <b>Purpose</b>
                            </label>
                            <textarea
                                name="purpose"
                                rows={4}
                                className="testCaseFormArea"
                                onChange={handleInputFieldChange}
                            ></textarea>
                            <label className="testCaseFormLabel">
                                <b>Acceptance Criteria</b>
                            </label>
                            <textarea
                                name="acceptanceCriteria"
                                rows={4}
                                className="testCaseFormArea"
                                onChange={handleInputFieldChange}
                            ></textarea>
                            <label className="testCaseFormLabel">
                                <b>Prerequisites</b>
                            </label>
                            <textarea
                                name="prerequisites"
                                rows={4}
                                className="testCaseFormArea"
                                onChange={handleInputFieldChange}
                            ></textarea>
                        </form>
                        <List
                            sx={{
                                width: '60vw',
                                bgcolor: 'background.paper',
                            }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        >
                            {/* <div
                            onClick={ToggleOpenTestStepForm}
                            className="testStepHeader"
                        >
                            <img
                                src="../../../../public/roundedplus.png"
                                alt=""
                                style={{
                                    display: 'inline-block',
                                    height: '30px',
                                    width: '30px',
                                }}
                            />
                        </div> */}
                        </List>
                        {error && (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        )}
                        <div className="testCasebuttons">
                            <button
                                onClick={handleSubmitTestCaseForm}
                                className="testcasesavebutton"
                            >
                                Save
                            </button>
                            <button
                                className="testcasecancelbutton"
                                onClick={handleTestCaseForm}
                            >
                                Cancel
                            </button>
                        </div>
                    </Collapse>
                </List>
            ) : (
                <div>
                    <TestCaseDetails testCaseId={savedTestCase} />
                    <div
                        onClick={handleTestStepForm}
                        className="testStepHeader"
                    >
                        <img
                            src="../../../../public/roundedplus.png"
                            alt=""
                            style={{
                                display: 'inline-block',
                                height: '30px',
                                width: '30px',
                            }}
                        />
                        <span className="header-text-teststep">Add Step</span>
                    </div>
                    <TestStepForm
                        count={count}
                        setcount={setcount}
                        currPage={currPage}
                        setCurrentPage={setCurrentPage}
                        testCaseId={savedTestCase}
                        testStep={testStep}
                        setTestStep={setTestStep}
                        handleTestCaseform={handleTestCaseForm}
                        projectId={projectId}
                        testsetId={testsetId}
                        isSaved={isSaved}
                        setIsSaved={setIsSaved}
                        isEditMode={isEditMode}
                        setIsEditMode={setIsEditMode}
                    />
                </div>
            )}
        </div>
    );
};

export default TestCaseDetailsForm;
