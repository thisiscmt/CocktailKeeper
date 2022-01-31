import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';

const colorLibrary = require('../../data/colors.json');

const styles = makeStyles({
    root: {
        padding: 0
    },

    dialogPaper: {
        height : '426px'
    },

    title: {
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    colorList: {
        padding: 0
    },

    colorListItem: {
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        height: '45px',
        justifyContent: 'flex-end',
        width: '100%'
    },

    selectedColor: {
        marginRight: '5px'
    },

    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    defaultButtonColor: {
        color: 'black'
    }
});

const ColorSelectorModal = (props) => {
    const classes = styles(props);

    const [ open, setOpen ] = useState(false);
    const [ selectedColor, setSelectedColor ] = useState(props.colorCode);
    const [ selectedTextColor, setSelectedTextColor ] = useState(props.colorCode === '#FFFFFF' ? '#000000' : '#FFFFFF');
    const selectedColorElement = useRef();

    const handleOpen = () => {
        setOpen(true);

        setTimeout(() => {
            scrollToSelectedColor();
        });
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false);
        }
    };

    const handleSelectColor = (event) => {
        const selectedColor = event.target.dataset.colorCode;

        const selectedColorIndex = colorLibrary.colors.findIndex(color => {
            return color.colorCode === selectedColor;
        });

        setSelectedColor(selectedColor);
        setSelectedTextColor(colorLibrary.colors[selectedColorIndex].textColorCode);
    };

    const handleSave = () => {
        props.onSave({ colorCode: selectedColor, textColorCode: selectedTextColor });
        setOpen(false);
    };

    const scrollToSelectedColor = () => {
        if (selectedColorElement && selectedColorElement.current) {
            selectedColorElement.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    };

    return (
        <div>
            <Button
                onClick={handleOpen}
                variant='outlined'
                color='default'
                size='small'
            >
                CHANGE BACKGROUND COLOR
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth={'xs'}
                fullWidth={true}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle className={classes.title}>Select Color</DialogTitle>

                <DialogContent className={classes.content + ' ' + classes.colorList}>
                    {
                        colorLibrary.colors.map((color, index) => {
                            return (
                                <div
                                    key={index}
                                    className={classes.colorListItem}
                                    style={{backgroundColor: color.colorCode}}
                                    data-color-code={color.colorCode}
                                    data-text-color-code={color.textColorCode}
                                    onClick={handleSelectColor}
                                    ref={color.colorCode === selectedColor ? selectedColorElement : null}
                                >
                                    {
                                        color.colorCode === selectedColor &&
                                        <CheckCircleOutlineOutlinedIcon style={{ color: selectedTextColor }} className={classes.selectedColor} />
                                    }
                                </div>
                            )
                        })
                    }
                </DialogContent>

                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleSave} className={classes.defaultButtonColor} variant='outlined' size='small'>
                        Save
                    </Button>
                    <Button onClick={handleClose} className={classes.defaultButtonColor} variant='outlined' color='default' size='small'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ColorSelectorModal;
