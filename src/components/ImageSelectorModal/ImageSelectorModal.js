import React, { useRef, useState } from 'react';
import {Button, Dialog, DialogTitle, DialogContent, DialogActions, ThemeProvider} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import * as ThemeService from '../../services/themeService';

const imageLibrary = require('../../data/images.json');

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
}));

const ImageSelectorModal = (props) => {
    const { classes, cx } = useStyles(props);
    const theme = ThemeService.buildThemeConfig();
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
        <ThemeProvider theme={theme}>
            <div className='drink-image-container'>
                {
                    props.drinkImageViewFile &&
                    <img src={`${imageBaseURL}/${props.drinkImageViewFile}`} alt='Drink vessel' className='drink-image' />
                }
            </div>

            <Button
                onClick={handleOpen}
                sx={{
                    color: props.textColor,
                    borderColor: `${props.textColor}7F`,

                    '&:hover': {
                        borderColor: props.textColor
                    }
                }}
                variant='outlined'
                size='small'

            >
                EDIT IMAGE
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth='xs'
                fullWidth={true}
            >
                <DialogTitle className={cx(classes.title)}>Select Drink Image</DialogTitle>

                <DialogContent>
                    <div className={`${cx(classes.content)} ${cx(classes.imageList)}`}>
                        {
                            imageLibrary.images.map(image => {
                                return (
                                    <div
                                        key={image.name}
                                        className={cx(classes.imageListItem) + (image.name === selectedImage ? ' ' + cx(classes.selectedImage) : '')}
                                        onClick={() => handleSelectImage(image)}
                                        ref={image.name === selectedImage ? selectedImageElement : null}
                                    >
                                        <img
                                            src={`${imageBaseURL}/${image.selection}`}
                                            alt={image.alt}
                                            onClick={() => handleSelectImage(image)}
                                        />
                                        <span className={cx(classes.imageLabel)} onClick={() => handleSelectImage(image)}>{ image.name }</span>
                                    </div>
                                )
                            })
                        }
                    </div>
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
        </ThemeProvider>
    );
}

export default ImageSelectorModal;
