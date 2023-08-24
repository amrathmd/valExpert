// Dashboard.js
import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import './ProjectDashboard1.css';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Requirements from './Requirements/Requirement';
import RequirementSetForm from './Requirements/RequirementSetsForm';
import axios from 'axios';
import { react_backend_url } from '../../config';
import TestSetForm from './TestSet/TestSetForm';
import { useParams } from 'react-router-dom';
import StickyHeader from '../../components/ProjectHeader/StickyHeader';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import './ProjectDashboard1.css';
import TestSetDetails from './TestSet/TestSetDetails';
import TestScript from '../../components/Models/testScriptsmodel';
import LoadingPdf from '../../components/pdfLoader/LoadingPdf';
import RequirementHeader from './components/RequirementHeader';
import RequirementSetHeader from './components/RequirementSetHeader';
import TestSetHeader from './components/TestSetHeader';
import RequirementSetTable from './components/RequirementSetTable';
import TestSetTable from './components/TestSetTable';

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
    createdAt: string;
}

const Dashboard = () => {
    const [openRequirementSet, setOpenRequirementSet] =
        useState<boolean>(false);
    const [openTestSets, setOpenTestSets] = useState<boolean>(false);
    const [testSet, setTestSet] = useState([]);
    const [openTestSet, setOpenTestSet] = useState<boolean>(false);
    const [openTestCase, setOpentestCase] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState(0);
    const [selectedRequirementSet, setSelectedRequirementSet] = useState<
        string | null
    >(null);
    const [SelectedTestCase, setSelectedTestCase] = useState<string | null>(
        null
    );
    const [selectedTestSet, setSelectedTestSet] = useState(null);

    const [requirementSets, setRequirementSets] = useState<Requirement[]>([]);
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
    const [pdfUrl, setPdfUrl] = useState('');
    const [loadingPdf, setLoadingPdf] = useState<boolean>(false);

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
        setTestSetForm(!testSetForm);
        setSelectedTestSet(null);
        setSelectedList(0);
    };
    const handleTestSetFormClose = () => {
        setTestSetForm(!testSetForm);
        setSelectedTestSet(null);
        setSelectedList(2);
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
            console.log(selectedList);
        };
        FetchRequirementSets();
    }, [requirementSetForm, selectedList]);
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
    }, [testSetForm]);

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
    const handleDownloadPdf = async () => {
        try {
            setLoadingPdf(true);

            const response = await axios.get(
                `${react_backend_url}/v1/projects/${projectId}/generate-pdf`,
                { responseType: 'arraybuffer' } // Tell Axios to treat the response as binary data
            );

            const pdfBlob = new Blob([response.data], {
                type: 'application/pdf',
            });

            const pdfUrl = URL.createObjectURL(pdfBlob);

            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'project.pdf';
            link.click();

            URL.revokeObjectURL(pdfUrl);
            setLoadingPdf(false);
        } catch (error) {
            console.error('Error downloading PDF:', error);
            setLoadingPdf(false);
        }
    };
    const formatDate = (dateString: string) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        } as Intl.DateTimeFormatOptions;
        const formattedDate = new Date(dateString).toLocaleDateString(
            undefined,
            options
        );
        return formattedDate;
    };
    return (
        <div>
            <StickyHeader />
            {loadingPdf && <LoadingPdf />}
            {selectedRequirementSet && (
                <RequirementHeader
                    project={project}
                    handleReqFormActive={handleReqFormActive}
                    handleDownloadPdf={handleDownloadPdf}
                />
            )}
            {selectedList === 1 && (
                <RequirementSetHeader
                    handleRequirementSet={handleRequirementSet}
                />
            )}
            {selectedList === 2 && (
                <TestSetHeader handleTestSetForm={handleTestSetForm} />
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
                <div className="content-bar">
                    {/*project && <ProjectDetails project={project} />*/}
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
                    {selectedList === 1 && (
                        <RequirementSetTable
                            requirementSets={requirementSets}
                        />
                    )}
                    {selectedList === 2 && openTestSets && (
                        <TestSetTable testSets={testSets} />
                    )}
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
                            <TestSetForm
                                handleTestSetForm={handleTestSetFormClose}
                                projectId={projectId}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
