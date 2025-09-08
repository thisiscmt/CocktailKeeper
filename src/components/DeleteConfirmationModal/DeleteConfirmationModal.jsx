import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, ThemeProvider } from '@mui/material';
import { ErrorOutlineOutlined } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';

import * as ThemeService from '../../services/themeService';

const useStyles = makeStyles()(() => ({
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
}));

const DeleteConfirmationModal = (props) => {
    const { classes, cx } = useStyles(props);
    const theme = ThemeService.buildThemeConfig();
    const [ open, setOpen ] = useState(false);

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
        <ThemeProvider theme={theme}>
            <Button
                onClick={handleOpen}
                variant='outlined'
                size='small'
                sx={{
                    color: props.textColor,
                    borderColor: `${props.textColor}7F`,

                    '&:hover': {
                        borderColor: props.textColor
                    }
                }}
            >
                Delete Recipe
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='xs'
                fullWidth={true}
                classes={{ paper: cx(classes.dialogPaper) }}
            >
                <DialogTitle className={cx(classes.title)}>Delete</DialogTitle>

                <DialogContent className={cx(classes.content)}>
                    <ThemeProvider theme={theme}>
                        <ErrorOutlineOutlined color='primary' />
                    </ThemeProvider>

                    <p>
                        Are you sure you want to delete this recipe?
                    </p>
                </DialogContent>

                <DialogActions className={cx(classes.content)}>
                    <Button onClick={handleDelete} className={cx(classes.modalAction)} variant='outlined' size='small'>Yes</Button>
                    <Button onClick={() => handleClose({}, 'cancel')} className={cx(classes.modalAction)} variant='outlined' color='secondary' size='small'>No</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
}

export default DeleteConfirmationModal;
