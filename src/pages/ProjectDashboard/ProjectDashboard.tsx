import React, { useState } from 'react';
import './ProjectDashboard.css';
import ReqForm from './ReqForm';
import Table from './Table';

interface RequirementSet {
    _id: string;
    name: string;
}
interface TableColumn {
    key: string;
    label: string;
}

const ProjectDashboard = () => {
    const [listState, setListState] = React.useState<boolean>(false);
    const requirementsRef = React.useRef<HTMLUListElement>(null);
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [selectedRequirementSet, setSelectedRequirementSet] =
        React.useState(null);
    const [requirementSets, setRequirementSets] = React.useState<
        RequirementSet[]
    >([]);
    const [count, setCount] = React.useState<number>(1);
    const [isReqFormActive, setReqFormActive] = React.useState<boolean>(false);
    const [requirements, setRequirements] = React.useState([]);
    const handleRequirementSet = (id: string) => {
        setSelectedRequirementSet(id);
        setSelectedItem(null);
    };
    const handleSelectedItem = (id: number) => {
        setSelectedItem(id);
        setSelectedRequirementSet(null);
        console.log(selectedItem);
    };
    const browseItems = [
        {
            id: 1,
            name: 'Requirements',
        },
        {
            id: 2,
            name: 'Test sets',
        },
        {
            id: 3,
            name: 'Defects',
        },
    ];
    // const requirementSets: RequirementSet[] = [
    //     {
    //         _id: '1',
    //         name: 'Requirement Set 1',
    //     },
    //     {
    //         _id: '2',
    //         name: 'Requirement Set 2',
    //     },
    //     {
    //         _id: '3',
    //         name: 'Requirement Set 3',
    //     },
    // ];

    const requirementsColumns: TableColumn[] = [
        { key: 'RequirementId', label: 'Requirement Id' },
        { key: 'RequirementSetId', label: 'RequirementSet Id' },
        { key: 'RequirementDescription', label: 'Requirement Description' },
        { key: 'RequirementCategory', label: 'Reference Category' },
        { key: 'ReferenceSOP', label: 'Reference SOP' },
        { key: 'Verification', label: 'Verification' },
    ];

    const handleListState = () => {
        if (requirementSets.length != 0) {
            setListState(!listState);
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

    return (
        <div className="project-dashboard">
            <div className="project-dashboard-sidebar">
                {browseItems.map((items) => (
                    <ul key={items.id}>
                        <li
                            className={`${
                                items.id === 1
                                    ? 'requirements'
                                    : selectedItem == items.id
                                    ? 'selected'
                                    : ''
                            }`}
                            onClick={
                                items.id === 1
                                    ? handleListState
                                    : () => handleSelectedItem(items.id)
                            }
                        >
                            <span>
                                {items.id === 1 && (
                                    <img
                                        src="../../../public/right-arrow.png"
                                        className={`${
                                            !listState ? 'arrow' : 'arrow-down'
                                        }`}
                                    ></img>
                                )}
                            </span>
                            {items.name}
                        </li>
                        {items.id === 1 && (
                            <ul
                                ref={requirementsRef}
                                className={`requirements-list ${
                                    listState ? 'open' : 'closed'
                                }`}
                                style={
                                    listState
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
                                                ? 'selected'
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
