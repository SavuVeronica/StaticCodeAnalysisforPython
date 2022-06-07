import React, { useEffect, useState, useRef } from 'react';

import { Doughnut } from 'react-chartjs-2';
import { FindingsContext } from '../../../contexts/FindingsContext';

async function getProjectData(projectId) {
    return fetch('http://localhost:4000/project/' + projectId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then(data => {
            return data;
        });
}

export function useIsMounted() {
    const isMounted = useRef(false);
  
    useEffect(() => {
      isMounted.current = true;
      return () => isMounted.current = false;
    }, []);
  
    return isMounted;
  }

export default function PieFindingsPerModule({filteredFindings, projectId}) {
    // const { filteredFindings, projectId } = React.useContext(FindingsContext);
    const [count, setCount] = useState([]);
    const [labels, setLabels] = useState([]);

    const isMounted = useIsMounted();

    useEffect(async () => {
        var projectData = await getProjectData(projectId);
        var data = [...filteredFindings];
        const regex = new RegExp('^' + projectData.name + '[.]{1}.*[.].*$');
        data = data.map(item => {
            if(regex.test(item.filename)){ 
                return item.filename.split(".")[1];
            }
            return "root folder";
        });
        data.sort((a, b) => a > b ? 1 : -1);

        var values = [];
        var labelsV = [];
        var i = 1;
        values.push(1);
        labelsV.push(data[0]);
        while (i<data.length) {
            if(data[i-1] === data[i]) {
                values[values.length-1] +=1;
            } else {
                values.push(1);
                labelsV.push(data[i]);
            }
            i++;
        }
        if(isMounted.current) {
        setCount(values);
        setLabels(labelsV);
        }
    }, [filteredFindings]);

    return (
        <div >
            <Doughnut
                className='graphic'
                data={{
                    labels: labels,
                    datasets: [{
                        label: 'Types of Findings',
                        data: count,
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