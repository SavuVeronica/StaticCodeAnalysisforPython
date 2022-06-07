import React, {useEffect, useState} from 'react';
import { UserContext } from '../../contexts/UserContext';
import CreateProject from '../CreateProject/CreateProject';
import SideMenu from '../Menu/SideMenu';
import NewRun from '../NewRun/NewRun';
import Preferences from '../Preferences/Preferences';
import ViewProjects from '../ViewProjects/ViewProjects';
import ViewRuns from '../ViewRuns/ViewRuns';
import "./Dashboard.css";

export default function Dashboard() {
  const { userId } = React.useContext(UserContext);

  const [currentPage, setCurrentPage] = useState();

  const getCurrentPage = async () => {
    return currentPage;
  }

  useEffect(() => {
    setCurrentPage('home');
  }, []);

  const getCurrentPageComponent = () => {
    switch (currentPage) {
        case 'home':
            return <ViewRuns userId={userId.userId}/>
        case 'create-project':
            return <CreateProject userId={userId.userId}/>
        case 'view-projects':
            return <ViewProjects userId={userId.userId}/>
        case 'new-run':
            return <NewRun userId={userId.userId}/>
        case 'profile':
            return <Preferences userId={userId.userId}/>
        default:
            return <ViewRuns userId={userId.userId}/>
    }
}

  return(
    <div className='content'>
      {/* <SideMenu/> */}
      <div className='page-content'>
        {/* {getCurrentPageComponent()} */}
        <ViewRuns userId={userId.userId}/>
      </div>
    </div>
  );
}