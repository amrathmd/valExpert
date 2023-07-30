import React, { useState } from 'react';
import { TestCase } from '@/components/Models/testCasesmodel';
import axios from 'axios';

interface TestCaseFormProps {
    handleFormActive: () => void;
    selectedTestSetId: string | null;
}

const defaultTestCase = {
    testsetId: '',
    Type: '',
    purpose: '',
    acceptanceCriteria: '',
    prerequesites: '',
    result: 'Pass',
    author: '',
};

const TestCasesForm: React.FC<TestCaseFormProps> = ({
    handleFormActive,
    selectedTestSetId,
}) => {
    const [testCase, setTestCase] = useState(defaultTestCase);

    const updateTestCase = (field: string, value: any) => {
        setTestCase((prevTestCase) => {
            return {
                ...prevTestCase,
                [field]: value,
            };
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(testCase);
        const res = await axios.post('http://localhost:3000/v1/testcases', {
            testCase,
        });
        console.log('res post', res);
        if (!res) {
            window.alert('error');
            return;
        }
        window.alert('success');
        handleFormActive();
    };

    return (
        <form className="req-form-container" onSubmit={handleSubmit}>
            <div className="req-form">
                <div className="heading">
                    <h2>TestCase Details</h2>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="testsetId">
                        Testset Id
                    </label>
                    <input
                        type="text"
                        value={testCase.testsetId}
                        placeholder="Testset Id "
                        onChange={(e) =>
                            updateTestCase('testsetId', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Category">
                        Type
                    </label>
                    <select
                        id="req-dropdown"
                        onChange={(e) => updateTestCase('Type', e.target.value)}
                    >
                        <option value="iQ">IQ</option>
                        <option value="oQ">OQ</option>
                        <option value="pQ">PQ</option>
                        <option value="uAT">UAT</option>
                        <option value="fAT">FAT</option>
                        <option value="integration Test">
                            Integration Test
                        </option>
                        <option value="unit Tests">Unit Tests</option>
                        <option value="smoke Test">Smoke Test</option>
                    </select>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="purpose">
                        Purpose
                    </label>
                    <input
                        type="text"
                        value={testCase.purpose}
                        placeholder="Purpose"
                        onChange={(e) =>
                            updateTestCase('purpose', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="acceptance criteria">
                        Acceptance Criteria
                    </label>
                    <input
                        type="text"
                        value={testCase.acceptanceCriteria}
                        placeholder="RequirementSet Name"
                        onChange={(e) =>
                            updateTestCase('acceptanceCriteria', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="prerequisites">
                        Prerequesites
                    </label>
                    <input
                        type="text"
                        value={testCase.prerequesites}
                        placeholder="Prerequisites"
                        onChange={(e) =>
                            updateTestCase('prerequesites', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="result">
                        Result
                    </label>
                    <select
                        id="req-dropdown"
                        onChange={(e) =>
                            updateTestCase('result', e.target.value)
                        }
                    >
                        <option value="pass">Pass</option>
                        <option value="fail">Fail</option>
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="author">
                        Author
                    </label>
                    <input
                        type="text"
                        value={testCase.author}
                        placeholder="Author Name"
                        onChange={(e) =>
                            updateTestCase('author', e.target.value)
                        }
                    />
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
export default TestCasesForm;
