import React, { useEffect, useState, createRef } from 'react';
import "./CompareRuns.css";
import SideMenu from '../Menu/SideMenu';
import { useLocation, useHistory } from "react-router-dom";
import DonutFindingsCategories from '../RunOverview/charts/DonutFindingsCategories';
import PieFindingsPerModule from '../RunOverview/charts/PieFindingsPerModule';
import BarFindingsPerFile from '../RunOverview/charts/BarFindingsPerFile';
import BarPylintRule from '../RunOverview/charts/BarPylintRule';
import PieFindingsPerModuleSonar from '../RunOverview/charts/PieFindingsPerModuleSonar';
import { FindingsContext } from '../../contexts/FindingsContext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import DonutSonarSeverity from '../RunOverview/charts/DonutSonarSeverity';
import DonutSonarType from '../RunOverview/charts/DonutSonarType';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import exportAsImage from '../RunOverview/exportAsImage';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

async function getPylintFindings(runId) {
    return fetch('http://localhost:4000/run/pylint/' + runId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then(data => {
            return data;
        });
}

async function getSonarFindings(runId) {
    return fetch('http://localhost:4000/run/sonar/' + runId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json())
        .then(data => {
            return data;
        });
}

export default function CompareRuns() {

    const { projectId, runId, findings, sonarFindings } = React.useContext(FindingsContext);

    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = React.useState(0);
    const location = useLocation();
    const history = useHistory();
    const [currentRun, setCurrentRun] = useState();
    const [compareRun, setCompareRun] = useState();
    const [currentFindings, setCurrentFindings] = useState();
    const [compareFindings, setCompareFindings] = useState();
    const [currentFindingsSonar, setCurrentFindingsSonar] = useState();
    const [compareFindingsSonar, setCompareFindingsSonar] = useState();

    const ref = createRef(null);
    const refSonar = createRef(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(async () => {
        setIsLoading(true);
        setCurrentRun(location.state.currentRun);
        setCompareRun(location.state.compareRun);
        setCurrentFindings(findings);
        setCurrentFindingsSonar(sonarFindings);
        const compFindings = await getPylintFindings(location.state.compareRun.id);
        setCompareFindings(compFindings);
        const compFindingsSonar = await getSonarFindings(location.state.compareRun.id);
        setCompareFindingsSonar(compFindingsSonar);
        setIsLoading(false);
    }, [projectId, runId, findings, sonarFindings]);

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
    };

    const handleBack = () => {
        history.goBack();
    };

    const renderFindingsData = !currentFindings || !compareFindings || !projectId
        || !currentFindingsSonar || !compareFindingsSonar ? null : (
        <div>
            <button
                type="submit"
                className="btn btn-success btn-block submitBtn"
                onClick={handleBack}>
                <ArrowBackIcon />
            </button>
            <button
                type="submit"
                className="btn btn-success btn-block submitBtn"
                onClick={() => exportAsImage(ref.current, "Runs Comparison " + formatDate(currentRun.dateTime) + " - " + formatDate(compareRun.dateTime))}>
                Export Comparison
            </button>

            <div ref={ref}>
                <div className='runs-title'>
                    <div className='run-info'>
                        <h4>Run Date: <br /> {formatDate(currentRun.dateTime)}</h4>
                    </div>
                    <div className='run-info'>
                        <h4>Run Date: <br /> {formatDate(compareRun.dateTime)}</h4>
                    </div>
                </div>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                        <Tab label="Pylint Analysis" {...a11yProps(0)} />
                        <Tab label="SonarQube Analysis" {...a11yProps(1)}
                            disabled={currentFindingsSonar.length === 0 || compareFindingsSonar.length === 0} />
                    </Tabs>
                </Box>

                <TabPanel value={value} index={0}>
                    <div className='runs-container'>
                        <div className='run'>
                            <h5>Number of issues: {currentFindings.length}</h5>
                            <br />

                            <div className='pie'>
                                <div className='header'>
                                    <b>By Category</b>
                                </div>
                                <br />
                                <DonutFindingsCategories
                                    className='donut'
                                    filteredFindings={currentFindings} />
                            </div>
                            <div className='pie'>
                                <div className='header'>
                                    <b>By Module</b>
                                </div>
                                <br />
                                <PieFindingsPerModule
                                    filteredFindings={currentFindings}
                                    projectId={projectId}
                                />
                            </div>
                            <div className='graphic'>
                                <div className='header'>
                                    <b>By File</b>
                                </div>
                                <br />
                                <BarFindingsPerFile filteredFindings={currentFindings} />
                            </div>
                            <div className='graphic'>
                                <div className='header'>
                                    <b>By Violated Rule</b>
                                </div>
                                <br />
                                <BarPylintRule filteredFindings={currentFindings} />
                            </div>
                        </div>

                        <div className='run'>
                            <h5>Number of issues: {compareFindings.length}</h5>
                            <br />
                            <div className='donut-compare'>
                                <br />
                                <br />
                                <DonutFindingsCategories
                                    className='donut'
                                    filteredFindings={compareFindings} />
                            </div>
                            <div className='pie-compare'>
                                <br />
                                <br />
                                <PieFindingsPerModule
                                    filteredFindings={compareFindings}
                                    projectId={projectId}
                                />
                            </div>
                            <div className='bar-compare'>
                                <br />
                                <br />
                                <BarFindingsPerFile filteredFindings={compareFindings} />
                            </div>
                            <div className='bar2-compare'>
                                <br />
                                <br />
                                <BarPylintRule filteredFindings={compareFindings} />
                            </div>
                        </div>
                    </div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    <div className='runs-container'>
                        <div className='run'>
                            <h5>Number of issues: {currentFindingsSonar.length}</h5>
                            <br />
                            <div className='pie'>
                                <div className='header'>
                                    <b>By Severity</b>
                                </div>
                                <br />
                                <DonutSonarSeverity
                                    sonarFindings={currentFindingsSonar}
                                />
                            </div>
                            <div className='pie'>
                                <div className='header'>
                                    <b>By Type</b>
                                </div>
                                <br />
                                <DonutSonarType
                                    sonarFindings={currentFindingsSonar}
                                />
                            </div>
                            <div className='pie'>
                                <div className='header'>
                                    <b>By Module</b>
                                </div>
                                <br />
                                <PieFindingsPerModuleSonar
                                    filteredFindings={currentFindingsSonar}
                                    projectId={projectId}
                                />
                            </div>
                            <div className='graphic'>
                                <div className='header'>
                                    <b>By File</b>
                                </div>
                                <br />
                                <BarFindingsPerFile filteredFindings={currentFindingsSonar} />
                            </div>
                            <div className='graphic'>
                                <div className='header'>
                                    <b>By Violated Rule</b>
                                </div>
                                <br />
                                <BarPylintRule filteredFindings={currentFindingsSonar} />
                            </div>
                        </div>
                        <div className='run'>
                            <h5>Number of issues: {compareFindingsSonar.length}</h5>
                            <br />
                            <div className='donut-compare'>
                                <br />
                                <br />
                                <DonutSonarSeverity
                                    sonarFindings={compareFindingsSonar}
                                />
                            </div>
                            <div className='donut-compare'>
                                <br />
                                <br />
                                <DonutSonarType
                                    sonarFindings={compareFindingsSonar}
                                />
                            </div>
                            <div className='pie-compare'>
                                <br />
                                <br />
                                <PieFindingsPerModuleSonar
                                    filteredFindings={compareFindingsSonar}
                                    projectId={projectId}
                                />
                            </div>
                            <div className='bar-compare'>
                                <br />
                                <br />
                                <BarFindingsPerFile filteredFindings={compareFindingsSonar} />
                            </div>
                            <div className='bar2-compare'>
                                <br />
                                <br />
                                <BarPylintRule filteredFindings={compareFindingsSonar} />
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </div>
        </div>
    );

    return (
        <div className='content'>
            <SideMenu />

            <div className='page-content'>
                <div className='run-overview'>
                    <div className="wrapper-overview">
                        <div className="overview-page">
                            {isLoading ? <LoadingSpinner /> : renderFindingsData}
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}