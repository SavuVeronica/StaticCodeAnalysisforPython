import React, { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';

export default function DonutSonarType({sonarFindings}) {

    const [data, setData] = useState([]);

    useEffect(() => {
        var values = [0, 0, 0, 0, 0, 0];
        for (const finding of sonarFindings) {
            switch (finding.Type) {
                case 'BUG':
                    values[0] += 1;
                    break;
                case 'VULNERABILITY':
                    values[1] += 1;
                    break;
                case 'CODE_SMELL':
                    values[2] += 1;
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
                    labels: ['Bug', 'Vulnerability', 'Code Smell'],
                    datasets: [{
                        label: 'Types of Findings',
                        data: data,
                        backgroundColor: [
                            '#C56E90',
                            '#FF9C9C',
                            '#FFD0A1',
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