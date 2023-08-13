import React, { useState } from 'react';
import { TestSet } from '@/components/Models/testsetsModel';
import axios from 'axios';
import './testSetForm.css';
import {
    Button,
    FormControl,
    FormLabel,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    TextareaAutosize,
} from '@mui/material';

interface TestSetFormProps {
    handleTestSetForm: () => void;
}

const defaultTestSet = {
    projectId: '',
    requirementSetId: '',
    testName: '',
    requirementSetName: '',
    description: '',
    category: 'IQ',
    status: 'Approved',
};

const TestSetForm: React.FC<TestSetFormProps> = ({ handleTestSetForm }) => {
    const [testSet, setTestSet] = useState(defaultTestSet);

    const updateTestSet = (field: string, value: any) => {
        setTestSet((prevTestSet) => {
            return {
                ...prevTestSet,
                [field]: value,
            };
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(testSet);
        const res = await axios.post('http://localhost:3000/v1/testsets', {
            testSet,
        });
        console.log('res post', res);
        if (!res) {
            window.alert('error');
            return;
        }
        window.alert('success');
        handleTestSetForm();
    };

    return (
        <form className="test1-form-container" onSubmit={handleSubmit}>
            <div>
                <div className="heading">
                    <h2>TestSet Details</h2>
                </div>
                <div className="req-item">
                    <TextField
                        label="Project Id"
                        value={testSet.projectId}
                        fullWidth
                        placeholder="Project Id"
                        onChange={(e) =>
                            updateTestSet('projectId', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <TextField
                        label="RequirementSet Id"
                        value={testSet.requirementSetId}
                        placeholder="RequirementSet Id"
                        onChange={(e) =>
                            updateTestSet('requirementSetId', e.target.value)
                        }
                        fullWidth
                    />
                </div>
                <div className="req-item">
                    <TextField
                        label="TestSet Name"
                        value={testSet.testName}
                        placeholder="TestSet Name"
                        onChange={(e) =>
                            updateTestSet('testName', e.target.value)
                        }
                        fullWidth
                    />
                </div>
                <div className="req-item">
                    <TextField
                        label="RequirementSet Name"
                        value={testSet.requirementSetName}
                        fullWidth
                        placeholder="RequirementSet Name"
                        onChange={(e) =>
                            updateTestSet('requirementSetName', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <InputLabel>Description</InputLabel>
                    <TextField
                        multiline
                        rows={4}
                        fullWidth
                        value={testSet.description}
                        onChange={(e) =>
                            updateTestSet('description', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <FormControl fullWidth>
                        <FormLabel>Category</FormLabel>
                        <Select
                            value={testSet.category}
                            onChange={(e) =>
                                updateTestSet('category', e.target.value)
                            }
                        >
                            <MenuItem value="IQ">IQ</MenuItem>
                            <MenuItem value="OQ">OQ</MenuItem>
                            <MenuItem value="PQ">PQ</MenuItem>
                            <MenuItem value="UAT">UAT</MenuItem>
                            <MenuItem value="FAT">FAT</MenuItem>
                            <MenuItem value="Integration Test">
                                Integration Test
                            </MenuItem>
                            <MenuItem value="Unit Tests">Unit Tests</MenuItem>
                            <MenuItem value="Smoke Test">Smoke Test</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {/* <div className="test-item">
                    <FormControl>
                        <FormLabel>Status</FormLabel>
                        <Select
                            value={testSet.status}
                            onChange={(e) =>
                                updateTestSet('status', e.target.value)
                            }
                        >
                            <MenuItem value="Approved">Approved</MenuItem>
                            <MenuItem value="Draft">Draft</MenuItem>
                            <MenuItem value="In Review">In Review</MenuItem>
                        </Select>
                    </FormControl>
                </div> */}
                <div className="req-submit">
                    <Button
                        variant="contained"
                        color="error"
                        onClick={handleTestSetForm}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Confirm
                    </Button>
                </div>
            </div>
        </form>
    );
};
export default TestSetForm;
