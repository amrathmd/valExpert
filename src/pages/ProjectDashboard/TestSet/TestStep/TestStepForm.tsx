import React from 'react';
import './TestStepForm.css';
import {
    CircularProgress,
    InputLabel,
    Pagination,
    PaginationItem,
    Stack,
    TextField,
} from '@mui/material';
import axios from 'axios';
import { react_backend_url } from '../../../../config';
interface TestStep {
    stepNumber: number;
    description: string;
    expectedResult: string;
    testscriptId: string;
}
import CheckIcon from '@mui/icons-material/Check';
import { useNavigate } from 'react-router';

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
}) => {
    const [testSteps, setTestSteps] = React.useState<TestStep[]>([]);
    const [currStep, setCurrentStep] = React.useState<TestStep>();
    const [saving, setSaving] = React.useState<boolean>(false);

    const handlePageChange = (event: any, page: number) => {
        setCurrentPage(page);
    };
    const handleSave = async () => {
        testStep.stepNumber = count;
        testStep.testscriptId = testCaseId;
        setSaving(true);
        try {
            await axios
                .post(`${react_backend_url}/v1/teststeps`, testStep)
                .then(() => {
                    setSaving(false);
                });
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
        setCurrentStep(currTestStep);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setTestStep((prevTestStep: any) => ({
            ...prevTestStep,
            [name]: value,
        }));
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
            console.log(currTestStep);
        };
        fetchTestSteps();
    }, [currPage]);
    const History = useNavigate();
    const handleTestStepForm = () => {
        History(`/dashboard/${projectId}`);
    };
    return (
        <div>
            {currPage === count ? (
                <div className="testStepForm">
                    <div className="TestStepFormheader">
                        <div>
                            <h3>Step {currPage}</h3>
                        </div>
                        <div className="testStepform-icons">
                            {saving ? (
                                <CircularProgress
                                    color="inherit"
                                    sx={{ height: '40px', width: '40px' }}
                                />
                            ) : (
                                <div>
                                    <img
                                        src="../../../../../public/vector.png"
                                        alt="file"
                                        className="testStepform-icon"
                                        onClick={handleSave}
                                    />
                                </div>
                            )}
                            <img
                                src="../../../../../public/whiteedit.png"
                                alt="edit"
                                className="testStepform-icon"
                            />
                            <img
                                src="../../../../../public/link.png"
                                alt="link"
                                className="testStepform-icon"
                            />
                            <img
                                src="../../../../../public/Delete.png"
                                alt="delete"
                                className="testStepform-icon"
                            />
                        </div>
                    </div>
                    <div className="TestStepFormInput">
                        <div>
                            <label className="testStep-label-name">
                                <b>Description</b>
                            </label>
                            <textarea
                                className="formfield"
                                name="description"
                                rows={5}
                                onChange={handleChange}
                                value={testStep.description}
                            ></textarea>
                        </div>
                        <div>
                            <label className="testStep-label-name">
                                <b>Expected result</b>
                            </label>
                            <textarea
                                className="formfield"
                                name="expectedResult"
                                rows={5}
                                onChange={handleChange}
                                value={testStep.expectedResult}
                            ></textarea>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="testStepForm">
                    <div className="TestStepFormheader">
                        <div>
                            <b>Step {currPage}</b>
                        </div>
                        <div className="testStepform-icons">
                            {/* <img
                                src="../../../../../public/vector.png"
                                alt="file"
                                className="testStepform-icon"
                                onClick={handleSave}
                            /> */}
                            <img
                                src="../../../../../public/whiteedit.png"
                                alt="edit"
                                className="testStepform-icon"
                            />
                            <img
                                src="../../../../../public/link.png"
                                alt="link"
                                className="testStepform-icon"
                            />
                            <img
                                src="../../../../../public/Delete.png"
                                alt="delete"
                                className="testStepform-icon"
                            />
                        </div>
                    </div>
                    <div className="TestStepFormInput">
                        <div>
                            <label className="testStep-label-name">
                                <b>Description</b>
                            </label>
                            <textarea
                                className="formfield"
                                name="description"
                                rows={5}
                                onChange={handleChange}
                                value={currStep ? currStep.description : ''}
                            ></textarea>
                        </div>
                        <div>
                            <label className="testStep-label-name">
                                <b>Expected result</b>
                            </label>
                            <textarea
                                className="formfield"
                                name="expectedResult"
                                rows={5}
                                onChange={handleChange}
                                value={currStep ? currStep.expectedResult : ''}
                            ></textarea>
                        </div>
                    </div>
                </div>
            )}
            <Stack
                spacing={2}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mt: '20px',
                    mb: '20px',
                }}
            >
                <Pagination
                    count={count}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                    page={currPage}
                />
            </Stack>
            <div className="testCasebuttons">
                <button
                    onClick={handleTestCaseform}
                    className="testcasesavebutton"
                >
                    Save
                </button>
                <button
                    className="testcasecancelbutton"
                    onClick={handleTestCaseform}
                >
                    Cancel
                </button>
            </div>
            {/* <div className="testStepRuler"></div> */}
        </div>
    );
};
export default TestStepForm;
