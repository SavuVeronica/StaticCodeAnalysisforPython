import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import "./ViewProjects.css";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SideMenu from '../Menu/SideMenu';
import { UserContext } from '../../contexts/UserContext';
import EditProjectDialog from './dialogs/EditProjectDialog';
import EditIcon from '@mui/icons-material/Edit';

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

async function deleteProjectAPICall(projectId) {
  return fetch('http://localhost:4000/project/' + projectId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((res) => res.json())
    .then(data => {
      return data;
    });
}

export default function ViewProjects() {
  const { userId } = React.useContext(UserContext);

  // data definition
  const [data, setData] = useState([]);
  const [openUpdateProj, setOpenUpdateProj] = React.useState(false);
  const [selectedProject, setSelectedProject] = useState();

  useEffect(() => {
    getProjects(userId).then(result => {
      setData(result);
    });
  }, [userId]);

  const deleteProject = async (project) => {
    const projectDeleted = await deleteProjectAPICall(project.id);
    if (projectDeleted === undefined) {
      NotificationManager.error('Errors occured. Project could not be deleted.', 'Error', 1000);
    } else {
      NotificationManager.success('Project is deleted!', 'Success', 1000);
      setData(data.filter(r => r.id !== project.id));
    }
  };

  const handleClickOpenEditProject = (value) => {
    setSelectedProject(value);
    setOpenUpdateProj(true);
  };

  const handleCancelEditProject = () => {
    setOpenUpdateProj(false);
  };

  const handleCloseEditProject = (updatedProject) => {
    setOpenUpdateProj(false);
    const entries = data;
    // update project data in data
    setData(entries.map(proj => {
      if(proj.id === selectedProject.id) {
        return {
          id: proj.id,
          userId: proj.userId,
          name: updatedProject.name,
          localpath: updatedProject.localpath
        }
      }
      return proj;
    }));
  };

  return !data ? null : (
    <div className='content'>
      <SideMenu />
      <div className='page-content'>
        <div className='create-project'>
          <div className="wrapper">
            <div className="form">

              <EditProjectDialog
                open={openUpdateProj}
                onCancel={handleCancelEditProject}
                onClose={handleCloseEditProject}
                project={selectedProject}
              />

              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right"><b>Name</b></TableCell>
                      <TableCell align="right"><b>Local file path</b></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((project, idx) =>
                      <TableRow
                        key={project.id}
                      >
                        <TableCell align="right">{project.name}</TableCell>
                        <TableCell align="right">{project.localpath}</TableCell>
                        <TableCell align="right">
                          <div >
                            <IconButton aria-label="delete" size="large" onClick={() => { deleteProject(project); }}>
                              <DeleteIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                        <TableCell align="right">
                          <div >
                            <IconButton aria-label="edit" size="large" onClick={() => { handleClickOpenEditProject(project); }}>
                              <EditIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div >
          <NotificationContainer />
        </div>
      </div>
    </div>
  );
}
