// Dashboard.js
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListSubheader from '@mui/material/ListSubheader';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import './ProjectDashboard1.css';
import {
    Button,
    Collapse,
    IconButton,
    ListItemIcon,
    useTheme,
} from '@mui/material';
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material';
import Requirements from './Requirements/Requirement';
import TestSets from './TestSet/TestSetDetails';
import RequirementSetForm from './Requirements/RequirementSetsForm';
import axios from 'axios';
import { react_backend_url } from '../../config';
import TestSetForm from './TestSet/TestSetForm';
import DashboardContext from '../../contexts/dashboardContext';
import { useParams } from 'react-router-dom';
import { project } from 'esri/geometry/projection';
import StickyHeader from '../../components/ProjectHeader/StickyHeader';
import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import Tooltip from '@mui/material/Tooltip';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import './ProjectDashboard1.css';
import TestSetDetails from './TestSet/TestSetDetails';
import TestScript from '../../components/Models/testScriptsmodel';
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

interface TestSet {
    Type: string;
    _id: string;
    testSetName: string;
    testScripts: TestScript[];
}
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

const Dashboard = () => {
    const [openRequirementSet, setOpenRequirementSet] =
        useState<boolean>(false);
    const [openTestSets, setOpenTestSets] = useState<boolean>(false);
    const [testSet, setTestSet] = useState([]);
    const [openTestSet, setOpenTestSet] = useState<boolean>(false);
    const [openTestCase, setOpentestCase] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState(1);
    const [selectedRequirementSet, setSelectedRequirementSet] = useState<
        string | null
    >(null);
    const [SelectedTestCase, setSelectedTestCase] = useState<string | null>(
        null
    );
    const [selectedTestSet, setSelectedTestSet] = useState(null);

    const [requirementSets, setRequirementSets] = useState([]);
    const [requirementSetForm, setRequirementSetForm] =
        useState<boolean>(false);
    const [testSetForm, setTestSetForm] = useState<boolean>(false);
    const [selectedTestScript, setSelectedTestScript] = useState<string | null>(
        null
    );
    const [openDefects, setOpenDefects] = useState<boolean>(false);
    const [selectedDefect, setSelectedDefect] = useState(null);
    const [testSets, setTestSets] = useState<TestSet[]>([]);
    const [testScripts, setTestScripts] = useState<TestScript[]>([]);

    const [project, setProject] = useState<ProjectInterface>(null);
    const [isReqFormActive, setReqFormActive] = React.useState<boolean>(false);

    const handleReqFormActive = () => {
        setReqFormActive(!isReqFormActive);
        setTestSetForm(false);
    };
    const handleRequirementSet = () => {
        setRequirementSetForm(!requirementSetForm);
    };

    const { id: projectId } = useParams();
    const handleClick = () => {
        setOpenRequirementSet(!openRequirementSet);
        setSelectedList(1);
        setSelectedTestSet(null);
        setSelectedRequirementSet(null);
    };
    const handleRequirementSetClick = (reqSetId: any) => {
        setSelectedRequirementSet(reqSetId);
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

    const handleTestSetForm = () => {
        console.log('handleTestSetForm called');
        setTestSetForm(!testSetForm);
        setSelectedTestSet(null);
    };

    const handleTestCaseSelectedClick = (id: string) => {
        if (SelectedTestCase === id && openTestCase === true) {
            setOpentestCase(false);
        } else {
            setOpentestCase(true);
        }
        setSelectedTestCase(id);
    };

    const handleTestCaseClick = (id: string) => {
        console.log(id);
    };
    const handleTestScriptSelectedClick = (id: string) => {
        setSelectedTestScript(id);
    };
    const handleDefectClick = () => {
        setOpenDefects(!openDefects);
    };
    const handleDefectSelectedClick = (id: string) => {
        setSelectedDefect(id);
    };

    const findTestCases = async (testset: TestSet) => {
        const result = await axios.get(
            `${react_backend_url}/v1/testscripts/testset/${testset._id}`
        );
        setTestScripts(result.data);
    };
    // const findTestSteps = async (testcase: TestCase) => {
    //     const result = await axios.get(
    //         `${react_backend_url}/v1/teststeps/testscripts/${testcase._id}`
    //     );
    //     console.log(result.data);
    //     setTestScripts(result.data);
    // };
    React.useEffect(() => {
        const FetchRequirementSets = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/requirementset/project/${projectId}`
            );
            setRequirementSets(result.data);
        };
        FetchRequirementSets();
    }, [requirementSetForm]);
    React.useEffect(() => {
        const FetchTestSets = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/testsets/project/${projectId}`
            );
            setTestSets(result.data);
        };
        const FetchProject = async () => {
            const res = await axios.get(
                `${react_backend_url}/v1/projects/${projectId}`
            );
            setProject(res.data);
        };
        FetchTestSets();
        FetchProject();
    }, []);

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
    console.log(project);
    return (
        <div>
            <StickyHeader />
            {selectedRequirementSet && (
                <div>
                    <div className="req-header">
                        <div className="req-projectName">
                            {project && <p>Project: {project.projectName}</p>}
                        </div>
                        <div className="requirements-icons">
                            <div>
                                <TextField
                                    placeholder="Search"
                                    size="small"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>
                            <button>
                                <div
                                    className="req-add"
                                    onClick={handleReqFormActive}
                                >
                                    <img
                                        src={'../../../public/plus.svg'}
                                        alt=""
                                    />
                                    <p>Add Requirement</p>
                                </div>
                            </button>
                            <Tooltip title="Route" placement="top-end">
                                <div className="req-header-icons">
                                    <img
                                        src={'../../../public/back.png'}
                                        alt=""
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip title="version" placement="top-end">
                                <div className="req-header-icons">
                                    <img
                                        src={'../../../public/time.png'}
                                        alt=""
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip title="Pdf Download" placement="top-end">
                                <div className="req-header-icons">
                                    <img
                                        src={'../../../public/pdf.png'}
                                        alt=""
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip
                                title="Print this page"
                                placement="top-end"
                            >
                                <div className="req-header-icons">
                                    <img
                                        src={'../../../public/scanner.png'}
                                        alt=""
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip title="Version" placement="top-end">
                                <div className="req-header-icons">
                                    <img
                                        src={'../../../public/blocks.png'}
                                        alt=""
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top-end">
                                <div className="req-header-icons">
                                    <img
                                        src={'../../../public/del.png'}
                                        alt=""
                                    />
                                </div>
                            </Tooltip>
                            <Tooltip title="Edit" placement="top-end">
                                <div className="req-header-icons">
                                    <img
                                        src={'../../../public/ep_edit.png'}
                                        alt=""
                                    />
                                </div>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="req-header-underline"></div>
                </div>
            )}
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
                            {openRequirementSet ? (
                                <ExpandLess />
                            ) : (
                                <ExpandMore />
                            )}
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
                                <ListItemButton
                                    sx={{ pl: 5 }}
                                    onClick={handleRequirementSet}
                                >
                                    <Typography
                                        variant="caption"
                                        display="block"
                                        gutterBottom
                                    >
                                        <Add />
                                        Create Requirement set
                                    </Typography>
                                </ListItemButton>
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
                        <Collapse
                            in={openTestSets}
                            timeout="auto"
                            unmountOnExit
                        >
                            <List component="div" disablePadding>
                                {testSets.map((testset) => (
                                    <>
                                        <ListItemButton
                                            key={testset._id}
                                            sx={{
                                                pl: 5,
                                                backgroundColor:
                                                    selectedTestSet ===
                                                    testset._id
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
                                                testset._id ===
                                                    selectedTestSet ? (
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
                            <ListItemButton
                                sx={{ pl: 5 }}
                                onClick={handleTestSetForm}
                            >
                                <Typography
                                    variant="caption"
                                    display="block"
                                    gutterBottom
                                >
                                    <Add />
                                    Create Test set
                                </Typography>
                            </ListItemButton>
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
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        {defect.defectName}
                                    </Typography>
                                </ListItemButton>
                            ))}
                        </Collapse>
                    </List>
                </div>
            </div>
            <div className="content-bar">
                {project && selectedList === 1 && (
                    <div className="project-table-container">
                        <div>
                            <div className="project-table-header">
                                <h1>Project Details</h1>
                            </div>
                            <table className="project-table">
                                <tbody>
                                    {defaultProject.map((item) => (
                                        <tr key={item.key}>
                                            <td>
                                                <b>{item.label}</b>
                                            </td>
                                            <td>{project[item.key]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {selectedRequirementSet && (
                    <Requirements
                        selectedItem={selectedList}
                        selectedRequirementSet={selectedRequirementSet}
                        RequirementSets={requirementSets}
                        projectId={projectId}
                        handleReqFormActive={handleReqFormActive}
                        isReqFormActive={isReqFormActive}
                    />
                )}
                {selectedTestSet && (
                    <TestSetDetails
                        selectedItem={selectedList}
                        projectId={projectId}
                        testSet={selectedTestSet}
                    />
                )}
            </div>
            {requirementSetForm && (
                <div className="blur-background">
                    <div className="requirementsetform">
                        <RequirementSetForm
                            handleRequirementSet={handleRequirementSet}
                            projectId={projectId}
                        />
                    </div>
                </div>
            )}
            {testSetForm && (
                <div>
                    <h1>hello world</h1>
                    <TestSetForm
                        handleTestSetForm={handleTestSetForm}
                        projectId={projectId}
                    />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
