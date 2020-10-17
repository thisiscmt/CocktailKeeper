import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import {createStyles, withStyles} from '@material-ui/core/styles';
import {MuiThemeProvider} from '@material-ui/core';

import SharedService from '../../services/SharedService';

const styles = createStyles({
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

class DeleteConfirmationModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleDelete = (event) => {
        this.props.onDelete(event);
    };

    render() {
        const { classes } = this.props;
        const { open } = this.state;
        const theme = SharedService.buildThemeConfig(null);

        return (
            <div>
                <Button variant='outlined' color='default' size='small' onClick={this.handleOpen}>
                    Delete Recipe
                </Button>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    maxWidth={'xs'}
                    fullWidth={true}
                    disableBackdropClick={false}
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
                        <Button onClick={this.handleDelete} className={classes.modalAction} variant='outlined' size={'small'}>Yes</Button>
                        <Button onClick={this.handleClose} className={classes.modalAction} variant='outlined' size={'small'}>No</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
}

export default withStyles(styles)(DeleteConfirmationModal);
