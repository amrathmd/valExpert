import React from 'react';
import ReqForm from './RequirementForm';
import Table from '../Table';
import RequirementSetForm from './RequirementSetsForm';

interface Props {
    selectedItem: number;
    selectedRequirementSet: any;

    RequirementSets: any;
}

interface TableColumn {
    key: string;
    label: string;
}

const Requirements: React.FC<Props> = ({
    selectedItem,
    selectedRequirementSet,

    RequirementSets,
}) => {
    const [isReqFormActive, setReqFormActive] = React.useState<boolean>(false);
    const [requirements, setRequirements] = React.useState([]);
    const [requirementSetFrom, setRequirmentSetForm] =
        React.useState<boolean>(false);

    const handleFormActive = () => {
        setReqFormActive(!isReqFormActive);
    };
    const createRequirementSet = () => {
        setRequirmentSetForm(!requirementSetFrom);
    };

    const createRequirements = () => {
        const entry = {
            RequirementId: 1900,
            RequirementSetId: 1094,
            RequirementDescription: 'Hello',
            RequirementCategory: 'Comedy',
            ReferenceSOP: 'Hi',
            Verification: 'Done',
        };
        setRequirements([[...requirements], entry]);
        console.log(requirements);
        handleFormActive();
    };

    const requirementsColumns: TableColumn[] = [
        { key: 'RequirementId', label: 'Requirement Id' },
        { key: 'RequirementSetId', label: 'RequirementSet Id' },
        { key: 'RequirementDescription', label: 'Requirement Description' },
        { key: 'RequirementCategory', label: 'Reference Category' },
        { key: 'ReferenceSOP', label: 'Reference SOP' },
        { key: 'Verification', label: 'Verification' },
    ];

    return (
        <div>
            {selectedItem === 1 && RequirementSets.length === 0 && (
                <div className="message">
                    <div>
                        <p className="para">
                            Welcome to our project Dashboard!
                        </p>
                        <ul className="dot-list">
                            <li>
                                You have the power to add requirements from your
                                project enabling
                                <br /> effective development for Enhanced
                                Project development.
                            </li>
                            <li>
                                We believe that by adding requirement sets for
                                your project and
                                <br />
                                you'll unlock the full potential of our platform
                                .
                            </li>
                        </ul>
                        <span
                            className="create-button"
                            onClick={createRequirementSet}
                        >
                            Create Requirement sets
                        </span>
                    </div>
                </div>
            )}

            {selectedRequirementSet && (
                <div>
                    <button
                        className="create-reqSet-button"
                        onClick={handleFormActive}
                    >
                        Create Requirements
                    </button>
                    {isReqFormActive ? (
                        <ReqForm
                            handleFormActive={handleFormActive}
                            createRequirements={createRequirements}
                        />
                    ) : (
                        <Table
                            data={requirements}
                            columns={requirementsColumns}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Requirements;
