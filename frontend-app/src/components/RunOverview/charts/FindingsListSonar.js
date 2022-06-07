import React, { useEffect, useState } from 'react';
import MUIDataTable from "mui-datatables";


const columns = [
    {
        name: "filename",
        label: "File/Module Name",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "line",
        label: "Code Line",
        options: {
            filter: false,
            sort: false,
        },
    },
    {
        name: "rule",
        label: "Rule",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "message",
        label: "Message",
        options: {
            filter: false,
            sort: true,
        },
    },
    {
        name: "category",
        label: "Category",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "effortToSolve",
        label: "Effort To Solve",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "Type",
        label: "Type",
        options: {
            filter: true,
            sort: true,
        },
    }
];

export default function FindingsListSonar({ filteredFindings, projectId }) {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        setRows(filteredFindings);
    }, [filteredFindings]);

    return (
        <div className='chart-container'>
            <MUIDataTable
                title={"List of issues"}
                data={rows}
                columns={columns}
                options={{ 
                    filterType: "checkbox", 
                    pagination: false, 
                    draggableColumns: { enabled: true},
                    selectableRows: "none",
                    downloadOptions: {
                        filename: "SonarQube issues report - project " + projectId + ".csv"
                    },
                    responsive: "vertical"
                }}
            />
        </div>
    );
}