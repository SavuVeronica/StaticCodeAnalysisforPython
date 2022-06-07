import React, { useState } from 'react';
import "./CreateProject.css";
import { useHistory } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import SideMenu from '../Menu/SideMenu';
import { UserContext } from '../../contexts/UserContext';

async function createProject(data) {
    return fetch('http://localhost:4000/project/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then(data => {
            return data;
        });
}

export default function CreateProject() {

    const { userId } = React.useContext(UserContext);
    const history = useHistory();

    const [name, setName] = useState();
    const [path, setPath] = useState();
    const [errors, setErrors] = useState("");

    const handleNewProject = async e => {
        e.preventDefault();

        // const regex = new RegExp("^.{1,}:\\.*\\*$");

        if(!/^.{1,}:\\.*\\*$/.test(path)) {
            setErrors("Path to project is not a valid path.");
            return;
        }

        setErrors("");

        const newProject = await createProject({
            userId: userId,
            name: name,
            localpath: path
        });

        if (!newProject) {
            NotificationManager.error('Errors occured. Project could not be created.', 'Error', 1000);
        } else {
            e.target.reset();
            history.push('/view-projects');
        }
    };

    const handleCancel = () => {
        history.push('/dashboard');
    };

    return (
        <div className='content'>
            <SideMenu />
            <div className='page-content'>
                <div className='create-project'>
                    <div className="wrapper">
                        <div className="form">
                            <form onSubmit={handleNewProject} className="project-form">
                                <div className="form-fields">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Please enter a name to identify the project"
                                            onChange={e => setName(e.target.value)}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <label>Local Path</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Please use the absolute path to the local project"
                                            onChange={e => setPath(e.target.value)}
                                            required />
                                    </div>
                                    {errors.length > 0 && 
                                    <span className='error'>{errors}</span>}
                                </div>
                                <div className='form-buttons'>
                                    <button type="submit" className="btn btn-primary btn-block submitBtn">Create</button>
                                    <button type="reset" className="btn btn-secondary btn-block submitBtn" onClick={handleCancel}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <NotificationContainer />
                </div>
            </div>
        </div>
    );
}

// CreateProject.propTypes = {
//     userId: PropTypes.number.isRequired
// };