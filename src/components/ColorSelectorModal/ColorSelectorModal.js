import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CheckIcon from '@material-ui/icons/Check';
import {createStyles, withStyles} from '@material-ui/core/styles';

const styles = createStyles({
    root: {
        padding: 0
    },

    dialogPaper: {

        height : '396px'
    },

    title: {
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    link: {
        fontSize: '14px'
    },

    colorList: {
        padding: 0
    },

    colorListItem: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        height: '35px',
        justifyContent: 'flex-end',
        width: '100%'
    },

    selectedColor: {
        marginRight: '5px'
    }
});

class ColorSelectorModal extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false,
            colors: [],
            selectedColor: this.props.colorCode,
            selectedTextColor: '#FFFFFF'
        };

        fetch('/data/colors.json')
            .then(response => response.json())
            .then(data => {
                this.state.colors = data;

                const selectedColorIndex = this.state.colors.findIndex(color => {
                    return color.colorCode === this.props.colorCode;
                })

                let textColorCode = '#FFFFFF';

                if (selectedColorIndex > -1) {
                    this.state.colors[selectedColorIndex].selected = true;
                    textColorCode = this.state.colors[selectedColorIndex].textColorCode;
                }

                this.state.selectedTextColor = textColorCode;
            })
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleSave = () => {
        this.props.onSave({ colorCode: this.state.selectedColor, textColorCode: this.state.selectedTextColor });
        this.setState({ open: false });
    };

    handleSelectColor = (event) => {
        const colors = this.state.colors;
        const selectedColor = event.target.dataset.colorCode;

        const selectedColorIndex = this.state.colors.findIndex(color => {
            return color.colorCode === selectedColor;
        })

        colors.forEach(color => {
            color.selected = false;
        })

        colors[selectedColorIndex].selected = true

        this.setState({ colors, selectedColor, selectedTextColor: colors[selectedColorIndex].textColorCode });
    };

    render() {
        const { classes, linkLabel } = this.props;
        const { open, colors, selectedColor } = this.state;

        return (
            <div>
                <Button
                    onClick={this.handleOpen}
                    className={classes.link}
                    variant='outlined'
                    color='default'
                    size='medium'
                >
                    { linkLabel }
                </Button>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    maxWidth={'xs'}
                    fullWidth={true}
                    disableBackdropClick={false}
                    classes={{ paper: classes.dialogPaper }}
                >
                    <DialogTitle className={classes.title}>Select Color</DialogTitle>

                    <DialogContent className={classes.content + ' ' + classes.colorList}>
                        {
                            colors.map((color, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={classes.colorListItem}
                                        style={{backgroundColor: color.colorCode}}
                                        data-color-code={color.colorCode}
                                        data-text-color-code={color.textColorCode}
                                        onClick={this.handleSelectColor}
                                    >
                                        {
                                            color.colorCode === selectedColor &&
                                            <CheckIcon color='primary' className={classes.selectedColor} />
                                        }
                                    </div>
                                )
                            })
                        }
                    </DialogContent>

                    <DialogActions className={classes.content}>
                        <Button onClick={this.handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    };
}

export default withStyles(styles)(ColorSelectorModal);
