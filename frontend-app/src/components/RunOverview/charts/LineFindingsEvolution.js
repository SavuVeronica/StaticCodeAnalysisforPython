// findings evolution during all runs of a project
import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';

export default function LineFindingsEvolution({ projectId, runs }) {

    const [count, setCount] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(async () => {
        if (projectId === "") return;

        var values = [];
        var labelsV = [];
        runs.sort((a, b) => new Date(a.dateTime) < new Date(b.dateTime) ? 1 : -1);
        for (const run of runs) {
            values.push(run.noFindings);
            labelsV.push(run.id);
        }
        setCount(values);
        setLabels(labelsV);
    }, [projectId]);

    return (
        <div className="file-findings">
            <Line
                className='graphic'
                data={{
                    labels: labels,
                    datasets: [{
                        label: 'Total number of issues',
                        data: count,
                        fill: true,
                        tension: 0.1,
                        borderCapStyle: 'square',
                        borderWidth: 3,
                        pointRadius: 10,
                        pointStyle: 'circle',
                        borderJoinStyle: 'round',
                        borderColor: [
                            '#C56E90'
                        ],
                        hoverOffset: 4
                    }]
                }}
                options={{
                    maintainAspectRatio: false
                }}>
            </Line>
        </div>
    );
}

