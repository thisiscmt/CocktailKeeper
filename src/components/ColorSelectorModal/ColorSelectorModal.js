import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import {createStyles, withStyles} from '@material-ui/core/styles';

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

    link: {
        fontSize: '14px'
    },

    colorList: {
        marginBottom: '10px',
        padding: 0,
    },

    colorListItem: {
        cursor: 'pointer',
        height: '35px',
        textAlign: 'right',
        width: '100%'
    },

    selectedColor: {
        textAlign: 'right'
    }
});

class ColorSelectorModal extends React.Component {
    constructor (props) {
        super(props);

        this.colors = [
            { colorCode: '#BC4044', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#DC8162', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#C9624B', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#B0523F', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#A9652E', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#794422', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#6C2618', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#8C351F', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#A3491F', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#A9652E', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#C8713A', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#D6AD47', textColorCode: '#000000', selected: false },
            { colorCode: '#E5D865', textColorCode: '#000000', selected: false },
            { colorCode: '#F4EE9C', textColorCode: '#000000', selected: false },
            { colorCode: '#E6D084', textColorCode: '#000000', selected: false },
            { colorCode: '#B8A261', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#A69F58', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#72814B', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#859558', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#91A173', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#8E9576', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#4E564E', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#293227', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#2E2E2D', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#475F61', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#507B7F', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#618178', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#869884', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#ADC4BD', textColorCode: '#000000', selected: false },
            { colorCode: '#B8B295', textColorCode: '#000000', selected: false },
            { colorCode: '#E4DDCD', textColorCode: '#000000', selected: false },
            { colorCode: '#FFFFFF', textColorCode: '#000000', selected: false },
            { colorCode: '#B8A398', textColorCode: '#000000', selected: false },
            { colorCode: '#9F576B', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#504655', textColorCode: '#FFFFFF', selected: false },
            { colorCode: '#4E2636', textColorCode: '#FFFFFF', selected: false }
        ];

        const selectedColorIndex = this.colors.findIndex(color => {
            return color.colorCode === this.props.colorCode;
        })

        let textColorCode = '#FFFFFF';

        if (selectedColorIndex > -1) {
            this.colors[selectedColorIndex].selected = true;
            textColorCode = this.colors[selectedColorIndex].textColorCode;
        }

        this.state = {
            open: false,
            colors: this.colors,
            selectedColor: this.props.colorCode,
            selectedTextColor: textColorCode
        };
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
                                            <AddCircleOutlineRoundedIcon color='primary' className={classes.selectedColor} />
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
