import React from 'react';
import './ProjectDashboard.css';

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
    const handleRequirementSet = (id: string) => {
        setSelectedRequirementSet(id);
        setSelectedItem(null);
    };
    const handleSelectedItem = (id: number) => {
        setSelectedItem(id);
        setSelectedRequirementSet(null);
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
    const requirementSets: RequirementSet[] = [
        {
            _id: '1',
            name: 'Requirement Set 1',
        },
        {
            _id: '2',
            name: 'Requirement Set 2',
        },
        {
            _id: '3',
            name: 'Requirement Set 3',
        },
    ];
    const handleListState = () => {
        setListState(!listState);
    };
    return (
        <div className="project-dashboard">
            <div className="project-dashboard-sidebar">
                {browseItems.map((items) => (
                    <ul>
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
        </div>
    );
};
export default ProjectDashboard;
