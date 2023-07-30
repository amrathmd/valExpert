import React, { useEffect, useState } from 'react';
import './ProjectDashboard.css';
import Requirements from './Requirements/Requirement';
import TestSets from './TestSet/TestSetDetails';
import axios from 'axios';
import { TestSet } from '@/components/Models/testsetsModel';
import { TestCase } from '@/components/Models/testCasesmodel';

interface RequirementSet {
    _id: string;
    name: string;
}

const ProjectDashboard = () => {
    const [reqListState, setReqListState] = React.useState<boolean>(false);
    const requirementsRef = React.useRef<HTMLUListElement>(null);
    const testsRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState<number>(0);
    const [testListState, setTestListState] = React.useState<boolean>(false);
    const [selectedRequirementSet, setSelectedRequirementSet] = React.useState<
        string | null
    >(null);
    const [selectedTestSetId, setSelectedtestSetId] = React.useState<
        string | null
    >(null);
    const [selectedTestSet, setSelectedTestSet] = React.useState<any>({});
    const [requirementSets, setRequirementSets] = React.useState<
        RequirementSet[]
    >([]);
    const [count, setCount] = React.useState<number>(1);
    const [testDetails, setTestDetails] = React.useState<TestSet[]>([]);
    const [testCases, setTestCases] = React.useState<TestCase[]>([]);
    const [testCaseVisibility, setTestCaseVisibility] = useState<
        Record<string, boolean>
    >({});

    // Function to toggle the test cases list visibility for a test set
    const toggleTestCaseList = (testSetId: string) => {
        setTestCaseVisibility((prevState) => ({
            ...prevState,
            [testSetId]: !prevState[testSetId],
        }));
    };
    const getTestCases = async (testSetId: string) => {
        const res = await axios.get<TestCase[]>(
            `http://localhost:3000/v1/testcases/${testSetId}`
        );
        console.log(res);
        if (!res.data) {
            window.alert('error');
        }
        setTestCases(res.data);
        console.log(testCases);
    };

    useEffect(() => {
        if (selectedTestSetId) {
            getTestCases(selectedTestSetId);
        }
    }, [selectedTestSetId]);

    const handleRequirementSet = (id: string) => {
        setSelectedRequirementSet(id);
        setSelectedItem(0);
        setSelectedtestSetId(null);
    };

    const handleTestSet = (id: string) => {
        setSelectedtestSetId(id);
        const selectedTestSet = testDetails.find((item) => item._id === id);
        setSelectedTestSet(selectedTestSet || {});
        setSelectedItem(0);
        setSelectedRequirementSet(null);
    };

    const browseItems = [
        {
            id: 1,
            name: 'Requirement sets',
            image: '../../../public/requirement.png',
        },
        {
            id: 2,
            name: 'Test sets',
            image: '../../../public/test.png',
        },
        {
            id: 3,
            name: 'Defects',
            image: '../../../public/defects.png',
        },
    ];

    const handleRequirementListState = (id: number) => {
        if (requirementSets.length !== 0) {
            setReqListState(!reqListState);
        }
        setSelectedItem(id);
        setSelectedRequirementSet(null);
        setSelectedtestSetId(null);
    };

    const createRequirementSet = () => {
        const obj = {
            _id: `${count}`,
            name: `RequirementSet ${count}`,
        };

        setRequirementSets([...requirementSets, obj]);
        setCount(count + 1);
    };

    const refreshTestSets = async () => {
        await getTestSets();
    };

    const getTestSets = async () => {
        const res = await axios.get<TestSet[]>(
            'http://localhost:3000/v1/testsets'
        );
        console.log(res);
        if (!res.data) {
            window.alert('error');
        }
        setTestDetails(res.data);
        console.log(testDetails);
    };

    useEffect(() => {
        getTestSets();
    }, []);

    const handleTestListState = (id: number) => {
        setTestListState(!testListState);
        setSelectedItem(id);
        setSelectedRequirementSet(null);
        setSelectedtestSetId(null);
    };

    return (
        <div className="project-dashboard">
            <div className="project-dashboard-sidebar">
                {browseItems.map((items) => (
                    <ul key={items.id}>
                        <li
                            className={`${
                                items.id === 1
                                    ? 'requirements'
                                    : items.id === 2
                                    ? 'tests'
                                    : ''
                            } ${selectedItem === items.id ? 'selected' : ''}`}
                            onClick={
                                items.id === 1
                                    ? () => handleRequirementListState(items.id)
                                    : items.id === 2
                                    ? () => handleTestListState(items.id)
                                    : undefined
                            }
                        >
                            <img
                                src={items.image}
                                className="icons"
                                alt={items.name}
                            />
                            {items.name}

                            <span>
                                {items.id === 1 && requirementSets.length !== 0}
                            </span>
                            <span>
                                {items.id === 2 && (
                                    <img
                                        src="../../../public/right-arrow.png"
                                        alt="arrow"
                                        className={`${
                                            !testListState
                                                ? 'testArrow'
                                                : 'testArrow-down'
                                        }`}
                                    />
                                )}
                            </span>
                        </li>
                        {items.id === 1 && (
                            <ul
                                ref={requirementsRef}
                                className={`requirements-list ${
                                    reqListState ? 'open' : 'closed'
                                }`}
                                style={
                                    reqListState
                                        ? {
                                              maxHeight:
                                                  requirementsRef.current
                                                      ?.scrollHeight,
                                          }
                                        : {}
                                }
                            >
                                {requirementSets.map((set) => (
                                    <li
                                        key={set._id}
                                        className={`${
                                            selectedRequirementSet === set._id
                                                ? 'selected-req-set'
                                                : ''
                                        }`}
                                        onClick={() =>
                                            handleRequirementSet(set._id)
                                        }
                                    >
                                        {set.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {items.id === 2 && (
                            <ul
                                ref={testsRef}
                                className={`test-list ${
                                    testListState ? 'open' : 'closed'
                                }`}
                                style={
                                    testListState
                                        ? {
                                              maxHeight:
                                                  testsRef.current
                                                      ?.scrollHeight,
                                          }
                                        : {}
                                }
                            >
                                {testDetails.map((set) => (
                                    <li
                                        key={set._id}
                                        className={`${
                                            selectedTestSetId === set._id
                                                ? 'selected-test-set'
                                                : ''
                                        }`}
                                        onClick={() => handleTestSet(set._id)}
                                    >
                                        {set.testName}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ul>
                ))}
            </div>
            <div className="project-dashboard-content">
                <Requirements
                    selectedItem={selectedItem}
                    selectedRequirementSet={selectedRequirementSet}
                    createRequirementSet={createRequirementSet}
                />
                <TestSets
                    selectedItem={selectedItem}
                    selectedTestSetId={selectedTestSetId}
                    refreshTestSets={refreshTestSets}
                    selectedTestSet={selectedTestSet}
                    testCases={testCases}
                />
            </div>
        </div>
    );
};

export default ProjectDashboard;
