import React from 'react';
import ReqForm from './RequirementForm';
import Table from '../Table';
import RequirementSetForm from './RequirementSetsForm';
import './Requirements.css';
import { react_backend_url } from '../../../config';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

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
    const [requirementSets, setRequirementSets] = React.useState([]);

    const handleFormActive = () => {
        setReqFormActive(!isReqFormActive);
    };
    const handleRequirementSet = () => {
        setRequirmentSetForm(!requirementSetFrom);
    };
    React.useEffect(() => {
        const FetchRequirementSets = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/requirementset`
            );
            setRequirementSets(result.data);
            console.log(result.data);
        };
        FetchRequirementSets();
    }, []);
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
    const handleEditRequirment = () => {
        console.log(true);
    };
    const handleDeleteRequirement = () => {
        console.log(true);
    };

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
                            onClick={handleRequirementSet}
                        >
                            Create Requirement sets
                        </span>
                    </div>
                </div>
            )}
            {requirementSetFrom && (
                <div className="blur-background">
                    <div className="requirementsetform">
                        <RequirementSetForm
                            handleRequirementSet={handleRequirementSet}
                        />
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
                        <table className="content-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Mobile</th>
                                    <th>Email</th>
                                    <th>Status</th>
                                    <th>Manage requirement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requirements.map((requirement) => (
                                    <tr key={requirement._id}>
                                        <td>{requirement.name}</td>
                                        <td>{requirement.mobile}</td>
                                        <td>{requirement.email}</td>
                                        <td>{requirement.status}</td>
                                        <td>
                                            <>
                                                <div className="action-icon">
                                                    <a
                                                        onClick={() =>
                                                            handleEditRequirment
                                                        }
                                                    >
                                                        <Tooltip
                                                            title="Edit User"
                                                            placement="top-end"
                                                        >
                                                            <EditIcon></EditIcon>
                                                        </Tooltip>
                                                    </a>
                                                    <a
                                                        onClick={() =>
                                                            handleDeleteRequirement
                                                        }
                                                    >
                                                        <Tooltip
                                                            title="Delete User"
                                                            placement="top-end"
                                                        >
                                                            <DeleteOutlineIcon></DeleteOutlineIcon>
                                                        </Tooltip>
                                                    </a>
                                                </div>
                                            </>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default Requirements;
