import React, { useEffect, useState, createRef } from 'react';
import "./RunOverview.css";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import SideMenu from '../Menu/SideMenu';
import { useLocation, useHistory } from 'react-router-dom';
import ErrorIcon from '@mui/icons-material/Error';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DonutFindingsCategories from './charts/DonutFindingsCategories';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
} from 'chart.js';
import DonutSonarSeverity from './charts/DonutSonarSeverity';
import DonutSonarType from './charts/DonutSonarType';
import FilesFindingsGrouping from './charts/FilesFindingsGrouping';
import BarFindingsPerFile from './charts/BarFindingsPerFile';
import FindingsListSonar from './charts/FindingsListSonar';
import BarPylintRule from './charts/BarPylintRule';
import PieFindingsPerModule from './charts/PieFindingsPerModule';
import ExcludeFileDialog from './dialogs/ExcludeFileDialog';
import ExcludeCategoriesDialog from './dialogs/ExcludeCategoriesDialog';
import ExcludeModulesDialog from './dialogs/ExcludeModulesDialog';
import ChooseCompareRun from './dialogs/ChooseCompareRun';
import { FindingsContext } from '../../contexts/FindingsContext';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import PieFindingsPerModuleSonar from './charts/PieFindingsPerModuleSonar';
import ExcludeCategoriesDialogSonar from './dialogs/ExcludeCategoriesDialogSonar';
import ExcludeSeveritiesDialogSonar from './dialogs/ExcludeSeveritiesDialogSonar';
import exportAsImage from './exportAsImage';

var moment = require('moment'); // require
moment().format(); 

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

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


export default function RunOverview() {

    const {
        runId,
        setRunId,
        projectId,
        setProjectId,
        findings,
        setFindings,
        setFilteredFindings,
        sonarFindings,
        setSonarFindings,
        allSonarFindings,
        setAllSonarFindings,
        filteredFindings } = React.useContext(FindingsContext);

    const [value, setValue] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const ref = createRef(null);
    const refSonar = createRef(null);

    const { state } = useLocation();
    const history = useHistory();
    const [currentRun, setCurrentRun] = useState();
    const [openExcFile, setOpenExcFile] = React.useState(false);
    const [openExcCategory, setOpenExcCategory] = React.useState(false);
    const [openExcModule, setOpenExcModule] = React.useState(false);
    const [openCompRuns, setOpenCompRuns] = React.useState(false);
    const [openExcFileSonar, setOpenExcFileSonar] = React.useState(false);
    const [openExcCategorySonar, setOpenExcCategorySonar] = React.useState(false);
    const [openExcSeveritySonar, setOpenExcSeveritySonar] = React.useState(false);
    const [openExcModuleSonar, setOpenExcModuleSonar] = React.useState(false);
    const [excludedFile, setExcludedFile] = useState([]);
    const [excludedCategory, setExcludedCategory] = useState([]);
    const [excludedModule, setExcludedModule] = useState([]);
    const [excludedFileSonar, setExcludedFileSonar] = useState([]);
    const [excludedCategorySonar, setExcludedCategorySonar] = useState([]);
    const [excludedSeveritySonar, setExcludedSeveritySonar] = useState([]);
    const [excludedModuleSonar, setExcludedModuleSonar] = useState([]);
    const [files, setFiles] = useState([]);
    const [modules, setModules] = useState([]);
    const [filesSonar, setFilesSonar] = useState([]);
    const [modulesSonar, setModulesSonar] = useState([]);
    const [totalEffort, setTotalEffort] = useState(0);

    useEffect(async () => {
        setIsLoading(true);
        setRunId(state.run.id);
        setCurrentRun(state.run);
        setProjectId(state.run.projectId);

        const findings = await getPylintFindings(state.run.id);
        setFilteredFindings(findings);
        setFindings(findings);

        const sonarFindings = await getSonarFindings(state.run.id);
        setAllSonarFindings(sonarFindings);
        setSonarFindings(sonarFindings);

        calculateEffort(sonarFindings);

        const allFiles = findings.map(finding => finding.filename);
        setFiles([...new Set(allFiles)]);

        const sonarFiles = sonarFindings.map(finding => finding.filename);
        setFilesSonar([...new Set(sonarFiles)]);

        const allModules = findings.map(finding => {
            const regex = new RegExp('^.{1,}[.]{1}.*[.].*$');
            if (regex.test(finding.filename)) {
                return finding.filename.split(".")[1];
            }
            return "root module";
        });
        setModules([...new Set(allModules)]);

        const sonarModules = sonarFindings.map(finding => {
            if (/^.{1,}[:]{1}.*[/].*$/.test(finding.filename)) {
                return finding.filename.split(":")[1].split("/")[0];
            }
            return "root module";
        });
        setModulesSonar([...new Set(sonarModules)]);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        applyFilters();
    }, [excludedCategory, excludedFile, excludedModule, excludedCategorySonar]);

    useEffect(() => {
        applyFiltersSonar();
    }, [excludedSeveritySonar, excludedFileSonar, excludedModuleSonar]);

    const handleClickOpenFileExc = () => {
        setOpenExcFile(true);
    };
    const handleClickOpenCatExc = () => {
        setOpenExcCategory(true);
    };
    const handleClickOpenModExc = () => {
        setOpenExcModule(true);
    };
    const handleClickOpenCompRuns = () => {
        setOpenCompRuns(true);
    };

    const handleCancelCompRuns = () => {
        setOpenCompRuns(false);
    };

    const handleCancelFileExc = () => {
        setOpenExcFile(false);
    };
    const handleCancelModExc = () => {
        setOpenExcModule(false);
    };
    const handleCancelCatExc = () => {
        setOpenExcCategory(false);
    };

    const handleCloseExcFile = (selectedFiles) => {
        setOpenExcFile(false);
        setExcludedFile(selectedFiles);
    };

    const handleCloseExcCat = (selectedCategories) => {
        setOpenExcCategory(false);
        setExcludedCategory(selectedCategories);
    };

    const handleCloseExcModule = (selectedModules) => {
        setOpenExcModule(false);
        setExcludedModule(selectedModules);
    };

    const handleClickOpenFileExcSonar = () => {
        setOpenExcFileSonar(true);
    };
    const handleClickOpenCatExcSonar = () => {
        setOpenExcCategorySonar(true);
    };
    const handleClickOpenSevExcSonar = () => {
        setOpenExcSeveritySonar(true);
    };
    const handleClickOpenModExcSonar = () => {
        setOpenExcModuleSonar(true);
    };

    const handleCancelFileExcSonar = () => {
        setOpenExcFileSonar(false);
    };
    const handleCancelModExcSonar = () => {
        setOpenExcModuleSonar(false);
    };
    const handleCancelCatExcSonar = () => {
        setOpenExcCategorySonar(false);
    };
    const handleCancelSevExcSonar = () => {
        setOpenExcSeveritySonar(false);
    };

    const handleCloseExcFileSonar = (selectedFiles) => {
        setOpenExcFileSonar(false);
        setExcludedFileSonar(selectedFiles);
    };

    const handleCloseExcCatSonar = (selectedCategories) => {
        setOpenExcCategorySonar(false);
        setExcludedCategorySonar(selectedCategories);
    };

    const handleCloseExcSevSonar = (selectedCategories) => {
        setOpenExcSeveritySonar(false);
        setExcludedSeveritySonar(selectedCategories);
    };

    const handleCloseExcModuleSonar = (selectedModules) => {
        setOpenExcModuleSonar(false);
        setExcludedModuleSonar(selectedModules);
    };

    const applyFilters = () => {
        if (!findings) return;

        var filtered = [...findings];
        if (excludedModule.length !== 0) {
            filtered = filtered.filter(find => {
                return excludedModule.filter(item => {
                    const regex = new RegExp('^.{1,}[.]{1}.*[.].*$');
                    if (regex.test(find.filename)) {
                        return item === find.filename.split(".")[1];
                    }
                    return item === "root folder";
                }).length === 0;
            });
        }
        if (excludedCategory.length !== 0) {
            filtered = filtered.filter(find => {
                return excludedCategory.filter(item => {
                    return item === find.category;
                }).length === 0;
            });
        }
        if (excludedFile.length !== 0) {
            filtered = filtered.filter(find => {
                return excludedFile.filter(item => item === find.filename).length === 0;
            });
        }
        setFilteredFindings(filtered);
    }

    const applyFiltersSonar = () => {
        if (!allSonarFindings) return;

        var filtered = [...allSonarFindings];
        if (excludedModuleSonar.length !== 0) {
            filtered = filtered.filter(find => {
                return excludedModuleSonar.filter(item => {
                    if (/^.{1,}[:]{1}.*[/].*$/.test(find.filename)) {
                        return item === find.filename.split(":")[1].split("/")[0];
                    }
                    return item === "root module";
                }).length === 0;
            });
        }
        if (excludedCategorySonar.length !== 0) {
            filtered = filtered.filter(find => {
                return excludedCategorySonar.filter(item => {
                    var type;
                    switch (item) {
                        case 'Bug':
                            type = 'BUG';
                            break;
                        case 'Vulnerability':
                            type = 'VULNERABILITY';
                            break;
                        case 'Code Smell':
                            type = 'CODE_SMELL';
                            break;
                    }
                    return type === find.Type;
                }).length === 0;
            });
        }
        if (excludedSeveritySonar.length !== 0) {
            filtered = filtered.filter(find => {
                return excludedSeveritySonar.filter(item => {
                    return item.toUpperCase() === find.category;
                }).length === 0;
            });
        }
        if (excludedFileSonar.length !== 0) {
            filtered = filtered.filter(find => {
                return excludedFileSonar.filter(item => item === find.filename).length === 0;
            });
        }
        setSonarFindings(filtered);
    }

    const handleCloseCompRuns = (selectedRun) => {
        setOpenCompRuns(false);
        // navigate to compare runs page
        history.push('/compare-runs', {
            currentRun: currentRun,
            compareRun: selectedRun,
        });
    };

    const handleBack = () => {
        history.goBack();
    };

    const calculateEffort = (findings) => {
        var effort = 0;
        findings.forEach(finding => {
            var value = finding.effortToSolve.replace("min", "");
            effort += Number(value);
        });
        setTotalEffort(effort);
    }

    const formatDate = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleDateString() + " - " + date.toLocaleTimeString();
    };

    const formatTime = (totalMinutes) => {
        var duration = moment.duration(totalMinutes, 'minutes');
        var result = "";
        if(duration.days())
            result += duration.days() + "days ";
        if(duration.hours())
            result += duration.hours() + "h ";
        if(duration.minutes())
            result += duration.minutes() + "min ";
        return result;
    };

    const renderPageContent = !filteredFindings || !sonarFindings ? null : (
        <div>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <button
                    type="submit"
                    className="btn btn-success btn-block submitBtn"
                    onClick={handleBack}>
                    <ArrowBackIcon />
                </button>
                <button
                    type="submit"
                    className="btn btn-success btn-block submitBtn"
                    onClick={handleClickOpenCompRuns}>
                    Compare with another run
                </button>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
                    <Tab label="Pylint Analysis" {...a11yProps(0)} />
                    <Tab label="SonarQube Analysis" {...a11yProps(1)} disabled={allSonarFindings.length === 0} />
                </Tabs>
            </Box>

            <ChooseCompareRun
                open={openCompRuns}
                onCancel={handleCancelCompRuns}
                onClose={handleCloseCompRuns}
            />

            <TabPanel value={value} index={0}>
                <div className='top-buttons'>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={handleClickOpenFileExc}>
                        Exclude Files
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={handleClickOpenModExc}>
                        Exclude Modules
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={handleClickOpenCatExc}>
                        Exclude Types of Issues
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={() => exportAsImage(ref.current, "Pylint Result - Run " + formatDate(currentRun.dateTime))}>
                        Export Graphics
                    </button>
                </div>

                <ExcludeFileDialog
                    open={openExcFile}
                    onCancel={handleCancelFileExc}
                    onClose={handleCloseExcFile}
                    files={files}
                />

                <ExcludeModulesDialog
                    open={openExcModule}
                    onCancel={handleCancelModExc}
                    onClose={handleCloseExcModule}
                    modules={modules}
                />

                <ExcludeCategoriesDialog
                    open={openExcCategory}
                    onCancel={handleCancelCatExc}
                    onClose={handleCloseExcCat}
                />

                <div ref={ref}>
                    <div className='general-info header-info'>
                        <p><ErrorIcon /> <b>Number of Issues:</b> {filteredFindings.length}</p>
                    </div>

                    <div className='overview-content'>
                        <div className='chart'>
                            <h6>Category Classification</h6>
                            <DonutFindingsCategories className='donut' filteredFindings={filteredFindings} />
                        </div>
                        <div className='chart'>
                            <h6>Module Classification</h6>
                            <PieFindingsPerModule className='donut' filteredFindings={filteredFindings} projectId={projectId} />
                        </div>
                    </div>

                    <div className='overview-content'>
                        <div className='column'>
                            <h6>Issues division per files</h6>
                            <BarFindingsPerFile filteredFindings={filteredFindings} />
                        </div>
                    </div>
                    <div className='overview-content'>
                        <div className='column'>
                            <h6>Violated Rules</h6>
                            <BarPylintRule filteredFindings={filteredFindings} />
                        </div>
                    </div>
                </div>

                <div>
                    <FilesFindingsGrouping filteredFindings={filteredFindings} projectId={projectId} />
                </div>
            </TabPanel>

            <TabPanel value={value} index={1}>
                <div className='top-buttons'>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={handleClickOpenFileExcSonar}>
                        Exclude Files
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={handleClickOpenModExcSonar}>
                        Exclude Modules
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={handleClickOpenCatExcSonar}>
                        Exclude Types of Issues
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={handleClickOpenSevExcSonar}>
                        Exclude Severities
                    </button>
                    <button
                        type="submit"
                        className="btn btn-success btn-block submitBtn"
                        onClick={() => exportAsImage(refSonar.current, "SonarQube Result - Run " + formatDate(currentRun.dateTime))}>
                        Export Graphics
                    </button>
                </div>

                <ExcludeFileDialog
                    open={openExcFileSonar}
                    onCancel={handleCancelFileExcSonar}
                    onClose={handleCloseExcFileSonar}
                    files={filesSonar}
                />

                <ExcludeModulesDialog
                    open={openExcModuleSonar}
                    onCancel={handleCancelModExcSonar}
                    onClose={handleCloseExcModuleSonar}
                    modules={modulesSonar}
                />

                <ExcludeCategoriesDialogSonar
                    open={openExcCategorySonar}
                    onCancel={handleCancelCatExcSonar}
                    onClose={handleCloseExcCatSonar}
                />

                <ExcludeSeveritiesDialogSonar
                    open={openExcSeveritySonar}
                    onCancel={handleCancelSevExcSonar}
                    onClose={handleCloseExcSevSonar}
                />

                <div ref={refSonar}>
                    <div className='general-info-sonar'>
                        <div className='left header-info'>
                            <p><ErrorIcon /> <b>Number of Issues:</b> {sonarFindings.length} </p>
                        </div>
                        <div className='right header-info'>
                            <p><AccessTimeFilledIcon /> <b>Effort to solve:</b> {formatTime(totalEffort)}</p>
                        </div>
                    </div>

                    <div className='overview-content'>
                        <div className='chart'>
                            <h6>Severity Classification</h6>
                            <DonutSonarSeverity className='donut' sonarFindings={sonarFindings} />
                        </div>
                        <div className='chart'>
                            <h6>Type Classification</h6>
                            <DonutSonarType className='donut' sonarFindings={sonarFindings} />
                        </div>
                    </div>

                    <div className='overview-content'>
                        <div className='chart'>
                            <h6>Module Classification</h6>
                            <PieFindingsPerModuleSonar className='donut' filteredFindings={sonarFindings} projectId={projectId} />
                        </div>
                    </div>

                    <div className='overview-content'>
                        <div className='column'>
                            <h6>Issues division per files</h6>
                            <BarFindingsPerFile filteredFindings={sonarFindings} />
                        </div>
                    </div>

                    <div className='overview-content'>
                        <div className='column'>
                            <h6>Violated Rules</h6>
                            <BarPylintRule filteredFindings={sonarFindings} />
                        </div>
                    </div>
                </div>

                <div>
                    <FindingsListSonar filteredFindings={sonarFindings} projectId={projectId} />
                </div>
            </TabPanel>
        </div>
    );

    return (
        <div className='content'>
            <SideMenu />
            <div className='page-content'>
                <div className='run-overview'>
                    <div className="wrapper-overview">
                        <div className="overview-page">
                            {isLoading ? <LoadingSpinner /> : renderPageContent}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
