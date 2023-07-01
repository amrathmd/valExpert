import React, { useState } from 'react';
import './ProjectDashboard.css';
import ReqForm from './ReqForm';
import Table from './Table';

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
    const [selectedItem, setSelectedItem] = React.useState(1);
    const [testListState, setTestListState] = React.useState(false);
    const [selectedRequirementSet, setSelectedRequirementSet] =
        React.useState(null);
    const [selectedTestSet, setSelectedtestSet] = React.useState(null);

    const [requirementSets, setRequirementSets] = React.useState<
        RequirementSet[]
    >([]);

    const [count, setCount] = React.useState<number>(1);
    const [isReqFormActive, setReqFormActive] = React.useState<boolean>(false);
    const [requirements, setRequirements] = React.useState([]);
    const handleRequirementSet = (id: string) => {
        setSelectedRequirementSet(id);
        setSelectedItem(null);
        setSelectedtestSet(null);
    };
    const handleTestSet = (id: string) => {
        setSelectedtestSet(id);
        setSelectedItem(null);
        setSelectedRequirementSet(null);
    };
    const handleSelectedItem = (id: number) => {
        setSelectedItem(id);
        setSelectedRequirementSet(null);
        setSelectedtestSet(null);
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
    const testSets: TestSet[] = [
        {
            _id: '6',
            name: 'test Set 1',
        },
        {
            _id: '7',
            name: 'test Set 2',
        },
        {
            _id: '8',
            name: 'test Set 3',
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

    const handleRequirementListState = () => {
        if (requirementSets.length != 0) {
            setReqListState(!reqListState);
        }
        setSelectedItem(1);
        setSelectedRequirementSet(null);
    };

    const createRequirementSet = () => {
        const obj = {
            _id: `${count}`,
            name: `RequirementSet ${count}`,
        };

        setRequirementSets([...requirementSets, obj]);
        setCount(count + 1);
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

    const handleFormActive = () => {
        setReqFormActive(!isReqFormActive);
    };
    const handleTestListState = () => {
        setTestListState(!testListState);
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
                                    ? handleRequirementListState
                                    : items.id === 2
                                    ? handleTestListState
                                    : () => handleSelectedItem(items.id)
                            }
                        >
                            <img src={items.image} className="icons"></img>
                            {items.name}
                            <span>
                                {items.id === 1 && (
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
                                {items.id === 2 && (
                                    <img
                                        src="../../../public/right-arrow.png"
                                        className={`${
                                            !testListState
                                                ? 'testArrow'
                                                : 'testArrow-down'
                                        }`}
                                    ></img>
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
                                {testSets.map((set) => (
                                    <li
                                        key={set._id}
                                        className={`${
                                            selectedTestSet === set._id
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
            </div>
        </div>
    );
};
export default ProjectDashboard;
