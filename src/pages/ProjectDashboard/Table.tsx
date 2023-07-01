import React from 'react';
// import './Table.css'
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
