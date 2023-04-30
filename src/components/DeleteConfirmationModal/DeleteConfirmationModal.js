import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import {MuiThemeProvider} from '@material-ui/core';

import SharedService from '../../services/sharedService';

const styles = makeStyles({
    root: {
        padding: 0
    },

    title: {
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    modalAction: {
        color: 'black'
    }
});

const DeleteConfirmationModal = (props) => {
    const classes = styles(props);
    const [ open, setOpen ] = useState(false);
    const theme = SharedService.buildThemeConfig(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false);
        }
    };

    const handleDelete = (event) => {
        props.onDelete(event);
    };

    return (
        <div>
            <Button variant='outlined' color='default' size='small' onClick={handleOpen}>
                Delete Recipe
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xs'}
                fullWidth={true}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle className={classes.title}>Delete</DialogTitle>

                <DialogContent className={classes.content}>
                    <MuiThemeProvider theme={theme}>
                        <ErrorOutlineOutlinedIcon color='primary' />
                    </MuiThemeProvider>

                    <p>
                        Are you sure you want to delete this recipe?
                    </p>
                </DialogContent>

                <DialogActions className={classes.content}>
                    <Button onClick={handleDelete} className={classes.modalAction} variant='outlined' size={'small'}>Yes</Button>
                    <Button onClick={handleClose} className={classes.modalAction} variant='outlined' size={'small'}>No</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default DeleteConfirmationModal;
