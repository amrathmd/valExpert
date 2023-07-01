import React from 'react';
import './ReqForm.css';

interface ReqFormProps {
    createRequirements: () => void;
    handleFormActive: () => void;
}
const ReqForm: React.FC<ReqFormProps> = ({
    createRequirements,
    handleFormActive,
}) => {
    return (
        <div className="req-form-container">
            <div className="req-form">
                <div className="req-item">
                    <label className="req-label" htmlFor="ReqId">
                        Requirement Id
                    </label>
                    <input type="number" />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="ReqSetId">
                        RequirementSet Id
                    </label>
                    <input type="number" />
                </div>
                <div className="req-item">
                    <label
                        className="req-label"
                        htmlFor="RequirementDescription"
                    >
                        Requirement Description
                    </label>
                    <input type="textarea" />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reference Category">
                        Reference Category
                    </label>
                    <select id="req-dropdown">
                        <option value="">User Requirement</option>
                        <option value="option1">Functional Requirement</option>
                        <option value="option2">Technical Requirement</option>
                        <option value="option3">Physical Requirement</option>
                        <option value="option3">Regulatory Requirement</option>
                        <option value="option3">Other Requirement</option>
                    </select>
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reference SOP">
                        Reference SOP
                    </label>
                    <input type="text" />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Verification">
                        Verification
                    </label>
                    <select id="req-dropdown">
                        <option value="">Testing</option>
                        <option value="option1">Procedure</option>
                        <option value="option2">Testing and Procedure</option>
                    </select>
                </div>
                <div className="req-submit">
                    <button className="req-cancel" onClick={handleFormActive}>
                        Cancel
                    </button>
                    <button
                        className="req-confirm"
                        onClick={createRequirements}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReqForm;
