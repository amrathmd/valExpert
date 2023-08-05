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
import { Collapse, ListItemIcon } from '@mui/material';
import { Add, ExpandLess, ExpandMore } from '@mui/icons-material';
import Requirements from './Requirements/Requirement';
import TestSets from './TestSet/TestSetDetails';
import RequirementSetForm from './Requirements/RequirementSetsForm';
import axios from 'axios';
import { react_backend_url } from '../../config';
import TestSetForm from './TestSet/TestSetForm';

const Dashboard = () => {
    const [openRequirementSet, setOpenRequirementSet] =
        useState<boolean>(false);
    const [openTestSet, setOpenTestSet] = useState<boolean>(false);
    const [openTestCase, setOpentestCase] = useState<boolean>(false);
    const [selectedList, setSelectedList] = useState(0);
    const [selectedRequirementSet, setSelectedRequirementSet] = useState<
        string | null
    >(null);

    const [requirementSets, setRequirementSets] = useState([]);
    const [requirementSetForm, setRequirementSetForm] =
        useState<boolean>(false);
    const [testSetForm, setTestSetForm] = useState<boolean>(false);
    const handleRequirementSet = () => {
        setRequirementSetForm(!requirementSetForm);
    };
    // const [testSets, setTestSets] = useState([]);

    const handleClick = () => {
        setOpenRequirementSet(!openRequirementSet);
        setSelectedList(1);
    };
    const handleRequirementSetClick = (reqSetId: any) => {
        setSelectedRequirementSet(reqSetId);
    };
    const handleTestSetClick = () => {
        setOpenTestSet(!openTestSet);
        setSelectedList(2);
    };
    const handleTestSetForm = () => {
        setTestSetForm(true);
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
    const handleTestCaseClick = (id: string) => {
        console.log(id);
    };
    const testSets = [
        {
            id: 1,
            name: 'Test Set 1',
            testCases: [
                { id: 101, name: 'Test Case 1' },
                { id: 102, name: 'Test Case 2' },
            ],
        },
        {
            id: 2,
            name: 'Test Set 2',
            testCases: [
                { id: 201, name: 'Test Case 3' },
                { id: 202, name: 'Test Case 4' },
            ],
        },
        // Add more test sets as needed
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
                            Project Items
                        </ListSubheader>
                    }
                >
                    <ListItemButton onClick={handleClick}>
                        <ListItemText primary="Requirement sets" />
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
                                        pl: 4,
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
                                sx={{ pl: 3 }}
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
                    {/* <ListItemButton onClick={handleTestSetClick}>
                        <ListItemText primary="Test sets" />
                        {openTestSet ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openTestSet} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Typography sx={{ pl: 4 }} variant="subtitle2">
                                Amrath qureshi{' '}
                            </Typography>
                            <ListItemButton
                                sx={{ pl: 3 }}
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
                        </List>
                    </Collapse> */}
                    <ListItemButton onClick={handleTestSetClick}>
                        <ListItemText primary="Test sets" />
                        {openTestSet ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openTestSet} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {testSets.map((testSet) => (
                                <React.Fragment key={testSet.id}>
                                    <Typography
                                        sx={{ pl: 4 }}
                                        variant="subtitle2"
                                    >
                                        {testSet.name}
                                    </Typography>

                                    {/* Nested List for Test Cases */}
                                    <List component="div" disablePadding>
                                        {testSet.testCases.map(
                                            (testCase: any) => (
                                                <>
                                                    <ListItemButton
                                                        sx={{ pl: 5 }}
                                                        onClick={() =>
                                                            handleTestCaseClick(
                                                                testCase.id
                                                            )
                                                        }
                                                        key={testCase.id}
                                                    >
                                                        <ListItemText
                                                            primary={
                                                                testCase.name
                                                            }
                                                        />
                                                        {openTestCase ===
                                                        testCase.id ? (
                                                            <ExpandLess />
                                                        ) : (
                                                            <ExpandMore />
                                                        )}
                                                    </ListItemButton>
                                                    <Collapse
                                                        in={
                                                            openTestCase ===
                                                            testCase.id
                                                        }
                                                        timeout="auto"
                                                        unmountOnExit
                                                    >
                                                        {/* <List component="div" disablePadding>
                          <ListItemButton sx={{ pl: 6 }} onClick={() => handleEditTestCase(testCase.id)}>
                              <ListItemText primary="Edit Test Case" />
                          </ListItemButton>
                          <ListItemButton sx={{ pl: 6 }} onClick={() => handleDeleteTestCase(testCase.id)}>
                              <ListItemText primary="Delete Test Case" />
                          </ListItemButton>
                      </List>*/}
                                                        <ListItemButton
                                                            sx={{ pl: 3 }}
                                                            onClick={
                                                                handleTestSetForm
                                                            }
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
                                                </>
                                            )
                                        )}
                                    </List>
                                    {/* End of Nested List for Test Cases */}
                                </React.Fragment>
                            ))}
                        </List>
                    </Collapse>
                </List>
            </div>
            <div className="content-bar">
                <Requirements
                    selectedItem={selectedList}
                    selectedRequirementSet={selectedRequirementSet}
                    RequirementSets={requirementSets}
                />
                <TestSets selectedItem={selectedList} />
            </div>
            {requirementSetForm && (
                <div className="blur-background">
                    <div className="requirementsetform">
                        <RequirementSetForm
                            handleRequirementSet={handleRequirementSet}
                        />
                    </div>
                </div>
            )}
            {testSetForm && (
                <div>
                    <TestSetForm handleTestSetForm={handleTestSetForm} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
