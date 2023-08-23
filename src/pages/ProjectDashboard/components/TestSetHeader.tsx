import React from 'react';
interface props {
    handleTestSetForm: () => void;
}
const TestSetHeader: React.FC<props> = ({ handleTestSetForm }) => {
    return (
        <div>
            <div className="requirementSets-header">
                <p>Test Sets Details</p>
                <button>
                    <div className="req-add" onClick={handleTestSetForm}>
                        <img src={'../../../public/plus.svg'} alt="" />
                        <p>Add Test Set</p>
                    </div>
                </button>
            </div>
            <div className="title-underline"></div>
        </div>
    );
};
export default TestSetHeader;
