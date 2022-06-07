import React, { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';

export default function DonutSonarSeverity({sonarFindings}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        var values = [0, 0, 0, 0, 0, 0];
        for (const finding of sonarFindings) {
            switch (finding.category) {
                case 'BLOCKER':
                    values[0] += 1;
                    break;
                case 'CRITICAL':
                    values[1] += 1;
                    break;
                case 'MAJOR':
                    values[2] += 1;
                    break;
                case 'MINOR':
                    values[3] += 1;
                    break;
                case 'INFO':
                    values[4] += 1;
                    break;
            }
        }
        setData(values);
    }, [sonarFindings]);

    return (
        <div className='chart-container'>
            <Doughnut
                className='graphic'
                data={{
                    labels: ['Blocker', 'Critical', 'Major', 'Minor', 'Info'],
                    datasets: [{
                        label: 'Types of Findings',
                        data: data,
                        backgroundColor: [
                            '#C56E90',
                            '#FF9C9C',
                            '#FFD0A1',
                            '#FFEFC2',
                            '#A4DEAD'
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