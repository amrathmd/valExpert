import React, { useState } from 'react';
import { TestSet } from '@/components/Models/testsetsModel';
import axios from 'axios';

interface TestSetFormProps {
    refresh: () => void;
    handleFormActive: () => void;
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

const TestForm: React.FC<TestSetFormProps> = ({
    refresh,
    handleFormActive,
}) => {
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
        handleFormActive();
        refresh();
    };

    return (
        <form className="req-form-container" onSubmit={handleSubmit}>
            <div className="req-form">
                <div className="heading">
                    <h2>TestSet Details</h2>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="ProjectId">
                        Project Id
                    </label>
                    <input
                        type="text"
                        value={testSet.projectId}
                        placeholder="Project Id "
                        onChange={(e) =>
                            updateTestSet('projectId', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Requirement Id">
                        ReuirementSet Id
                    </label>
                    <input
                        type="text"
                        value={testSet.requirementSetId}
                        placeholder="RequirementSet Id"
                        onChange={(e) =>
                            updateTestSet('requirementSetId', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="ReqId">
                        TestSet Name
                    </label>
                    <input
                        type="text"
                        value={testSet.testName}
                        placeholder="TestSet Name"
                        onChange={(e) =>
                            updateTestSet('testName', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reqname">
                        RequirementSet Name
                    </label>
                    <input
                        type="text"
                        value={testSet.requirementSetName}
                        placeholder="RequirementSet Name"
                        onChange={(e) =>
                            updateTestSet('requirementSetName', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label
                        className="req-label"
                        htmlFor="RequirementDescription"
                    >
                        Description
                    </label>
                    <textarea
                        rows={4}
                        cols={34}
                        onChange={(e) =>
                            updateTestSet('description', e.target.value)
                        }
                    >
                        {testSet.description}
                    </textarea>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reference Category">
                        Category
                    </label>
                    <select
                        id="req-dropdown"
                        onChange={(e) =>
                            updateTestSet('category', e.target.value)
                        }
                    >
                        <option value="IQ">IQ</option>
                        <option value="OQ">OQ</option>
                        <option value="PQ">PQ</option>
                        <option value="UAT">UAT</option>
                        <option value="FAT">FAT</option>
                        <option value="Integration Test">
                            Integration Test
                        </option>
                        <option value="Unit Tests">Unit Tests</option>
                        <option value="Smoke Test">Smoke Test</option>
                    </select>
                </div>

                <div className="req-item">
                    <label className="req-label" htmlFor="Verification">
                        Status
                    </label>
                    <select
                        id="req-dropdown"
                        onChange={(e) =>
                            updateTestSet('status', e.target.value)
                        }
                    >
                        <option value="Approved">Approved</option>
                        <option value="Draft">Draft</option>
                        <option value="In Review">In Review</option>
                    </select>
                </div>
                <div className="req-submit">
                    <button type="reset" className="req-cancel">
                        Cancel
                    </button>
                    <button type="submit" className="req-confirm">
                        Confirm
                    </button>
                </div>
            </div>
        </form>
    );
};
export default TestForm;
