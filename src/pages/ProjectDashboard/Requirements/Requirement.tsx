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
    setSelectedList: (selectedList: number) => void;
}

const Requirements: React.FC<Props> = ({
    selectedItem,
    selectedRequirementSet,
    projectId,
    RequirementSets,
    handleReqFormActive,
    isReqFormActive,
    setSelectedList,
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
                    {isReqFormActive ? (
                        <ReqForm
                            handleFormActive={handleReqFormActive}
                            selectedRequirementSet={selectedRequirementSet}
                            setSelectedList={setSelectedList}
                        />
                    ) : (
                        <Requirementsdetails
                            selectedRequirementSet={selectedRequirementSet}
                            setSelectedList={setSelectedList}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Requirements;
