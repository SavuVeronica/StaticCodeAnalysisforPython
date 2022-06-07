import React, { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';
import { FindingsContext } from '../../../contexts/FindingsContext';
// const data = {
//     labels: ['Fatal', 'Error', 'Warning', 'Convention', 'Refactor', 'Information'],
//     datasets: [{
//         label: 'Types of Findings',
//         data: [12, 19, 3, 5, 2, 3],
//         backgroundColor: [
//             '#C56E90',
//             '#FF9C9C',
//             '#FFD0A1',
//             '#FFEFC2',
//             '#A4DEAD',
//             '#80BFA0'
//         ],
//         hoverOffset: 4
//     }]
// };

export default function DonutFindingsCategories({filteredFindings}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        var values = [0, 0, 0, 0, 0, 0];
        for (const finding of filteredFindings) {
            switch (finding.category) {
                case 'fatal':
                    values[0] += 1;
                    break;
                case 'error':
                    values[1] += 1;
                    break;
                case 'warning':
                    values[2] += 1;
                    break;
                case 'convention':
                    values[3] += 1;
                    break;
                case 'refactor':
                    values[4] += 1;
                    break;
                case 'information':
                    values[5] += 1;
                    break;
            }
        }
        setData(values);
    }, [filteredFindings]);

    return (
        <div className='chart-container'>
            <Doughnut
                className='graphic'
                data={{
                    labels: ['Fatal', 'Error', 'Warning', 'Convention', 'Refactor', 'Information'],
                    datasets: [{
                        label: 'Types of Findings',
                        data: data,
                        backgroundColor: [
                            '#C56E90',
                            '#FF9C9C',
                            '#FFD0A1',
                            '#FFEFC2',
                            '#A4DEAD',
                            '#80BFA0'
                        ],
                        hoverOffset: 4
                    }]
                }}
                options={{
                    maintainAspectRatio: false
                }}>
            </Doughnut>
        </div>
    );
}