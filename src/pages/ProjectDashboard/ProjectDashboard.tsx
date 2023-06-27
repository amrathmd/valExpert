import React, { useState } from 'react';
import './ProjectDashboard.css';
import Requirements from './Requirements';
interface RequirementSet {
    _id: string;
    name: string;
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
                            <img src={items.image} className="icons"></img>
                            {items.name}
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
                                                ? 'selected-set'
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
                <Requirements
                    selectedItem={selectedItem}
                    selectedRequirementSet={selectedRequirementSet}
                    createRequirementSet={createRequirementSet}
                />
            </div>
        </div>
    );
};
export default ProjectDashboard;
