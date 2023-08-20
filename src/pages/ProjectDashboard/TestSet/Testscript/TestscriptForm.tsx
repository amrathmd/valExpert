import React, { ChangeEvent, useState } from 'react';
import TestScript from '../../../../components/Models/testScriptsmodel';
import axios from 'axios';
import '../../Requirements/RequirementForm.css';
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    FormLabel,
} from '@mui/material';
import { react_backend_url } from '../../../../config';

interface TestscriptFormProps {
    testSetId: string;
    onClose: () => void;
}
const defaultTestCase = {
    testsetId: '',
    Type: 'iQ',
    purpose: '',
    acceptanceCriteria: '',
    prerequesites: '',
    result: 'pass',
    author: '',
};

const TestscriptForm: React.FC<TestscriptFormProps> = ({
    testSetId,
    onClose,
}) => {
    const [formValue, setFormValue] = useState('');
    const [testCase, setTestCase] = useState(defaultTestCase);

    const updateTestCase = (field: string, value: any) => {
        setTestCase((prevTestCase) => {
            return {
                ...prevTestCase,
                [field]: value,
            };
        });
    };
    const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTestCase((prevTestCase) => ({
            ...prevTestCase,
            [name]: value,
        }));
    };
    // const handleSubmit = async (e: any) => {
    //     e.preventDefault();
    //     console.log(testCase);
    //     const res = await axios.post('http://localhost:3000/v1/testcases', {
    //         testCase,
    //     });
    //     console.log('res post', res);
    //     if (!res) {
    //         window.alert('error');
    //         return;
    //     }
    //     window.alert('success');
    //     handleFormActive();
    // };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        testCase.testsetId = testSetId;
        axios
            .post(`${react_backend_url}/v1/testscripts`, testCase)
            .then((response) => {
                console.log('Test script created:', response.data);
                onClose();
            })
            .catch((error) => {
                console.error('Error creating test script:', error);
                alert('Error creating test script. Please try again.'); // Notify the user
            });
    };

    return (
        <div className="form-container">
            <div>
                <div className="heading">
                    <h2>TestScript Details</h2>
                </div>

                <div className="req-item">
                    <FormLabel id="demo-row-radio-buttons-group-label">
                        Type
                    </FormLabel>
                    <FormControl fullWidth size="small">
                        <Select
                            labelId="type-label"
                            id="req-dropdown"
                            name="Type"
                            value={testCase.Type}
                            onChange={handleTextChange}
                            label="Type"
                        >
                            <MenuItem value="iQ">IQ</MenuItem>
                            <MenuItem value="oQ">OQ</MenuItem>
                            <MenuItem value="pQ">PQ</MenuItem>
                            <MenuItem value="uAT">UAT</MenuItem>
                            <MenuItem value="fAT">FAT</MenuItem>
                            <MenuItem value="integration Test">
                                Integration Test
                            </MenuItem>
                            <MenuItem value="unit Tests">Unit Tests</MenuItem>
                            <MenuItem value="smoke Test">Smoke Test</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="req-item">
                    <TextField
                        label="Purpose"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        name="purpose"
                        size="small"
                        value={testCase.purpose}
                        onChange={handleTextChange}
                    />
                </div>

                <div className="req-item">
                    <TextField
                        label="Acceptance Criteria"
                        variant="outlined"
                        fullWidth
                        name="acceptanceCriteria"
                        size="small"
                        multiline
                        rows={4}
                        value={testCase.acceptanceCriteria}
                        onChange={handleTextChange}
                    />
                </div>

                <div className="req-item">
                    <TextField
                        label="Prerequesites"
                        variant="outlined"
                        fullWidth
                        name="prerequesites"
                        size="small"
                        value={testCase.prerequesites}
                        onChange={handleTextChange}
                    />
                </div>

                <div className="req-item">
                    <FormControl variant="outlined" fullWidth size="small">
                        <FormLabel id="demo-row-radio-buttons-group-label">
                            Result
                        </FormLabel>
                        <Select
                            labelId="result-label"
                            id="req-dropdown"
                            name="result"
                            value={testCase.result}
                            onChange={handleTextChange}
                            label="Result"
                        >
                            <MenuItem value="pass">Pass</MenuItem>
                            <MenuItem value="fail">Fail</MenuItem>
                            <MenuItem value="not started">Not Started</MenuItem>
                            <MenuItem value="in progress">In Progress</MenuItem>
                            <MenuItem value="cancelled">Cancelled</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className="req-item">
                    <TextField
                        label="Author"
                        variant="outlined"
                        fullWidth
                        name="author"
                        size="small"
                        value={testCase.author}
                        onChange={handleTextChange}
                    />
                </div>
                <div className="req-submit">
                    <button className="requirementFormButtons">Cancel</button>
                    <button
                        onClick={handleSubmit}
                        className="requirementFormButtons"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TestscriptForm;