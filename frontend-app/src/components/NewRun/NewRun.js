import React, { useEffect, useState } from 'react';
import "./NewRun.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { FiArrowRight } from "react-icons/fi";
import SideMenu from '../Menu/SideMenu';
import { UserContext } from '../../contexts/UserContext';
import { TextareaAutosize } from '@mui/material';
import Collapsible from 'react-collapsible';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

async function getProjects(userId) {
    return fetch('http://localhost:4000/project/user/' + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then(data => {
            return data;
        });
}

async function callAPINewRun(data) {

    return fetch('http://localhost:4000/report/new-run', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    })
        .then(data => {
            return data;
        });
}

export default function NewRun() {

    const { userId } = React.useContext(UserContext);

    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [sonarData, setSonarData] = useState("");
    const [isCheckedTerms, setIsCheckedTerms] = useState(false);

    useEffect(() => {
        // We need the list of projects for the user to select
        getProjects(userId).then(result => {
            setProjects(result);
        });
    }, []);

    const createNewRun = async e => {
        e.preventDefault();
        setIsLoading(true);

        // get selected project
        const project = projects[selectedIndex];
        const runData = {
            userId: userId,
            projectId: project.id,
            sonarData: sonarData !== "" ? JSON.stringify(JSON.parse(sonarData)) : ""
        };
        const newRun = await callAPINewRun(runData);
        if (newRun === undefined) {
            NotificationManager.error('Errors occured. Run could not be created.', 'Error', 1000);
        } else {
            NotificationManager.success('Run created succesfully!', 'Success', 1000);
            setIsCheckedTerms(false);
            setSelectedIndex(0);
            setSonarData("");
        }
        setIsLoading(false);
    };

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const setCheckedTerms = e => {
        setIsCheckedTerms(e.currentTarget.checked);
    };

    const setSonarQubeData = e => {
        setSonarData(e.target.value);
    }

    const renderNewRunForm = !projects ? null : (
        <div>
            <form onSubmit={createNewRun} className="project-form">
                <div className="form-fields">
                    <div className="form-group instruction">
                        <label>1. Choose Project</label>
                        <Box className='box'>
                            <List component="nav" aria-label="secondary mailbox folder" className='projects-list'>
                                {projects.map((project, idx) =>
                                    <ListItemButton
                                        className='item'
                                        key={project.id}
                                        selected={selectedIndex === idx}
                                        onClick={(event) => { handleListItemClick(event, idx); }}
                                    >
                                        <ListItemText primary={project.name} secondary={project.localpath} />
                                    </ListItemButton>
                                )}
                            </List>
                        </Box>
                    </div>

                    <div className="form-group instruction">
                        <label>2. Check Python is installed</label>
                        <br />
                        <p>You can check if Python is installed by running the following command:</p>
                        <p className="command">python --version</p>
                        <br />
                        <p>If you don't have Python installed, follow the instructions&nbsp;
                            <a
                                href='https://www.ics.uci.edu/~pattis/common/handouts/pythoneclipsejava/python.html'
                                target="_blank">
                                here
                            </a>.
                        </p>
                    </div>

                    <div className="form-group instruction">
                        <label>3. Check pip is installed</label>
                        <br />
                        <p>You can check if pip is installed by running the following command:</p>
                        <p className="command">pip --version</p>
                        <br />
                        <p>If you don't have pip installed, follow the instructions&nbsp;
                            <a
                                href='https://www.ics.uci.edu/~pattis/common/handouts/pythoneclipsejava/python.html'
                                target="_blank">
                                here
                            </a>.
                        </p>
                    </div>

                    <div className="form-group instruction">
                        <label>4. Check Pylint is installed</label>
                        <br />
                        <p>You can check if Pylint is installed by running the following command:</p>
                        <p className="command">pylint --version</p>
                        <br />
                        <p>If you don't have pip installed, follow the instructions&nbsp;
                            <a
                                href='https://learn.adafruit.com/improve-your-code-with-pylint/install-pylint'
                                target="_blank">
                                here
                            </a>.
                        </p>
                    </div>
                </div>

                <FormControlLabel
                    className="confirm-msg"
                    control={<Checkbox id="reqMet" required checked={isCheckedTerms}
                        onChange={setCheckedTerms} />}
                    label="All above requirements are met *" />

                <div className="sonar-data">
                    <Collapsible trigger={["5. Enter data from SonarQube (optional)", <ExpandMoreIcon key="icon" />]} easing={'cubic-bezier(0.175, 0.885, 0.32, 2.275)'}
                    >
                        <p>You can get it following these steps:</p>
                        <ul>
                            <li key="1" className='list-item'>Start SonarQube.</li>
                            <li key="2" className='list-item'>Run an analysis for this project.</li>
                            <li key="3" className='list-item'>Go to the browser into a new window and type the following URL:
                                <p className="command">http://localhost:9000/api/issues/search?componentKeys=&lt;project-name&gt;</p>
                                Replace the "project-name" with the name of your SonarQube project.
                            </li>
                            <li key="4" className='list-item'>Copy the result and past it in the text area below.</li>
                        </ul>
                        <TextareaAutosize
                            className='text-area'
                            value={sonarData}
                            onChange={setSonarQubeData}
                            minRows={7}
                            maxRows={10} />
                    </Collapsible>
                </div>

                <div className='form-buttons'>
                    <button type="submit" className="btn btn-primary btn-block submitBtn">
                        Start Run&nbsp;
                        <FiArrowRight />
                    </button>
                </div>
            </form>
        </div>
    );

    return (
        <div className='content'>
            <SideMenu />
            <div className='page-content'>
                <div className='new-run'>
                    <div className="wrapper-new">
                        <div className="form-new">
                            {isLoading ? <LoadingSpinner /> : renderNewRunForm}
                        </div>
                    </div>
                    <NotificationContainer />
                </div>
            </div>
        </div>
    );
};