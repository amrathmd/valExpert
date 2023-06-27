import React from 'react';
import ReqForm from './ReqForm';
import Table from './Table';

interface TableColumn {
    key: string;
    label: string;
}

interface RequirementsProps {
    selectedItem: number;
    selectedRequirementSet: any;
    createRequirementSet: () => void;
}

const Requirements: React.FC<RequirementsProps> = ({
    selectedItem,
    selectedRequirementSet,
    createRequirementSet,
}) => {
    const [isReqFormActive, setReqFormActive] = React.useState<boolean>(false);
    const [requirements, setRequirements] = React.useState<any[]>([]);

    const requirementsColumns: TableColumn[] = [
        { key: 'RequirementId', label: 'Requirement Id' },
        { key: 'RequirementSetId', label: 'RequirementSet Id' },
        { key: 'RequirementDescription', label: 'Requirement Description' },
        { key: 'RequirementCategory', label: 'Reference Category' },
        { key: 'ReferenceSOP', label: 'Reference SOP' },
        { key: 'Verification', label: 'Verification' },
    ];

    const createRequirements = () => {
        const entry = {
            RequirementId: 1900,
            RequirementSetId: 1094,
            RequirementDescription: 'Hello',
            RequirementCategory: 'Comedy',
            ReferenceSOP: 'Hi',
            Verification: 'Done',
        };
        setRequirements([...requirements, entry]);
        console.log(requirements);
        handleFormActive();
    };

    const handleFormActive = () => {
        setReqFormActive(!isReqFormActive);
    };

    return (
        <>
            {selectedItem === 1 && (
                <div>
                    <button
                        className="create-reqSet-button"
                        onClick={createRequirementSet}
                    >
                        Create Requirement Set
                    </button>
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
        </>
    );
};

export default Requirements;
