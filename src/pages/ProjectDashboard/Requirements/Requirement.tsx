import React from 'react';
import ReqForm from './RequirementForm';

import RequirementSetForm from './RequirementSetsForm';
import './Requirements.css';
import { react_backend_url } from '../../../config';
import axios from 'axios';
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Requirementsdetails from './Requirementsdetails';

interface Props {
    selectedItem: number;
    selectedRequirementSet: any;
    projectId: string;
    RequirementSets: any;
    handleReqFormActive: any;
    isReqFormActive: boolean;
}

const Requirements: React.FC<Props> = ({
    selectedItem,
    selectedRequirementSet,
    projectId,
    RequirementSets,
    handleReqFormActive,
    isReqFormActive,
}) => {
    const [requirements, setRequirements] = React.useState([]);
    const [requirementSetFrom, setRequirmentSetForm] =
        React.useState<boolean>(false);
    const [requirementSets, setRequirementSets] = React.useState([]);
    const [selectedRequirements, setSelectedRequirements] = React.useState([]);

    const handleRequirementSet = () => {
        setRequirmentSetForm(!requirementSetFrom);
    };
    React.useEffect(() => {
        const FetchRequirementSets = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/requirementset/project/${projectId}`
            );
            setRequirementSets(result.data);
        };
        FetchRequirementSets();
    }, []);

    return (
        <div className="parent-requirement-set">
            {/* {selectedItem === 1 && RequirementSets.length === 0 && (
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
            )} */}
            {requirementSetFrom && (
                <div className="blur-background">
                    <div className="requirementsetform">
                        <RequirementSetForm
                            handleRequirementSet={handleRequirementSet}
                            projectId={projectId}
                        />
                    </div>
                </div>
            )}

            {selectedRequirementSet && (
                <div>
                    {/* <button
                        className="create-reqSet-button"
                        onClick={handleReqFormActive}
                    >
                        Create Requirements
                    </button> */}
                    {isReqFormActive ? (
                        <ReqForm
                            handleFormActive={handleReqFormActive}
                            selectedRequirementSet={selectedRequirementSet}
                        />
                    ) : (
                        <Requirementsdetails
                            selectedRequirementSet={selectedRequirementSet}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Requirements;
