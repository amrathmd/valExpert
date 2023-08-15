import React, { useState } from 'react';
import { TestSet } from '@/components/Models/testsetsModel';
import axios from 'axios';
import './TestSetForm.css';
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
import { react_backend_url } from '../../../config';

interface TestSetFormProps {
    handleTestSetForm: () => void;
    projectId: string;
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

const TestSetForm: React.FC<TestSetFormProps> = ({
    handleTestSetForm,
    projectId,
}) => {
    const [testSet, setTestSet] = useState(defaultTestSet);
    const [requirementSets, setRequirementSets] = useState([]);

    const updateTestSet = (field: string, value: any) => {
        setTestSet((prevTestSet) => {
            return {
                ...prevTestSet,
                [field]: value,
            };
        });
    };
    React.useEffect(() => {
        const FetchRequirementSets = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/requirementset/project/${projectId}`
            );
            setRequirementSets(result.data);
        };
        FetchRequirementSets();
    }, []);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        //testSet.projectId = projectId;

        const requiredReq = requirementSets.find(
            (item) => item._id === testSet.requirementSetId
        );

        testSet.requirementSetName = requiredReq.name;
        testSet.projectId = projectId;
        console.log(testSet);
        const res = await axios.post(`${react_backend_url}/v1/testsets`, {
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
        <form className="test-form-container" onSubmit={handleSubmit}>
            <div className="test-form">
                <div className="heading">
                    <h2>TestSet Details</h2>
                </div>

                <div className="test-item">
                    <FormControl fullWidth>
                        <FormLabel>Requirement Set</FormLabel>
                        <Select
                            value={testSet.requirementSetId}
                            onChange={(e) =>
                                updateTestSet(
                                    'requirementSetId',
                                    e.target.value
                                )
                            }
                        >
                            {requirementSets.map((requirementSet) => (
                                <MenuItem
                                    value={requirementSet._id}
                                    key={requirementSet._id}
                                >
                                    {requirementSet.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div className="test-item">
                    <TextField
                        fullWidth
                        label="TestSet Name"
                        value={testSet.testName}
                        placeholder="TestSet Name"
                        onChange={(e) =>
                            updateTestSet('testName', e.target.value)
                        }
                    />
                </div>

                <div className="test-item">
                    <InputLabel>Description</InputLabel>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        value={testSet.description}
                        onChange={(e) =>
                            updateTestSet('description', e.target.value)
                        }
                    />
                </div>
                <div className="test-item">
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
                <div className="test-item">
                    <FormControl fullWidth>
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
                </div>
                <div className="test-submit">
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
