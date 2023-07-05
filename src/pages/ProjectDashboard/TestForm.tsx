import React from 'react';
interface TestSetFormProps {
    createTestDetails: () => void;
}
const TestForm: React.FC<TestSetFormProps> = ({ createTestDetails }) => {
    return (
        <div className="req-form-container">
            <div className="req-form">
                <div className="heading">
                    <h2>TestSet Details</h2>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="ReqId">
                        TestSet Name
                    </label>
                    <input type="text" placeholder="TestSet Name" />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reqname">
                        RequirementSet Name
                    </label>
                    <input type="text" placeholder="RrquirementSet Name" />
                </div>
                <div className="req-item">
                    <label
                        className="req-label"
                        htmlFor="RequirementDescription"
                    >
                        Description
                    </label>
                    <textarea rows={4} cols={34}></textarea>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reference Category">
                        Category
                    </label>
                    <select id="req-dropdown">
                        <option value="">IQ</option>
                        <option value="option1">OQ</option>
                        <option value="option2">PQ</option>
                        <option value="option3">UAT</option>
                        <option value="option4">FAT</option>
                        <option value="option5">Integration Test</option>
                        <option value="option6">Unit Tests</option>
                        <option value="option7">Smoke Test</option>
                    </select>
                </div>

                <div className="req-item">
                    <label className="req-label" htmlFor="Verification">
                        Status
                    </label>
                    <select id="req-dropdown">
                        <option value="">Approved</option>
                        <option value="option1">Draft</option>
                        <option value="option2">In Review</option>
                    </select>
                </div>
                <div className="req-submit">
                    <button className="req-cancel">Cancel</button>
                    <button className="req-confirm" onClick={createTestDetails}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
export default TestForm;
