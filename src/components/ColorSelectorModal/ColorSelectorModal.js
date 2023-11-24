import React, {useRef, useState} from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';

const colorLibrary = require('../../data/colors.json');

const useStyles = makeStyles()(() => ({
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
}));

const ColorSelectorModal = (props) => {
    const { classes, cx } = useStyles(props);
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
                color='secondary'
                size='small'
            >
                CHANGE BACKGROUND COLOR
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='xs'
                fullWidth={true}
                classes={{ paper: cx(classes.dialogPaper) }}
            >
                <DialogTitle className={cx(classes.title)}>Select Color</DialogTitle>

                <DialogContent className={`${cx(classes.content)} ${cx(classes.colorList)}`}>
                    {
                        colorLibrary.colors.map((color, index) => {
                            return (
                                <div
                                    key={index}
                                    className={cx(classes.colorListItem)}
                                    style={{backgroundColor: color.colorCode}}
                                    data-color-code={color.colorCode}
                                    data-text-color-code={color.textColorCode}
                                    onClick={handleSelectColor}
                                    ref={color.colorCode === selectedColor ? selectedColorElement : null}
                                >
                                    {
                                        color.colorCode === selectedColor &&
                                        <CheckCircleOutlineOutlined style={{ color: selectedTextColor }} className={cx(classes.selectedColor)} />
                                    }
                                </div>
                            )
                        })
                    }
                </DialogContent>

                <DialogActions className={cx(classes.dialogActions)}>
                    <Button onClick={handleSave} className={cx(classes.defaultButtonColor)} variant='outlined' size='small'>
                        Save
                    </Button>
                    <Button onClick={() => handleClose({}, 'cancel')} className={cx(classes.defaultButtonColor)} variant='outlined' color='secondary' size='small'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ColorSelectorModal;
