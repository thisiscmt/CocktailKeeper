import React, { useRef, useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const imageLibrary = require('../../data/images.json');

const useStyles = makeStyles({
    root: {
        padding: 0
    },

    title: {
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    imageList: {
        display: 'flex',
        overflow: 'auto',
        paddingBottom: '5px'
    },

    imageListItem: {
        cursor: 'pointer',
        height: 'fit-content',
        fontSize: '12px',
        flexDirection: 'column',
        marginRight: '8px',
        padding: '8px'
    },

    selectedImage: {
        border: '1px solid Gray',
        borderRadius: '5px'
    },

    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    defaultButtonColor: {
        color: 'black'
    }
});

const ImageSelectorModal = (props) => {
    const classes = useStyles(props);
    const imageBaseURL = window.location.protocol + '//' + window.location.host + '/images'

    const [ selectedImage, setSelectedImage ] = useState(props.drinkImage);
    const [ selectedImageViewFile, setSelectedImageViewFile ] = useState(props.drinkImageViewFile);
    const [ selectedImageSelectionFile, setSelectedImageSelectionFile ] = useState(props.drinkImageSelectionFile);
    const [ open, setOpen ] = useState(false);
    const selectedImageElement = useRef();

    const handleOpen = () => {
        setOpen(true);

        setTimeout(() => {
            scrollToSelectedImage();
        });
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false);
        }
    };

    const handleSelectImage = (image) => {
        setSelectedImage(image.name);
        setSelectedImageViewFile(image.view);
        setSelectedImageSelectionFile(image.selection);
    };

    const handleSave = () => {
        props.onSave({
            drinkImage: selectedImage,
            drinkImageViewFile: selectedImageViewFile,
            drinkImageSelectionFile: selectedImageSelectionFile
        });

        setOpen(false);
    };

    const scrollToSelectedImage = () => {
        if (selectedImageElement && selectedImageElement.current) {
            selectedImageElement.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div>
            <div className='drink-image-container'>
                {
                    props.drinkImageViewFile &&
                    <img src={`${imageBaseURL}/${props.drinkImageViewFile}`} alt='Drink vessel' className='drink-image' />
                }
            </div>

            <Button
                onClick={handleOpen}
                variant='outlined'
                color='default'
                size='small'
            >
                EDIT IMAGE
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='xs'
                fullWidth={true}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle className={classes.title}>Select Drink Image</DialogTitle>

                <DialogContent>
                    <div className={classes.content + ' ' + classes.imageList}>
                        {
                            imageLibrary.images.map(image => {
                                return (
                                    <div
                                        key={image.name}
                                        className={classes.imageListItem + (image.name === selectedImage ? ' ' + classes.selectedImage : '')}
                                        onClick={() => handleSelectImage(image)}
                                        ref={image.name === selectedImage ? selectedImageElement : null}
                                    >
                                        <img
                                            src={`${imageBaseURL}/${image.selection}`}
                                            alt={image.alt}
                                            onClick={() => handleSelectImage(image)}
                                        />
                                        <span className={classes.imageLabel} onClick={() => handleSelectImage(image)}>{ image.name }</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                </DialogContent>

                <DialogActions className={classes.dialogActions}>
                    <Button onClick={handleSave} className={classes.defaultButtonColor} variant='outlined' size='small'>
                        Save
                    </Button>
                    <Button onClick={() => handleClose({}, 'cancel')} className={classes.defaultButtonColor} variant='outlined' color='default' size='small'>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ImageSelectorModal;
