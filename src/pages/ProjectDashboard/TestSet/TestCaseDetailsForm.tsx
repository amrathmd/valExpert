import { ExpandLess, ExpandMore, FifteenMp } from '@mui/icons-material';
import {
    Button,
    Collapse,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
import TestStepForm1 from './TestStep/TestStepForm1';
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
    editTestCase: boolean;
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
    editTestCase,
}) => {
    const [openTestCaseForm, setOpenTestCaseForm] = useState(true);
    const [testCase, setTestCase] = useState(defaultTestCase);
    const [openTestStepForm, setOpenTestStepForm] = useState(false);
    const [savedTestCase, setSaveTestCase] = useState();
    const [error, setError] = useState<string>('');
    const [count, setcount] = React.useState<number>(1);
    const [currPage, setCurrentPage] = React.useState<number>(1);

    const [isSaved, setIsSaved] = React.useState(false);
    const [isEditMode, setIsEditMode] = React.useState(false);
    const [maxNumber, setMaxNumber] = React.useState<number>(1);
    const [cancel, setCancel] = React.useState<boolean>(false);

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
        setOpenTestStepForm(!openTestStepForm);
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
        testCase.testCaseNumber = maxNumber;
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
                    setSaveTestCase(result.data._id);
                }
            } catch (e) {
                console.log(e);
            }
        }
    };

    React.useEffect(() => {
        const FetchTestCases = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/testscripts`
            );
            const sortedArray = [...result.data];
            if (sortedArray.length > 0) {
                sortedArray.sort((a, b) => a.testCaseNumber - b.testCaseNumber);
                setMaxNumber(
                    sortedArray[sortedArray.length - 1].testCaseNumber + 1
                );
            }
        };
        FetchTestCases();
    });
    const capitalizeWholeString = (inputString: string) => {
        if (inputString) {
            return inputString.toUpperCase();
        }
    };

    return (
        <div className="TesCaseForm-container">
            {!savedTestCase ? (
                <List
                    sx={{
                        width: '100%',
                        bgcolor: 'background.paper',
                        padding: '0px',
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
                            <table className="testCase-form">
                                <tr>
                                    <td style={{ paddingRight: '5px' }}>
                                        <label className="testCaseFormLabel">
                                            <b>Test Case Number</b>
                                        </label>
                                        <input
                                            name="testCaseNumber"
                                            className="testCaseFormInput"
                                            value={maxNumber}
                                        ></input>
                                    </td>

                                    <td style={{ paddingLeft: '5px' }}>
                                        <label className="testCaseFormLabel">
                                            <b>Purpose</b>
                                        </label>
                                        <textarea
                                            name="purpose"
                                            rows={4}
                                            className="testCaseFormArea"
                                            onChange={handleInputFieldChange}
                                        ></textarea>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ paddingRight: '5px' }}>
                                        <label className="testCaseFormLabel">
                                            <b>Acceptance Criteria</b>
                                        </label>
                                        <textarea
                                            name="acceptanceCriteria"
                                            rows={4}
                                            className="testCaseFormArea"
                                            onChange={handleInputFieldChange}
                                        ></textarea>
                                    </td>

                                    <td style={{ paddingLeft: '5px' }}>
                                        <label className="testCaseFormLabel">
                                            <b>Prerequisites</b>
                                        </label>
                                        <textarea
                                            name="prerequisites"
                                            rows={4}
                                            className="testCaseFormArea"
                                            onChange={handleInputFieldChange}
                                        ></textarea>
                                    </td>
                                </tr>
                            </table>
                        </form>
                        <List
                            sx={{
                                width: '60vw',
                                bgcolor: 'background.paper',
                            }}
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                        ></List>
                        {error && (
                            <div className="error-message">
                                <p>{capitalizeWholeString(error)}</p>
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
                                onClick={() => setCancel(true)}
                            >
                                Cancel
                            </button>
                        </div>
                    </Collapse>
                    <Dialog open={cancel}>
                        <DialogTitle>Confirm Cancel</DialogTitle>
                        <DialogContent>
                            Are you sure, You will lose the changes made in this
                            testcase!
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={() => setCancel(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleTestCaseForm} color="error">
                                Exit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </List>
            ) : (
                <div className="testcaseandsetdetails">
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
                    {openTestStepForm && (
                        <div className="dialogOpen">
                            <TestStepForm1
                                setOpenTestStepForm={setOpenTestStepForm}
                                testScriptId={savedTestCase}
                                handleTestStepForm={handleTestStepForm}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default TestCaseDetailsForm;
