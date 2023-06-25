import React from 'react';
import './ReqForm.css';
const ReqForm = () => {
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
                    <input type="text" />
                </div>
                <div className="req-item">
                    <label className="req-label" htmlFor="Reference SOP">
                        Reference SOP
                    </label>
                    <input type="text" />
                </div>
                <div className="req-submit">
                    <button className="req-cancel">Cancel</button>
                    <button className="req-confirm">Confirm</button>
                </div>
            </div>
        </div>
    );
};

export default ReqForm;
