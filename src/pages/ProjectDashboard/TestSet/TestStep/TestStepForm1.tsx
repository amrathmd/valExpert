import TestStep from '../../../../components/Models/TestStep';
import React from 'react';
import Joi from 'joi-browser';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import './TestStepForm1.css';
import { react_backend_url } from '../../../../config';
import axios from 'axios';

const defaultForm: TestStep = {
    stepNumber: 0,
    description: '',
    expectedResult: '',
    testscriptId: '',
};
interface Props {
    testScriptId: string;

    handleTestStepForm: () => void;
    setOpenTestStepForm: (open: boolean) => void;
    count: number;
    setcount: (count: number) => void;
}
const TestStepForm1: React.FC<Props> = ({
    testScriptId,
    handleTestStepForm,
    setOpenTestStepForm,
    count,
    setcount,
}) => {
    const [testStep, setTestStep] = React.useState<TestStep>(defaultForm);
    const [stepNumber, setTestStepNumber] = React.useState<number>(0);
    const [validationError, setValidationError] = React.useState<string>(null);
    const [saveAndCreateSuccess, setSaveandCreateSuccess] =
        React.useState<boolean>(false);
    const [saveAndExitSuccess, setSaveandExitSuccess] =
        React.useState<boolean>(false);
    const [cancelDialog, setCancelDialog] = React.useState<boolean>(false);
    React.useEffect(() => {
        const fetchTestSteps = async () => {
            const result = await axios
                .get(
                    `${react_backend_url}/v1/teststeps/testcases/${testScriptId}`
                )
                .then((result) => {
                    setTestStepNumber(result.data.length + 1);
                });
        };
        fetchTestSteps();
    }, []);
    const schema = {
        stepNumber: Joi.number().required(),
        description: Joi.string().required(),
        expectedResult: Joi.string().required(),
    };
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setTestStep((prevTestStep: any) => ({
            ...prevTestStep,
            [name]: value,
        }));
    };
    const handleSave = async (event: any) => {
        event.preventDefault();
        testStep.stepNumber = stepNumber;
        testStep.testscriptId = testScriptId;
        const { error } = Joi.validate(testStep, schema, {
            allowUnknown: true,
        });
        if (error) {
            setValidationError(error.details[0].message);
            return;
        }
        try {
            const response = await axios
                .post(`${react_backend_url}/v1/teststeps`, testStep)
                .then((response) => {
                    setTestStep(defaultForm);
                    setSaveandCreateSuccess(true);
                    setcount(count + 1);
                });
        } catch (e) {
            console.log(e);
        }
    };
    const handleSaveandExit = async (event: any) => {
        event.preventDefault();
        testStep.stepNumber = stepNumber;
        testStep.testscriptId = testScriptId;
        const { error } = Joi.validate(testStep, schema, {
            allowUnknown: true,
        });
        if (error) {
            setValidationError(error.details[0].message);
            return;
        }
        try {
            const response = await axios
                .post(`${react_backend_url}/v1/teststeps`, testStep)
                .then((response) => {
                    setSaveandExitSuccess(true);
                    setcount(count + 1);
                });
        } catch (e) {
            console.log(e);
        }
    };

    React.useEffect(() => {
        if (saveAndCreateSuccess) {
            const timer = setTimeout(() => {
                setSaveandCreateSuccess(false);
                setTestStepNumber(
                    (prevTestStepNumber) => prevTestStepNumber + 1
                );
            }, 1500);
        }
    }, [saveAndCreateSuccess]);
    React.useEffect(() => {
        if (saveAndExitSuccess) {
            const timer = setTimeout(() => {
                setSaveandExitSuccess(false);
                handleTestStepForm();
            }, 1500);
        }
    }, [saveAndExitSuccess]);
    return (
        <div>
            <div className="TestStepFormDialog">
                <div className="TestStepFormForm">
                    {saveAndCreateSuccess && (
                        <Alert variant="standard">
                            Test step {stepNumber} saved successfully
                        </Alert>
                    )}
                    {saveAndExitSuccess && (
                        <Alert variant="standard">
                            Test step {stepNumber} saved successfully
                        </Alert>
                    )}
                    <b>Create test steps</b>
                    <div className="testStepHeader1">
                        <b>Step {stepNumber}</b>
                    </div>
                    <div className="testSteptable">
                        <div className="testStepArea">
                            <label>
                                <b>Description</b>
                            </label>
                            <div className="TestStepFormField">
                                <textarea
                                    name="description"
                                    className="testStepFormTextArea"
                                    rows={5}
                                    onChange={handleChange}
                                    value={testStep.description}
                                ></textarea>
                            </div>
                        </div>
                        <div className="testStepArea">
                            <label>
                                <b>ExpectedResult</b>
                            </label>
                            <div className="TestStepFormField">
                                <textarea
                                    name="expectedResult"
                                    className="testStepFormTextArea"
                                    rows={5}
                                    onChange={handleChange}
                                    value={testStep.expectedResult}
                                ></textarea>
                            </div>
                        </div>
                        <div className="testStepArea">
                            <label>
                                <b>Link requirements</b>
                            </label>
                            <div className="TestStepFormField"></div>
                        </div>
                    </div>
                    <div className="testStepButtons">
                        <button className="testStepBlue" onClick={handleSave}>
                            Save and Create
                        </button>
                        <button
                            className="testStepBlue"
                            onClick={handleSaveandExit}
                        >
                            Save and Exit
                        </button>
                        <button
                            className="testStepGray"
                            onClick={() => setCancelDialog(true)}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <Dialog open={cancelDialog}>
                <DialogTitle>Confirm Cancel</DialogTitle>
                <DialogContent>
                    Are you sure, You will lose the changes made in this
                    testcase!
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setCancelDialog(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleTestStepForm} color="error">
                        Exit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
export default TestStepForm1;
