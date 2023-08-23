import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    Collapse,
    List,
    ListItemButton,
    ListItemText,
    ListSubheader,
    Typography,
} from '@mui/material';
import React from 'react';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import TestScript from '../../../components/Models/testScriptsmodel';
const defaultProject = [
    { key: 'projectName', label: 'Project Name' },
    { key: 'facility', label: 'Facility' },
    { key: 'department', label: 'Department' },
    { key: 'country', label: 'Country' },
    { key: 'scope', label: 'Scope' },
    { key: 'category', label: 'Category' },
    { key: 'description', label: 'Project Description' },
    { key: 'estimationDate', label: 'Estimation Date' },
];
interface ProjectInterface {
    projectName: string;
    purpose: string;
    status: 'Active' | 'Inactive';
    activationDate: Date;
    inactivationDate: Date;
    facility: string[];
    department: string[];
    country: string[];
    scope?: string[];
    category?: string;
    description: string;
    estimationDate?: Date;
    applicationName?: string;
    applicationVersion?: number;
    changeControlNumber?: string;
    owner?: string;
    requirementsets: string[];
    testsets: string[];
    createdAt: Date;
    updatedAt: Date;
}
interface Requirement {
    _id?: string;
    name: string;
    projectId: string;
    status: string;
    testsetId?: string;
    version: string;
    requirements: string[];
}
interface TestSet {
    Type: string;
    _id: string;
    testSetName: string;
    status: string;
    version: string;
    createdAt: string;
    description: string;
    category: string;
    testScripts: TestScript[];
}
interface Defects {
    _id?: string;
}
interface props {
    project: ProjectInterface;

    requirementSets: Requirement[];
    testSets: TestSet[];

    handleTestSetSelectedClick: (testsetId: any) => void;
    selectedRequirementSet: string;
    setSelectedRequirementSet: (id: string) => void;
    selectedList: number;
    setSelectedList: (n: number) => void;
    selectedTestSet: string;
    setSelectedTestSet: (id: string) => void;
    setTestSetForm: (state: boolean) => void;
}

const SideBar: React.FC<props> = ({
    project,
    requirementSets,
    testSets,
    selectedList,
    setSelectedList,
    selectedRequirementSet,
    setSelectedRequirementSet,
    selectedTestSet,
    setSelectedTestSet,
    setTestSetForm,
}) => {
    const [openRequirementSet, setOpenRequirementSet] =
        React.useState<boolean>(false);

    const [openTestSets, setOpenTestSets] = React.useState<boolean>(false);
    const [openTestSet, setOpenTestSet] = React.useState<boolean>(false);
    const [openDefects, setOpenDefects] = React.useState<boolean>(false);
    const [selectedDefect, setSelectedDefect] = React.useState(null);
    const [openTestCase, setOpentestCase] = React.useState<boolean>(false);

    const handleClick = () => {
        setOpenRequirementSet(!openRequirementSet);
        setSelectedList(1);
        setSelectedTestSet(null);
        setSelectedRequirementSet(null);
    };
    const handleRequirementSetClick = (reqSetId: string) => {
        setSelectedRequirementSet(reqSetId);
        console.log(selectedRequirementSet);
        setSelectedList(0);
        setSelectedTestSet(null);
        setTestSetForm(false);
    };
    const handleTestsSetClick = () => {
        setOpenTestSets(!openTestSets);
        setOpenTestSet(false);
        setOpentestCase(false);
        setSelectedList(2);
        setSelectedRequirementSet(null);
        setSelectedTestSet(null);
        setTestSetForm(false);
    };
    const handleTestSetSelectedClick = (id: string) => {
        if (selectedTestSet === id && openTestSet === true) {
            setOpenTestSet(false);
            setSelectedList(1); // Update selectedList for collapsing the test set
        } else {
            setOpenTestSet(true);
            setSelectedList(2); // Update selectedList for expanding the test set
        }
        setSelectedTestSet(id);
        setOpentestCase(false);
        setSelectedRequirementSet(null);
        setTestSetForm(false);
    };
    const handleDefectClick = () => {
        setOpenDefects(!openDefects);
    };
    const handleDefectSelectedClick = (id: string) => {
        setSelectedDefect(id);
    };

    const Defects = [
        {
            _id: '1001',
            defectName: 'hello',
        },
        {
            _id: '1002',
            defectName: 'world',
        },
    ];

    return (
        <div className="projectdashboard">
            <div className="dashboard-sidebar">
                <List
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                    }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                        >
                            Project:{' '}
                            {project ? project.projectName : 'Loading...'}
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick}>
                        <FolderOutlinedIcon />
                        <ListItemText
                            sx={{ marginLeft: 2 }}
                            primary="Requirement sets"
                        />
                        {openRequirementSet ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                        in={openRequirementSet}
                        timeout="auto"
                        unmountOnExit
                    >
                        <List component="div" disablePadding>
                            {requirementSets.map((requirements) => (
                                <ListItemButton
                                    key={requirements._id}
                                    sx={{
                                        pl: 5,
                                        backgroundColor:
                                            selectedRequirementSet ===
                                            requirements._id
                                                ? 'rgba(0, 0, 0, 0.1)'
                                                : 'transparent',
                                    }}
                                    onClick={() =>
                                        handleRequirementSetClick(
                                            requirements._id
                                        )
                                    }
                                >
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {requirements.name}
                                    </Typography>
                                </ListItemButton>
                            ))}
                        </List>
                    </Collapse>
                    <ListItemButton onClick={handleTestsSetClick}>
                        <FolderOutlinedIcon />
                        <ListItemText
                            sx={{ marginLeft: 2 }}
                            primary="Test sets"
                        />
                        {openTestSets ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openTestSets} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {testSets.map((testset) => (
                                <>
                                    <ListItemButton
                                        key={testset._id}
                                        sx={{
                                            pl: 5,
                                            backgroundColor:
                                                selectedTestSet === testset._id
                                                    ? 'rgba(0, 0, 0, 0.1)'
                                                    : 'transparent',
                                        }}
                                        onClick={() =>
                                            handleTestSetSelectedClick(
                                                testset._id
                                            )
                                        }
                                    >
                                        <ListItemButton>
                                            <ListItemText
                                                primary={`${testset.testSetName}`}
                                            />
                                            {openTestSet &&
                                            testset._id === selectedTestSet ? (
                                                <ExpandLess />
                                            ) : (
                                                <ExpandMore />
                                            )}
                                        </ListItemButton>
                                    </ListItemButton>
                                    <Collapse
                                        in={
                                            openTestSet &&
                                            testset._id === selectedTestSet
                                        }
                                        timeout="auto"
                                        unmountOnExit
                                    ></Collapse>
                                </>
                            ))}
                        </List>
                    </Collapse>
                    <ListItemButton onClick={handleDefectClick}>
                        <FolderOutlinedIcon />
                        <ListItemText
                            sx={{ marginLeft: 2 }}
                            primary="Defects"
                        />
                        {openDefects ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openDefects} timeout="auto" unmountOnExit>
                        {Defects.map((defect) => (
                            <ListItemButton
                                key={defect._id}
                                sx={{
                                    pl: 5,
                                    backgroundColor:
                                        selectedDefect === defect._id
                                            ? 'rgba(0, 0, 0, 0.1)'
                                            : 'transparent',
                                }}
                                onClick={() =>
                                    handleDefectSelectedClick(defect._id)
                                }
                            >
                                <Typography variant="subtitle2" gutterBottom>
                                    {defect.defectName}
                                </Typography>
                            </ListItemButton>
                        ))}
                    </Collapse>
                </List>
            </div>
        </div>
    );
};
export default SideBar;
