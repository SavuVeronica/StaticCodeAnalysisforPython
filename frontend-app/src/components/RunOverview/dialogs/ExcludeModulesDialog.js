import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';

export default function ExcludeModulesDialog({modules, onClose, onCancel, open}) {
    const [prevChecked, setPrevChecked] = useState([]);
    const [hasChanges, setHasChanges] = useState(false);
    const [modulesList, setModulesList] = useState([]);
    const [checked, setChecked] = React.useState([]);

    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
      setHasChanges(true);
    };

    useEffect(() => {
        setModulesList(modules);

        if(open) {
          setPrevChecked([...checked]);
          setHasChanges(false);
        } 
    }, [open]);

    const handleClose = () => {
      onClose(checked);
    };

    const handleCancel = () => {
      if(hasChanges) {
        setChecked(prevChecked);
      }
      onCancel();
    };

    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Choose modules to exclude</DialogTitle>
        <List sx={{ pt: 0 }}>
          { modulesList.map((module) => {
            const labelId = `checkbox-list-label-${module}`;
            return (
            <ListItem key={labelId}>
              <ListItemButton role={undefined} onClick={handleToggle(module)} dense>
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.indexOf(module) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={module} />
            </ListItemButton>
            </ListItem>
            )}
        )}
        </List>
        <DialogActions>
            <Button onClick={handleClose}>Apply</Button>
            <Button onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    );
  }
  