import React, { useState } from 'react';
import { TestScript } from '@/components/Models/testscriptsModel';
import axios from 'axios';

interface TestScriptFormProps {
    refreshscripts: () => void;
    handleFormActive: () => void;
}

const defaultTestScript = {
    // scriptId: '',
    scriptName: '',
    testName: '',
    description: '',
    category: 'IQ',
    status: 'Approved',
};

const TestscriptsFrom: React.FC<TestScriptFormProps> = ({
    refreshscripts,
    handleFormActive,
}) => {
    const [testScript, setTestScript] = useState(defaultTestScript);

    const updateTestScript = (field: string, value: any) => {
        setTestScript((prevTestScript) => {
            return {
                ...prevTestScript,
                [field]: value,
            };
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:3000/v1/testscripts', {
            testScript,
        });
        console.log('res post', res);
        if (!res) {
            window.alert('error');
            return;
        }
        window.alert('success');
        handleFormActive();
        refreshscripts();
    };

    return (
        <form className="req-form-container" onSubmit={handleSubmit}>
            <div className="req-form">
                <div className="heading">
                    <h2>TestScript Details</h2>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="scriptId">
                        TestScript Id
                    </label>
                    <input
                        type="text"
                        // value={testScript.scriptId}
                        placeholder="script Id"
                        onChange={(e) =>
                            updateTestScript('scriptId', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="scriptName">
                        TestScript Name
                    </label>
                    <input
                        type="text"
                        value={testScript.scriptName}
                        placeholder="script Name"
                        onChange={(e) =>
                            updateTestScript('scripName', e.target.value)
                        }
                    />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reqname">
                        TestSet Name
                    </label>
                    <input
                        type="text"
                        value={testScript.testName}
                        placeholder="testset Name"
                        onChange={(e) =>
                            updateTestScript('testName', e.target.value)
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
                            updateTestScript('description', e.target.value)
                        }
                    >
                        {testScript.description}
                    </textarea>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reference Category">
                        Category
                    </label>
                    <select
                        id="req-dropdown"
                        onChange={(e) =>
                            updateTestScript('category', e.target.value)
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
                            updateTestScript('status', e.target.value)
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
export default TestscriptsFrom;
