import React, { useEffect, useState, useRef } from 'react';

import { Bar } from 'react-chartjs-2';
import { FindingsContext } from '../../../contexts/FindingsContext';

export function useIsMounted() {
    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;
        return () => isMounted.current = false;
    }, []);

    return isMounted;
}

export default function BarPylintRule({ filteredFindings }) {

    const isMounted = useIsMounted();

    const [count, setCount] = useState([]);
    const [labels, setLabels] = useState([]);

    useEffect(() => {
        var data = [...filteredFindings];
        data.sort((a, b) => a.rule > b.rule ? 1 : -1);

        var values = [];
        var labelsV = [];
        if (data.length !== 0) {
            var i = 1;
            values.push(1);
            labelsV.push(data[0].rule);
            while (i < data.length) {
                if (data[i - 1].rule === data[i].rule) {
                    values[values.length - 1] += 1;
                } else {
                    values.push(1);
                    labelsV.push(data[i].rule);
                }
                i++;
            }
        }
        if (isMounted.current) {
            setCount(values);
            setLabels(labelsV);
        }
    }, [filteredFindings]);

    return (
        <div className='file-findings'>
            <Bar
                className='graphic'
                data={{
                    labels: labels,
                    datasets: [{
                        indexAxis: 'y',
                        grouped: true,
                        skipNull: true,
                        borderWidth: 1,
                        borderColor: '#FF9C9C',
                        borderRadius: 3,
                        label: 'Number of issues',
                        data: count,
                        fill: false,
                        backgroundColor: [
                            '#C56E90',
                            // '#FF9C9C'
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