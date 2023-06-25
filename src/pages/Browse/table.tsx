// import React from 'react';

// interface Project {
//     name: string;
//     Department: string;
//     Category: string;
//     ProjectDescription: string;
//     EstimatedDate: number;
// }

// interface TableProps {
//     projects: Project[];
//     TableHeader: string[];
// }

// const Table: React.FC<TableProps> = (props) => {
//     const { projects,TableHeader } = props;

//     return (
//         <table className="content-table">
//             <thead>
//                 <tr>
//                 {TableHeader.map(
//                     item=><th>{item}</th>
//                 )}
//                 </tr>
//             </thead>
//             <tbody>
//                 {projects.map((project) => (
//                     <tr key={project.name}>
//                         <td>{project.name}</td>
//                         <td>{project.Department}</td>
//                         <td>{project.Category}</td>
//                         <td>{project.ProjectDescription}</td>
//                         <td>{project.EstimatedDate}</td>
//                     </tr>
//                 ))}
//                 <tr>
//                     <td>Arbaz</td>
//                     <td>Khan</td>
//                     <td>Hooda</td>
//                     <td>Deepak</td>
//                     <td>16-02-2024</td>
//                 </tr>
//             </tbody>
//         </table>
//     );
// };

// export default Table;

import React from 'react';

interface TableColumn {
    key: string;
    label: string;
}

interface TableProps {
    data: any[];
    columns: TableColumn[];
}

const Table: React.FC<TableProps> = ({ data, columns }) => {
    return (
        <table className="content-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.label}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        {columns.map((column) => (
                            <td key={column.key}>{item[column.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
