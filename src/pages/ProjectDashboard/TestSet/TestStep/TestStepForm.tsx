import React from 'react';
import './TestStepForm.css';
import {
    CircularProgress,
    InputLabel,
    Pagination,
    Alert,
    Stack,
    TextField,
    Tooltip,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputAdornment,
    Collapse,
} from '@mui/material';
import axios from 'axios';
import { react_backend_url } from '../../../../config';
interface TestStep {
    _id?: string;
    stepNumber: number;
    description: string;
    expectedResult: string;
    testscriptId: string;
}
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import Joi from 'joi-browser';

interface Props {
    count: number;
    setcount: (count: number) => void;
    currPage: number;
    setCurrentPage: (currPage: number) => void;
    testCaseId: string;
    testStep: TestStep;
    setTestStep: (testStep: any) => void;
    handleTestCaseform: () => void;
    projectId: string;
    testsetId: string;
    isSaved: boolean;
    setIsSaved: (boolean: boolean) => void;
    isEditMode: boolean;
    setIsEditMode: (boolean: boolean) => void;
}
const TestStepForm: React.FC<Props> = ({
    count,
    setcount,
    currPage,
    setCurrentPage,
    testCaseId,
    testStep,
    setTestStep,
    handleTestCaseform,
    projectId,
    testsetId,
    isSaved,
    setIsSaved,
    isEditMode,
    setIsEditMode,
}) => {
    const [testSteps, setTestSteps] = React.useState<TestStep[]>([]);
    const [currStep, setCurrentStep] = React.useState<TestStep>();
    const [saving, setSaving] = React.useState<boolean>(false);
    const [success, setSuccess] = React.useState<boolean>(false);
    const [SaveDialogOpen, setSaveDialogOpen] = React.useState(false);
    const [openTestStepForm, setOpenTestStepForm] = React.useState(false);
    const [validationError, setValidationError] = React.useState<string>();
    const [cancel, setCancel] = React.useState<boolean>(false);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
    };
    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    };
    const handleTestStepFormCollpse = () => {
        setOpenTestStepForm(!openTestStepForm);
    };
    const handleSaveEdited = async () => {
        const testStepId = currStep._id;
        const result = await axios.put(
            `${react_backend_url}/v1/teststeps/${testStepId}`,
            currStep
        );
        setIsEditMode(false);
        setSuccess(true);
    };
    const schema = {
        stepNumber: Joi.number().required(),
        description: Joi.string().required(),
        expectedResult: Joi.string().required(0),
    };

    const handleSave = async () => {
        if (!isSaved) {
            setValidationError(null);
            testStep.stepNumber = count;
            testStep.testscriptId = testCaseId;
            const { error } = Joi.validate(testStep, schema, {
                allowUnknown: true,
            });
            if (error) {
                setValidationError(error.details[0].message);
                return;
            }
            setSaving(true);
            try {
                const response = await axios.post(
                    `${react_backend_url}/v1/teststeps`,
                    testStep
                );
                if (response) {
                    setSuccess(true);
                    setSaving(false);
                }
            } catch (e) {
                console.log(e);
            }
            const result = await axios.get(
                `${react_backend_url}/v1/teststeps/testcases/${testCaseId}`
            );
            setTestSteps(result.data);
            const currTestStep = result.data.find(
                (item: TestStep) => item.stepNumber === currPage
            );
            setTestStep(currTestStep);
            setIsSaved(true);
            setIsEditMode(true);
        } else {
            const testStepId = testStep._id;
            const result = await axios.put(
                `${react_backend_url}/v1/teststeps/${testStepId}`,
                testStep
            );
            console.log('naveeen', result.data);
            setIsEditMode(true);
            setSuccess(true);
        }
    };
    const handleDialogOpen = () => {
        setSaveDialogOpen(!SaveDialogOpen);
    };
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (!isEditMode) {
            const { name, value } = event.target;
            setTestStep((prevTestStep: any) => ({
                ...prevTestStep,
                [name]: value,
            }));
        }
    };
    const handleChangeSaved = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        if (isEditMode) {
            const { name, value } = event.target;
            setCurrentStep((prevCurTestStep) => ({
                ...prevCurTestStep,
                [name]: value,
            }));
        }
    };
    React.useEffect(() => {
        const fetchTestSteps = async () => {
            const result = await axios.get(
                `${react_backend_url}/v1/teststeps/testcases/${testCaseId}`
            );
            console.log(result);
            const currTestStep: TestStep = result.data.find(
                (item: TestStep) => item.stepNumber === currPage
            );
            setCurrentStep(currTestStep);
            setIsEditMode(false);
        };
        fetchTestSteps();
    }, [currPage]);
    React.useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                setSuccess(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [success]);
    const History = useNavigate();
    const handleTestStepForm = () => {
        History(`/dashboard/${projectId}`);
    };
    function capitalizeWholeString(inputString: string) {
        if (!inputString) {
            return inputString;
        }

        return inputString.toUpperCase();
    }
    const handleExitFromForm = async () => {
        await axios
            .delete(`${react_backend_url}/v1/testscripts/${testCaseId}`)
            .then(() => {
                handleTestCaseform();
            });
    };
    return (
        <div>
            {currPage === count ? (
                <div className="testStepForm">
                    {success && (
                        <Alert severity="success" sx={{ bottom: 5 }}>
                            Test Step {currPage} saved successfullty!
                        </Alert>
                    )}
                    <div className="TestStepFormheader">
                        <div
                            className="testStep-mini-header"
                            onClick={handleTestStepFormCollpse}
                        >
                            {openTestStepForm ? <ExpandLess /> : <ExpandMore />}
                            <p>Step {currPage}</p>
                        </div>
                        <div className="searchTestSet">
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
                    </div>
                    <Collapse
                        in={openTestStepForm}
                        timeout="auto"
                        unmountOnExit
                    >
                        <div>
                            <div className="testSetHeaderBottom">
                                <div className="testStepform-icons">
                                    {isEditMode ? (
                                        <Tooltip
                                            title="Edit"
                                            placement="top-end"
                                        >
                                            <img
                                                src="../../../../../public/Edit1.png"
                                                alt="edit"
                                                className="testStepform-icon"
                                                onClick={handleEditClick}
                                            />
                                        </Tooltip>
                                    ) : (
                                        <Tooltip
                                            title="Save"
                                            placement="top-end"
                                        >
                                            <img
                                                src="../../../../../public/Save.png"
                                                alt="file"
                                                className="testStepform-icon"
                                                onClick={handleSave}
                                            />
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Delete" placement="top-end">
                                        <img
                                            src="../../../../../public/Delete1.png"
                                            alt="delete"
                                            className="testStepform-icon"
                                        />
                                    </Tooltip>
                                </div>
                            </div>
                            <div className="TestStepFormInput">
                                <div className="testStep-textarea">
                                    <label className="testStep-label-name">
                                        <b>Description</b>
                                    </label>
                                    <div className="formfield">
                                        <textarea
                                            className="textarea-testset"
                                            name="description"
                                            rows={5}
                                            onChange={handleChange}
                                            value={testStep.description}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="testStep-textarea">
                                    <label className="testStep-label-name">
                                        <b>Expected result</b>
                                    </label>
                                    <div className="formfield">
                                        <textarea
                                            className="textarea-testset"
                                            name="expectedResult"
                                            rows={5}
                                            onChange={handleChange}
                                            value={testStep.expectedResult}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="testStep-textarea">
                                    <label className="testStep-label-name">
                                        <b>Link requirements</b>
                                    </label>
                                    <div className="formfield"></div>
                                </div>
                            </div>
                            <div className="testseterrormessage">
                                {validationError && (
                                    <p>
                                        {' '}
                                        {capitalizeWholeString(validationError)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Collapse>
                </div>
            ) : (
                <div className="testStepForm">
                    {success && (
                        <Alert severity="success" sx={{ bottom: 5 }}>
                            Test Step {currPage} Edited successfullty!
                        </Alert>
                    )}
                    <div className="TestStepFormheader">
                        <div
                            className="testStep-mini-header"
                            onClick={handleTestStepFormCollpse}
                        >
                            {openTestStepForm ? <ExpandLess /> : <ExpandMore />}
                            <p>Step {currPage}</p>
                        </div>

                        <div className="searchTestSet">
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
                    </div>
                    <Collapse
                        in={openTestStepForm}
                        timeout="auto"
                        unmountOnExit
                    >
                        <div>
                            <div className="testSetHeaderBottom">
                                <div className="testStepform-icons">
                                    <div className="iconstestset">
                                        {isEditMode ? (
                                            <Tooltip
                                                title="Save"
                                                placement="top-end"
                                            >
                                                <img
                                                    src="../../../../../public/Save.png"
                                                    alt="file"
                                                    className="testStepform-icon"
                                                    onClick={handleSaveEdited}
                                                />
                                            </Tooltip>
                                        ) : (
                                            <Tooltip
                                                title="Edit"
                                                placement="top-end"
                                            >
                                                <img
                                                    src="../../../../../public/Edit1.png"
                                                    alt="edit"
                                                    className="testStepform-icon"
                                                    onClick={handleEditClick}
                                                />
                                            </Tooltip>
                                        )}
                                        <Tooltip
                                            title="Delete"
                                            placement="top-end"
                                        >
                                            <img
                                                src="../../../../../public/Delete1.png"
                                                alt="delete"
                                                className="testStepform-icon"
                                            />
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                            <div className="TestStepFormInput">
                                <div className="testStep-textarea">
                                    <label className="testStep-label-name">
                                        <b>Description</b>
                                    </label>
                                    <div className="formfield">
                                        <textarea
                                            className="textarea-testset"
                                            name="description"
                                            rows={5}
                                            onChange={handleChangeSaved}
                                            value={
                                                currStep
                                                    ? currStep.description
                                                    : ''
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="testStep-textarea">
                                    <label className="testStep-label-name">
                                        <b>Expected result</b>
                                    </label>
                                    <div className="formfield">
                                        <textarea
                                            className="textarea-testset"
                                            name="expectedResult"
                                            rows={5}
                                            onChange={handleChangeSaved}
                                            value={
                                                currStep
                                                    ? currStep.expectedResult
                                                    : ''
                                            }
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="testStep-textarea">
                                    <label className="testStep-label-name">
                                        <b>Link requirements</b>
                                    </label>
                                    <div className="formfield"></div>
                                </div>
                            </div>
                            <div className="testseterrormessage">
                                {validationError && (
                                    <p>
                                        {' '}
                                        {capitalizeWholeString(validationError)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </Collapse>
                </div>
            )}
            <Collapse in={openTestStepForm}>
                <div className="testsetformbottom">
                    <div className="testsetpagination">
                        <Pagination
                            count={count}
                            variant="outlined"
                            shape="rounded"
                            onChange={handlePageChange}
                            page={currPage}
                        />
                    </div>
                    <div className="teststepbutton">
                        <button
                            onClick={handleDialogOpen}
                            className="testsetsavebutton"
                        >
                            Save
                        </button>
                        <button
                            className="testsetcancelbutton"
                            onClick={() => setCancel(!cancel)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Collapse>

            <Dialog
                open={SaveDialogOpen && testSteps && testSteps.length == count}
                onClose={() => setSaveDialogOpen(false)}
            >
                <DialogTitle>Confirm Save</DialogTitle>
                <DialogContent>
                    Are you sure ,you want to save these teststeps
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSaveDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleTestCaseform} color="error">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={SaveDialogOpen && testSteps && testSteps.length != count}
                onClose={() => setSaveDialogOpen(false)}
            >
                <DialogTitle>Confirm Save</DialogTitle>
                <DialogContent>
                    You haven't saved all the test steps, please save them to
                    testcase before saving the testcase
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setSaveDialogOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={cancel}>
                <DialogTitle>Confirm cancel</DialogTitle>
                <DialogContent>
                    You will lose all the changes made!
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancel(false)}>Cancel</Button>
                    <Button onClick={handleExitFromForm} color="error">
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default TestStepForm;
