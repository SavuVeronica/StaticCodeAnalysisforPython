import React, { useEffect, useState } from 'react';
//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
} from "react-pro-sidebar";
//import icons from react icons
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome } from "react-icons/fi";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";

//import sidebar css from react-pro-sidebar module and our custom css 
import "react-pro-sidebar/dist/css/styles.css";
import "./SideMenu.css";
import { SideMenuContext } from '../../contexts/SideMenuContext';
import { Link } from 'react-router-dom';

export default function SideMenu() {

  // const { currentPage, setCurrentPage, getCurrentPage } = React.useContext(SideMenuContext);

  // const [home, setHome] = useState(true);
  // const [createProject, setCreateProject] = useState(false);
  // const [viewProjects, setViewProjects] = useState(false);
  // const [newRun, setNewRun] = useState(false);
  // const [profile, setProfile] = useState(false);

  // const setClickPage = async (pageName) => {
  //   setCurrentPage(pageName);

  //   setHome(false);
  //   setCreateProject(false);
  //   setViewProjects(false);
  //   setNewRun(false);
  //   setProfile(false);
  //   switch (pageName) {
  //     case "home":
  //       setHome(true);
  //       break;
  //     case "create-project":
  //       setCreateProject(true);
  //       break;
  //     case "view-projects":
  //       setViewProjects(true);
  //       break;
  //     case "new-run":
  //       setNewRun(true);
  //       break;
  //     case "profile":
  //       setProfile(true);
  //   }
  // }

  // useEffect(() => {
  //   setHome(true);

  // }, [currentPage]);

  return (
    <div id="header">
      <ProSidebar>
        <SidebarContent>
          <Menu iconShape="square">
            <MenuItem
              icon={<FiHome />}
              >
              <Link to="/dashboard">
                Home
              </Link>
            </MenuItem>
            <MenuItem
              icon={<RiAddLine />}
              >
              <Link to="/create-project">
                Create Project
              </Link>
            </MenuItem>
            <MenuItem
              icon={<FaList />}
              >
              <Link to="/view-projects">
                View Projects
              </Link>
            </MenuItem>
            <MenuItem
              icon={<RiPencilLine />}
              >
              <Link to="/new-run">
                New Run
              </Link>
            </MenuItem>
            <MenuItem
              icon={<BiCog />}
              >
              <Link to="/preferences">
                Profile Settings
              </Link>
            </MenuItem>
          </Menu>
        </SidebarContent>
      </ProSidebar>
    </div>
  );
}