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

const defaultTestCase = {
    testCaseNumber: 0,
    purpose: '',
    acceptanceCriteria: '',
    prerequisites: '',
};
const TestCaseDetailsForm = () => {
    const [openTestCaseForm, setOpenTestCaseForm] = useState(true);
    const [testCase, setTestCase] = useState(defaultTestCase);

    const ToggleOpenTestCaseForm = () => {
        setOpenTestCaseForm(!openTestCaseForm);
    };

    const handleInputFieldChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { name, value } = event.target;
        setTestCase((prevTestCase) => ({
            ...prevTestCase,
            [name]: value,
        }));
        console.log(testCase);
    };

    const handleSubmitTestCaseForm = () => {
        console.log('hello');
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
                    <ListItemText
                        primary="TestCase Details"
                        sx={{ display: 'inline-block' }}
                    ></ListItemText>
                </div>
                <Collapse in={openTestCaseForm} timeout="auto" unmountOnExit>
                    <form>
                        <InputLabel>
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
                        <InputLabel>
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
                        <InputLabel>
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
                        <InputLabel>
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
                        <button onClick={handleSubmitTestCaseForm}>Save</button>
                        <button>Cancel</button>
                    </form>
                </Collapse>
            </List>
        </div>
    );
};

export default TestCaseDetailsForm;
