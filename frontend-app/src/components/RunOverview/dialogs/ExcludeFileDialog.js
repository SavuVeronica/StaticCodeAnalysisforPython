import React, { useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Button } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { DialogActions } from '@mui/material';

export default function ExcludeFileDialog({ files, onClose, onCancel, open }) {
  const [prevChecked, setPrevChecked] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [fileNames, setFileNames] = useState([]);
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
    setFileNames(files);

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
      <DialogTitle>Choose files to exclude</DialogTitle>
      <List sx={{ pt: 0 }}>
        {fileNames.map((filename) => {
          const labelId = `checkbox-list-label-${filename}`;
          return (
            <ListItem key={labelId}>
              <ListItemButton role={undefined} onClick={handleToggle(filename)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(filename) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={filename} />
              </ListItemButton>
            </ListItem>
          )
        }
        )}
      </List>
      <DialogActions>
        <Button onClick={handleClose}>Apply</Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
