import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextareaAutosize } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';
import { FindingsContext } from '../../../contexts/FindingsContext';
import "./EditProjectDialog.css";

async function updateProjectData(projectId, data) {
    return fetch('http://localhost:4000/project/' + projectId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((res) => res.json())
        .then(data => {
            return data;
        });
}


export default function EditProjectDialog({ onClose, onCancel, open, project }) {

    const [name, setName] = useState();
    const [path, setPath] = useState();

    useEffect(() => {
        if(!project) {
            return;
        }
        setName(project.name);
        setPath(project.localpath);
    }, [project]);

    const handleClose = () => {
        onClose();
    };

    const handleCancel = () => {
        onCancel();
    };

    const handleUpdateProject = async () => {
        var newData = {
            name: name,
            localpath: path
        };
        const updateData = await updateProjectData(project.id, newData);
        onClose(updateData);
    };

    return (
        <Dialog onClose={handleClose} open={open} className='dialog'>
            <DialogTitle></DialogTitle>
            <form className="edit-form">
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={e => setName(e.target.value)}
                        defaultValue={name}
                        required />
                </div>
                <div className="form-group">
                    <label>Local Path</label>
                    <TextareaAutosize
                        className='form-control'
                        defaultValue={path}
                        onChange={e => setPath(e.target.value)}
                        minRows={2}
                        maxRows={5} />
                </div>
            </form>
            <DialogActions>
                <button type="submit" className="btn btn-primary btn-block submitBtn" onClick={handleUpdateProject}>Update</button>
                <button type="reset" className="btn btn-secondary btn-block submitBtn" onClick={handleCancel}>Cancel</button>
            </DialogActions>
        </Dialog>
    );
}

EditProjectDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
};