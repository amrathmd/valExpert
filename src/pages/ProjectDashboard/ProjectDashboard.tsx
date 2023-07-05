import React, { useState } from 'react';
import './ProjectDashboard.css';
import ReqForm from './ReqForm';
import Table from './Table';
import TestForm from './TestForm';

interface RequirementSet {
    _id: string;
    name: string;
}
interface TestSet {
    _id: string;
    name: string;
}
interface TableColumn {
    key: string;
    label: string;
}

const ProjectDashboard = () => {
    const [reqListState, setReqListState] = React.useState<boolean>(false);
    const requirementsRef = React.useRef<HTMLUListElement>(null);
    const testsRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState(0);
    const [testListState, setTestListState] = React.useState(false);
    const [selectedRequirementSet, setSelectedRequirementSet] =
        React.useState(null);
    const [selectedTestSetId, setSelectedtestSetId] = React.useState(null);
    const [selectedTestSet, setSelectedTestSet] = React.useState<any>({});
    const [requirementSets, setRequirementSets] = React.useState<
        RequirementSet[]
    >([]);
    const [testSet, setTestSet] = React.useState<TestSet[]>([]);

    const [count, setCount] = React.useState<number>(1);
    const [num, setNum] = React.useState<number>(10);
    const [isReqFormActive, setReqFormActive] = React.useState<boolean>(false);
    const [isTestActive, setTestActive] = React.useState<boolean>(false);
    const [requirements, setRequirements] = React.useState([]);
    const [testDetails, setTestDetails] = React.useState<any[]>([]);
    const handleRequirementSet = (id: string) => {
        setSelectedRequirementSet(id);
        setSelectedItem(null);
        setSelectedtestSetId(null);
    };
    const handleTestSet = (id: string) => {
        setSelectedtestSetId(id);
        const selectedTestSet = testDetails.find(
            (item) => item.TestSetId === id
        );
        setSelectedTestSet(selectedTestSet);
        //console.log(id)
        console.log(selectedTestSet);
        setSelectedItem(null);
        setSelectedRequirementSet(null);
    };
    const handleSelectedItem = (id: number) => {
        setSelectedItem(id);
        setSelectedRequirementSet(null);
        setSelectedtestSetId(null);
        console.log(selectedItem);
    };
    const browseItems = [
        {
            id: 1,
            name: 'Requirements',
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

    const requirementsColumns: TableColumn[] = [
        { key: 'RequirementId', label: 'Requirement Id' },
        { key: 'RequirementSetId', label: 'RequirementSet Id' },
        { key: 'RequirementDescription', label: 'Requirement Description' },
        { key: 'RequirementCategory', label: 'Reference Category' },
        { key: 'ReferenceSOP', label: 'Reference SOP' },
        { key: 'Verification', label: 'Verification' },
    ];

    const testSetHeader: TableColumn[] = [
        { key: 'TestSetName', label: 'TestSet Name' },
        { key: 'TestSetId', label: 'TestSet Id' },
        { key: 'ReqSetId', label: 'ReqSet Id' },
        { key: 'RequirementSetName', label: 'RequirementSet Name' },
        { key: 'Category', label: 'Category' },
        { key: 'Description', label: 'Description' },
        { key: 'Status', label: 'Status' },
    ];

    const handleRequirementListState = (id: React.SetStateAction<number>) => {
        if (requirementSets.length != 0) {
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
    const createTestSet = () => {
        const obj = {
            _id: `${num}`,
            name: `TestSet ${num}`,
        };
        setTestSet([...testSet, obj]);
        setNum(num + 1);
        handleTestActive();
    };

    const createRequirements = () => {
        const entry = {
            RequirementId: 1900,
            RequirementSetId: 1094,
            RequirementDescription: 'Hello',
            RequirementCategory: 'Comedy',
            ReferenceSOP: 'Hi',
            Verification: 'Done',
        };
        setRequirements([[...requirements], entry]);
        console.log(requirements);
        handleFormActive();
    };
    const createTestDetails = () => {
        const entry2 = {
            TestSetId: `${num}`,
            ReqSetId: 26,
            TestSetName: 'Naveen',
            RequirementSetName: 'Arbaz',
            Category: 'IQ',
            Description: 'BLA BLA BLA',
            Status: 'Approved',
        };
        setTestDetails((prevTestDetails) => [...prevTestDetails, entry2]);
        handleTestActive();
        createTestSet();
    };

    const handleFormActive = () => {
        setReqFormActive(!isReqFormActive);
    };
    const handleTestActive = () => {
        setTestActive(!isTestActive);
    };
    const handleTestListState = (id: React.SetStateAction<number>) => {
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
                                    : items.id == 2
                                    ? 'tests'
                                    : selectedItem === items.id
                                    ? 'selected'
                                    : ''
                            }`}
                            onClick={
                                items.id === 1
                                    ? () => handleRequirementListState(items.id)
                                    : items.id === 2
                                    ? () => handleTestListState(items.id)
                                    : null
                            }
                        >
                            <img src={items.image} className="icons"></img>
                            {items.name}
                            <span>
                                {items.id === 1 &&
                                    requirementSets.length != 0 && (
                                        <img
                                            src="../../../public/right-arrow.png"
                                            className={`${
                                                !reqListState
                                                    ? 'arrow'
                                                    : 'arrow-down'
                                            }`}
                                        ></img>
                                    )}
                            </span>
                            <span>
                                {items.id === 2 &&
                                    (testSet.length != 0 ? (
                                        <img
                                            src="../../../public/right-arrow.png"
                                            className={`${
                                                !testListState
                                                    ? 'testArrow'
                                                    : 'testArrow-down'
                                            }`}
                                        ></img>
                                    ) : (
                                        <div>
                                            <span>+</span>
                                        </div>
                                    ))}
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
                                {testSet.map((set) => (
                                    <li
                                        key={set._id}
                                        className={`${
                                            selectedTestSetId === set._id
                                                ? 'selected-test-set'
                                                : ''
                                        }`}
                                        onClick={() => handleTestSet(set._id)}
                                    >
                                        {set.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </ul>
                ))}
            </div>
            <div className="project-dashboard-content">
                {selectedItem === 1 && (
                    <div>
                        <button
                            className="create-reqSet-button"
                            onClick={createRequirementSet}
                        >
                            Create Requirement Set
                        </button>
                    </div>
                )}
                {selectedItem === 2 && (
                    <div>
                        <button
                            className="create-reqSet-button"
                            onClick={handleTestActive}
                        >
                            Create Test Set
                        </button>
                        {isTestActive && (
                            <TestForm createTestDetails={createTestDetails} />
                        )}
                    </div>
                )}

                {selectedRequirementSet && (
                    <div>
                        <button
                            className="create-reqSet-button"
                            onClick={handleFormActive}
                        >
                            Create Requirements
                        </button>
                        {isReqFormActive ? (
                            <ReqForm
                                handleFormActive={handleFormActive}
                                createRequirements={createRequirements}
                            />
                        ) : (
                            <Table
                                data={requirements}
                                columns={requirementsColumns}
                            />
                        )}
                    </div>
                )}
                {selectedTestSetId && (
                    <div className="testsetdetails">
                        <table>
                            <tbody>
                                {testSetHeader.map((item) => (
                                    <tr key={item.key}>
                                        <td>{item.label}</td>
                                        <td>{selectedTestSet[item.key]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};
export default ProjectDashboard;
