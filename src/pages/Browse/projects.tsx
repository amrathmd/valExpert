// import React from 'react'
// import { useState } from 'react';
// import Table from './table';
// import Form from './Form';
// class Projects=(props)=>{
//     const [projects, setProjects] = useState([]);
//     const [prompt, setprompt] = useState(false);

//     const handleCreateProject = () => {
//         const obj = {
//             name: 'Naveen',
//             Department: 'CSE',
//             Category: 'None',
//             ProjectDescription: 'Nothing',
//             EstimatedDate: '12-09-2025',
//         };
//         setProjects([...projects, obj]);
//         handlePrompt();
//         console.log(projects);
//     };

//     const handlePrompt = () => {
//         setprompt(!prompt);
//     };

//     return(
//         {selectedItem.label === 'Projects' &&
//         projects.length === 0 ? (
//             <div>
//                 <div className="projects-empty">
//                     <div>
//                         <p className="para">
//                             Have Yout tried our Projects?
//                         </p>
//                         <ul className="dot-list">
//                             <li>
//                                 share multiple sheets and
//                                 folders to workspace members
//                             </li>
//                             <li>
//                                 create client workspaces with
//                                 custom colors & logo
//                             </li>
//                         </ul>
//                         <i
//                             className="fa fa-start-o"
//                             aria-hidden="true"
//                         ></i>
//                         <img
//                             className="projects-img"
//                             src={selectedItem.image}
//                             alt={selectedItem.label}
//                         />

//                         <span
//                             className="create-button"
//                             onClick={handlePrompt}
//                         >
//                             Create new Project
//                         </span>
//                         <Form
//                             prompt={prompt}
//                             handlePrompt={handlePrompt}
//                             handleCreateProject={
//                                 handleCreateProject
//                             }
//                         />
//                     </div>
//                 </div>
//             </div>
//         ) : (
//             selectedItem.label == 'Projects' && (
//                 <div>
//                     <Table projects={projects} />
//                     <Form
//                         prompt={prompt}
//                         handlePrompt={handlePrompt}
//                         handleCreateProject={
//                             handleCreateProject
//                         }
//                     />
//                     <div
//                         onClick={handlePrompt}
//                         className="create-project"
//                     >
//                         Create Project
//                     </div>
//                 </div>
//             )
//         )}
//     )
// }

// export default Projects;

import React from 'react';
import { useState } from 'react';
import Table from './table';
import Form from './Form';

interface BrowseItem {
    id: number;
    image: string;
    label: string;
    content: string;
}

interface ProjectsProps {
    selectedItem: BrowseItem | null;
}

interface TableColumn {
    key: string;
    label: string;
}

const Projects: React.FC<ProjectsProps> = ({ selectedItem }) => {
    const [projects, setProjects] = useState([]);
    const [prompt, setPrompt] = useState(false);

    const projectColumns: TableColumn[] = [
        { key: 'name', label: 'Name' },
        { key: 'department', label: 'Department' },
        { key: 'category', label: 'Category' },
        { key: 'projectDescription', label: 'Project Description' },
        { key: 'estimatedDate', label: 'Estimated Implementation Date' },
    ];

    const handleCreateProject = () => {
        const obj = {
            name: 'Naveen',
            department: 'CSE',
            category: 'None',
            projectDescription: 'Nothing',
            estimatedDate: '12-09-2025',
        };
        setProjects([...projects, obj]);
        handlePrompt();
        console.log(projects);
    };

    const handlePrompt = () => {
        setPrompt(!prompt);
    };

    return (
        <>
            {selectedItem?.label === 'Projects' && projects.length === 0 ? (
                <div>
                    <div className="projects-empty">
                        <div>
                            <p className="para">Have You tried our Projects?</p>
                            <ul className="dot-list">
                                <li>
                                    share multiple sheets and folders to
                                    workspace members
                                </li>
                                <li>
                                    create client workspaces with custom colors
                                    & logo
                                </li>
                            </ul>
                            <i className="fa fa-start-o" aria-hidden="true"></i>
                            <img
                                className="projects-img"
                                src={selectedItem.image}
                                alt={selectedItem.label}
                            />

                            <span
                                className="create-button"
                                onClick={handlePrompt}
                            >
                                Create new Project
                            </span>
                            <Form
                                prompt={prompt}
                                handlePrompt={handlePrompt}
                                handleCreateProject={handleCreateProject}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                selectedItem?.label === 'Projects' && (
                    <div>
                        <Table data={projects} columns={projectColumns} />
                        <Form
                            prompt={prompt}
                            handlePrompt={handlePrompt}
                            handleCreateProject={handleCreateProject}
                        />
                        <div onClick={handlePrompt} className="create-project">
                            Create Project
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default Projects;
