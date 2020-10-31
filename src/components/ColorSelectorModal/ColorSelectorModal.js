import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
    root: {
        padding: 0
    },

    dialogPaper: {
        height : '390px'
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
        height: '35px',
        justifyContent: 'flex-end',
        width: '100%'
    },

    selectedColor: {
        marginRight: '5px'
    },

    saveData: {
        color: 'black'
    }
});

const ColorSelectorModal = (props) => {
    const classes = styles(props);
    const selectedColorElement = useRef();

    const [ open, setOpen ] = useState(false);
    const [ colors, setColors ] = useState([]);
    const [ selectedColor, setSelectedColor ] = useState(props.colorCode);
    const [ selectedTextColor, setSelectedTextColor ] = useState('#FFFFFF');

    const handleOpen = () => {
        setOpen(true);

        setTimeout(() => {
            scrollToSelectedColor();
        })
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSelectColor = (event) => {
        const selectedColor = event.target.dataset.colorCode;

        const selectedColorIndex = colors.findIndex(color => {
            return color.colorCode === selectedColor;
        })

        colors.forEach(color => {
            color.selected = false;
        })

        colors[selectedColorIndex].selected = true
        setColors(colors);
        setSelectedColor(selectedColor);
        setSelectedTextColor(colors[selectedColorIndex].textColorCode);
    };

    const handleSave = () => {
        props.onSave({ colorCode: selectedColor, textColorCode: selectedTextColor });
        setOpen(false);
    };

    const scrollToSelectedColor = () => {
        if (selectedColorElement && selectedColorElement.current) {
            selectedColorElement.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
    }

    // This check for an empty color list prevents an endless series of fetches of the colors data file
    if (colors.length === 0) {
        fetch('/data/colors.json')
            .then(response => response.json())
            .then(data => {
                const selectedColorIndex = data.findIndex(color => {
                    return color.colorCode === props.colorCode;
                })

                let textColorCode = '#FFFFFF';

                if (selectedColorIndex > -1) {
                    data[selectedColorIndex].selected = true;
                    textColorCode = data[selectedColorIndex].textColorCode;
                }

                setColors(data);
                setSelectedTextColor(textColorCode);
            });
    }

    return (
        <div>
            <Button
                onClick={handleOpen}
                className={classes.link}
                variant='outlined'
                color='default'
                size='small'
            >
                { props.linkLabel }
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
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

                <DialogActions className={classes.content}>
                    <Button onClick={handleSave} className={classes.saveData} variant='outlined' size={'small'}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ColorSelectorModal;
