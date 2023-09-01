import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    Collapse,
    InputLabel,
    List,
    ListItemText,
    TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import './TestCaseForm.css';
import TestSetForm from './TestSetForm';
import TestStepForm from './TestStep/TestStepForm';
interface TestCase {
    testCaseNumber: number;
    purpose: string;
    acceptanceCriteria: string;
    prerequisites: string;
}
const defaultTestCase: TestCase = {
    testCaseNumber: 0,
    purpose: '',
    acceptanceCriteria: '',
    prerequisites: '',
};
interface Props {
    handleTestCaseForm: () => void;
}
const TestCaseDetailsForm: React.FC<Props> = ({ handleTestCaseForm }) => {
    const [openTestCaseForm, setOpenTestCaseForm] = useState(true);
    const [testCase, setTestCase] = useState(defaultTestCase);
    const [openTestStepForm, setOpenTestStepForm] = useState(false);

    const ToggleOpenTestCaseForm = () => {
        setOpenTestCaseForm(!openTestCaseForm);
    };
    const ToggleOpenTestStepForm = () => {
        setOpenTestStepForm(!openTestStepForm);
    };

    const handleInputFieldChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setTestCase((prevTestCase) => ({
            ...prevTestCase,
            [name]: value,
        }));
    };

    const handleSubmitTestCaseForm = () => {
        console.log(testCase);
    };
    return (
        <div className="TesCaseForm-container">
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
                    {/* <ListItemText
                        primary="TestCase Details"
                        style={{ display: 'inline-block' }}
                    ></ListItemText> */}
                    <span className="header-text-testcase">
                        TestCase Details
                    </span>
                </div>
                <Collapse in={openTestCaseForm} timeout="auto" unmountOnExit>
                    <form>
                        <InputLabel
                            sx={{ color: 'black', marginBottom: '4px' }}
                        >
                            <b>Test Case Number</b>
                        </InputLabel>
                        <TextField
                            size="small"
                            name="testCaseNumber"
                            sx={{
                                marginBottom: 4,
                                borderRadius: '4px',
                            }}
                            onChange={handleInputFieldChange}
                        />
                        <InputLabel sx={{ color: 'black' }}>
                            <b>Purpose</b>
                        </InputLabel>
                        <TextField
                            size="small"
                            variant="outlined"
                            name="purpose"
                            multiline
                            rows={3}
                            fullWidth
                            sx={{
                                marginBottom: 4,
                                borderRadius: '4px',
                            }}
                            onChange={handleInputFieldChange}
                        />
                        <InputLabel
                            sx={{ color: 'black', marginBottom: '4px' }}
                        >
                            <b>Acceptance Criteria</b>
                        </InputLabel>
                        <TextField
                            size="small"
                            variant="outlined"
                            name="acceptanceCriteria"
                            multiline
                            rows={4}
                            fullWidth
                            sx={{
                                marginBottom: 4,
                                borderRadius: '4px',
                            }}
                            onChange={handleInputFieldChange}
                        />
                        <InputLabel
                            sx={{ color: 'black', marginBottom: '4px' }}
                        >
                            <b>Prerequisites</b>
                        </InputLabel>
                        <TextField
                            size="small"
                            variant="outlined"
                            name="prerequisites"
                            multiline
                            rows={4}
                            fullWidth
                            sx={{
                                marginBottom: 4,
                                borderRadius: '4px',
                            }}
                            onChange={handleInputFieldChange}
                        />
                    </form>
                    <List
                        sx={{
                            width: '60vw',
                            bgcolor: 'background.paper',
                        }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        <div
                            onClick={ToggleOpenTestStepForm}
                            className="testStepHeader"
                        >
                            <img
                                src="../../../../public/roundedplus.png"
                                alt=""
                                style={{
                                    display: 'inline-block',
                                    height: '40px',
                                    width: '40px',
                                }}
                            />
                            <span className="header-text-teststep">
                                Add Step
                            </span>
                        </div>
                        <Collapse
                            in={openTestStepForm}
                            timeout="auto"
                            unmountOnExit
                        >
                            <TestStepForm />
                        </Collapse>
                    </List>
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
        </div>
    );
};

export default TestCaseDetailsForm;
