import React, { useEffect, useState } from 'react';
import "./ViewRuns.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import 'react-notifications/lib/notifications.css';
import { FiArrowRight } from "react-icons/fi";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import SideMenu from '../Menu/SideMenu';
import { UserContext } from '../../contexts/UserContext';
import { Form } from "react-bootstrap";
import LineFindingsEvolution from '../RunOverview/charts/LineFindingsEvolution';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { FindingsContext } from '../../contexts/FindingsContext';

async function getAllProjects(userId) {
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

async function getNumberOfFindings(projectId) {
    return fetch('http://localhost:4000/run-count/project/' + projectId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(data => {
        if (data.ok) {
            return data.json()
        }
        return [];
    }).catch((err) => {
        return [];
    })
}

async function deleteRunAPICall(runId) {
    return fetch('http://localhost:4000/run/' + runId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then(data => {
            return data;
        });
}

export default function ViewRuns() {
    const { userId } = React.useContext(UserContext);
    const { setProjectData } = React.useContext(FindingsContext);

    const [isLoading, setIsLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState();
    const [noFindings, setNoFindings] = useState();
    const [runFind, setRunFind] = useState();

    useEffect(async () => {
        setIsLoading(true);
        const proj = await getAllProjects(userId);
        if (proj.length !== 0) {
            setProjects(proj);
            setSelectedProject(proj[0].id);
            setProjectData(proj[0]);
            return;
        }
        setIsLoading(false);
    }, [userId]);

    useEffect(async () => {
        if(!selectedProject)
            return;

        setIsLoading(true);
        const noFindings = await getNumberOfFindings(selectedProject);
        setRunFind(noFindings);
        if (noFindings.length === 0) {
            setIsLoading(false);
            return;
        }
        noFindings.sort((a, b) => new Date(a.dateTime) < new Date(b.dateTime) ? 1 : -1);
        setNoFindings(noFindings[0].noFindings);
        setIsLoading(false);
    }, [selectedProject]);

    const formatDate = (dateTime) => {
        return new Date(dateTime).toLocaleDateString();
    };

    const formatTime = (dateTime) => {
        return new Date(dateTime).toLocaleTimeString();
    };

    const deleteRun = async (run) => {
        const runDeleted = await deleteRunAPICall(run.id);
        if (runDeleted === undefined) {
            NotificationManager.error('Errors occured. Run could not be deleted.', 'Error', 1000);
        } else {
            NotificationManager.success('Run is deleted!', 'Success', 1000);
            setRunFind(runFind.filter(r => r.id !== run.id));
        }
    };

    const handleSelect = async e => {
        const projectId = e.target.value;
        setSelectedProject(projectId);
        const project = projects.filter(proj => proj.id === projectId);
        setProjectData(project);
    };

    const getLastRunOfProject = () => {
        if (runFind.length === 0 || runFind.error) return "No previous runs";

        runFind.sort((a, b) => new Date(a.dateTime) < new Date(b.dateTime) ? 1 : -1);
        const lastRun = new Date(runFind[0].dateTime);
        return lastRun;
    };

    const getSelectedProject = () => {
        for (const proj of projects) {
            if (proj.id === Number(selectedProject))
                return proj.localpath;
        }
        return "";
    }

    const renderRunData = !runFind ? null : (
        <div>
            <div className='head-info'>
                <div className='project-info'>
                    <p><b>Project Path: </b> <br />{getSelectedProject()}</p>
                </div>
                <div className='run-information'>
                    <div>
                        <p className='last-date'><b>Last Run: &nbsp; &nbsp;</b>{getLastRunOfProject() !== "No previous runs" ? getLastRunOfProject().toLocaleDateString() : "No previous runs"}</p>
                    </div>
                    <div>
                        <p>{getLastRunOfProject() !== "No previous runs" ? getLastRunOfProject().toLocaleTimeString() : ""}</p>
                    </div>
                </div>
            </div>

            <div className='nr-findings'>
                <p><b>Current number of issues:</b><br />{noFindings}</p>
            </div>

            <div className='overview-content'>
                <div className='column'>
                    <LineFindingsEvolution projectId={selectedProject} runs={runFind}/>
                </div>
            </div>
            <br />

            <b>List of runs:</b>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Run Number</TableCell>
                            <TableCell align="center">Date</TableCell>
                            <TableCell align="center">Time</TableCell>
                            <TableCell align="center">Number of issues</TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {runFind.map((run, idx) =>
                            <TableRow
                                key={run.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{run.id}</TableCell>
                                <TableCell align="center">{formatDate(run.dateTime)}</TableCell>
                                <TableCell align="center">{formatTime(run.dateTime)}</TableCell>
                                <TableCell align="center">{run.noFindings}</TableCell>
                                <TableCell align="center">
                                    <div >
                                        <IconButton aria-label="delete" size="large" onClick={() => { deleteRun(run); }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                </TableCell>
                                <TableCell align="center">
                                    <Link
                                        to={{
                                            pathname: `/run-overview/${run.id}`,
                                            state: { run: run }
                                        }}
                                    >
                                        <Button variant="contained" size="small"
                                            endIcon={<FiArrowRight />}>
                                            See Run&nbsp;

                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );

    return (
        <div className='content'>
            <SideMenu />
            <div className='page-content'>
                <div className='view-runs'>
                    <div className="wrapper-runs">
                        <div className="form-new">

                            <p>Choose project to view:</p>
                            <Form.Select value={selectedProject} onChange={handleSelect}>
                                {projects.map((project) => {
                                    return <option key={project.id} value={project.id}>{project.name}</option>;
                                })}
                            </Form.Select>
                            <br />

                            {isLoading ? <LoadingSpinner /> : renderRunData}

                        </div>
                    </div>
                </div >
                <NotificationContainer />
            </div>
        </div>
    );
};

// ViewRuns.propTypes = {
//     userId: PropTypes.number.isRequired
// };