import React from "react";
import { createContext, useState } from "react";

export const FindingsContext = createContext();

const FindingsContextProvider = (props) => {
    const [projectData, setProjectData] = useState();
    const [projectId, setProjectId] = useState();
    const [runId, setRunId] = useState();
    const [filteredFindings, setFilteredFindings] = useState();
    const [sonarFindings, setSonarFindings] = useState();
    const [allSonarFindings, setAllSonarFindings] = useState();
    const [findings, setFindings] = useState();

    return (
        <FindingsContext.Provider
          value={{
            projectId,
            setProjectId,
            projectData,
            setProjectData,
            runId,
            setRunId,
            findings,
            setFindings,
            sonarFindings,
            setSonarFindings,
            allSonarFindings,
            setAllSonarFindings,
            filteredFindings,
            setFilteredFindings
          }}
        >
          {props.children}
        </FindingsContext.Provider>
      );
};

export default FindingsContextProvider;