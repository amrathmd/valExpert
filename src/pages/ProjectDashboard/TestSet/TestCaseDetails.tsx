import { react_backend_url } from '../../../config';
import axios from 'axios';
import React from 'react';
import './TestCaseDetails.css';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
    List,
    Collapse,
    Alert,
    Dialog,
    DialogContent,
    Button,
    DialogActions,
    DialogTitle,
} from '@mui/material';

interface TestCase {
    testsetId: string;
    Type: string;
    testCaseNumber: number;
    purpose: string;
    acceptanceCriteria: string;
    prerequisites: string;
    result: string;
    author: string;
}
interface Props {
    testCaseId: string;
}
const TestCaseDetails: React.FC<Props> = ({ testCaseId }) => {
    const [testCase, setTestCase] = React.useState<TestCase>();
    const [openTestCaseDetails, setOpenTestCaseDetails] =
        React.useState<boolean>(true);

    const handleOpenTestCaseDetails = () => {
        setOpenTestCaseDetails(!openTestCaseDetails);
    };
    const [cancel, setCancel] = React.useState<boolean>(false);
    const [editAlert, setEditAlert] = React.useState<boolean>(false);

    const [editMode, setEditMode] = React.useState<boolean>(false);
    React.useEffect(() => {
        const fetchTestCase = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/testscripts/${testCaseId}`
            );
            setTestCase(result.data[0]);
        };
        fetchTestCase();
    }, []);

    const handleCancel = () => {
        setCancel(!cancel);
    };
    const handleEdit = async () => {
        await axios
            .put(`${react_backend_url}/v1/testscripts/${testCaseId}`, testCase)
            .then(() => {
                setEditAlert(true);
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setTestCase((prevTestCase) => ({
            ...prevTestCase,
            [name]: value,
        }));
    };
    React.useEffect(() => {
        if (editAlert) {
            const timer = setTimeout(() => {
                setEditAlert(false);
                setEditMode(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [editAlert]);
    return (
        <div className="testcasedetails">
            {editAlert && (
                <Alert severity="success">Test case edited successfully!</Alert>
            )}
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    paddingTop: '0px',
                    paddingBottom: '0px',
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <div className="TestCaseFrom-header">
                    <div
                        className="header-text-testcase"
                        onClick={handleOpenTestCaseDetails}
                    >
                        {openTestCaseDetails ? <ExpandLess /> : <ExpandMore />}

                        <p>Test case Details</p>
                    </div>
                    {!editMode && (
                        <div
                            onClick={() => setEditMode(true)}
                            className="editTestCaseDiv"
                        >
                            <img
                                src="../../../public/whiteedit.png"
                                className="editTestCase"
                                alt=""
                            />
                        </div>
                    )}
                </div>
                <div className="testcasedetails1">
                    <Collapse
                        in={openTestCaseDetails}
                        timeout="auto"
                        unmountOnExit
                    >
                        {testCase && (
                            <div className="testCaseDetailsView">
                                <table style={{ width: '100%' }}>
                                    <tr style={{ width: '100%' }}>
                                        <td className="testDetailsLabel">
                                            <b>Test case Number</b>
                                        </td>
                                        {!editMode ? (
                                            <td className="testDetailsValue">
                                                {testCase.testCaseNumber}
                                            </td>
                                        ) : (
                                            <td className="testDetailsValue">
                                                <input
                                                    type="text"
                                                    className="editTestDetailsValue"
                                                    name="testCaseNumber"
                                                    value={
                                                        testCase.testCaseNumber
                                                    }
                                                    onChange={handleChange}
                                                ></input>
                                            </td>
                                        )}

                                        <td className="testDetailsLabel">
                                            <b>Purpose</b>
                                        </td>
                                        {!editMode ? (
                                            <td className="testDetailsValue">
                                                {testCase.purpose}
                                            </td>
                                        ) : (
                                            <td className="testDetailsValueInput">
                                                <textarea
                                                    className="editTestDetailsValue"
                                                    name="purpose"
                                                    value={testCase.purpose}
                                                    rows={5}
                                                    onChange={handleChange}
                                                ></textarea>
                                            </td>
                                        )}
                                    </tr>

                                    <tr style={{ width: '100%' }}>
                                        <td className="testDetailsLabel">
                                            <b>Acceptance Criteria</b>
                                        </td>
                                        {!editMode ? (
                                            <td className="testDetailsValue">
                                                {testCase.acceptanceCriteria}
                                            </td>
                                        ) : (
                                            <td className="testDetailsValueInput">
                                                <textarea
                                                    rows={5}
                                                    className="editTestDetailsValue"
                                                    name="acceptanceCriteria"
                                                    value={
                                                        testCase.acceptanceCriteria
                                                    }
                                                    onChange={handleChange}
                                                ></textarea>
                                            </td>
                                        )}

                                        <td className="testDetailsLabel">
                                            <b>Prerequisites</b>
                                        </td>
                                        {!editMode ? (
                                            <td className="testDetailsValue">
                                                {testCase.prerequisites}
                                            </td>
                                        ) : (
                                            <td className="testDetailsValueInput">
                                                <textarea
                                                    rows={5}
                                                    className="editTestDetailsValue"
                                                    name="prerequisites"
                                                    value={
                                                        testCase.prerequisites
                                                    }
                                                    onChange={handleChange}
                                                ></textarea>
                                            </td>
                                        )}
                                    </tr>
                                </table>
                            </div>
                        )}
                        <div>
                            {editMode && (
                                <div className="testCaseDetailsButtons">
                                    <button
                                        className="testCaseDetailsButtonEdit"
                                        onClick={handleEdit}
                                    >
                                        Save
                                    </button>
                                    <button
                                        className="testCaseDetailsButtonCancel"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>
                    </Collapse>
                </div>
            </List>
            <hr style={{ background: '#B8B6B6', height: '1px' }} />
            <div>
                <Dialog open={cancel}>
                    <DialogTitle>Confirm cancel</DialogTitle>
                    <DialogContent>
                        You will lose all the changes made!
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setCancel(false)}>
                            Continue edit
                        </Button>
                        <Button
                            onClick={() => setEditMode(false)}
                            color="error"
                        >
                            Cancel edit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};
export default TestCaseDetails;
