import React from 'react';
interface props {
    handleRequirementSet: () => void;
}

const RequirementSetHeader: React.FC<props> = ({ handleRequirementSet }) => {
    return (
        <div>
            <div className="requirementSets-header">
                <p>Requirement Sets Details</p>
                <button>
                    <div className="req-add" onClick={handleRequirementSet}>
                        <img src={'../../../public/plus.svg'} alt="" />
                        <p>Add Requirement Set</p>
                    </div>
                </button>
            </div>
            <div className="title-underline"></div>
        </div>
    );
};
export default RequirementSetHeader;
