import React, { useEffect, useState } from 'react';

import { Bar } from 'react-chartjs-2';
import { FindingsContext } from '../../../contexts/FindingsContext';

export default function BarFindingsPerFile({ filteredFindings }) {

    const [count, setCount] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        var data = [...filteredFindings];
        data.sort((a, b) => a.filename > b.filename ? 1 : -1);

        var values = [];
        var labelsV = [];
        if (data.length !== 0) {
            var i = 1;
            values.push(1);
            labelsV.push(data[0].filename);
            while (i < data.length) {
                if (data[i - 1].filename === data[i].filename) {
                    values[values.length - 1] += 1;
                } else {
                    values.push(1);
                    labelsV.push(data[i].filename);
                }
                i++;
            }
        }
        setCount(values);
        setLabels(labelsV);
    }, [filteredFindings]);

    return (
        <div className='file-findings'>
            <Bar
                className='graphic'
                data={{
                    labels: labels,
                    datasets: [{
                        indexAxis: 'y',
                        // barThickness: 30,
                        grouped: true,
                        skipNull: true,
                        borderWidth: 1,
                        borderColor: '#FF9C9C',
                        borderRadius: 3,
                        label: 'Number of issues',
                        data: count,
                        fill: false,
                        backgroundColor: [
                            '#FFEFC2'
                        ],
                        hoverOffset: 4
                    }]
                }}
                options={{
                    maintainAspectRatio: false
                }}>
            </Bar>
        </div>
    );
}