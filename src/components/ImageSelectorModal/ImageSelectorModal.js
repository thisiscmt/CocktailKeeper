import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import { makeStyles } from '@material-ui/core/styles';

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

    imageList: {
        display: 'flex',
        overflow: 'auto',
        paddingBottom: '5px'
    },

    imageListItem: {
        cursor: 'pointer',
        height: 'fit-content',
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
    const classes = styles(props);
    const imageBaseURL = window.location.protocol + '//' + window.location.host + '/images'

    const imageLibrary = [
        {
            name: 'Rocks',
            file: 'rocks.png',
            alt: 'Rocks glass',
            selected: false
        },
        {
            name: 'Cocktail',
            file: 'cocktail.png',
            alt: 'Cocktail glass',
            selected: false
        },
        {
            name: 'Coupe',
            file: 'coupe.png',
            alt: 'Coupe glass',
            selected: false
        },
        {
            name: 'Collins',
            file: 'collins.png',
            alt: 'Collins glass',
            selected: false
        },
        {
            name: 'Flute',
            file: 'flute.png',
            alt: 'Champagne flute',
            selected: false
        },
        {
            name: 'Highball',
            file: 'highball.png',
            alt: 'Highball glass',
            selected: false
        },
        {
            name: 'Irish',
            file: 'irish_coffee.png',
            alt: 'Irish coffee mug',
            selected: false
        }
    ]

    const imageIndex = imageLibrary.findIndex(item => item.file === props.drinkImage );

    if (imageIndex > -1) {
        imageLibrary[imageIndex].selected = true;
    }

    const [ images, setImages ] = useState(imageLibrary);
    const [ selectedImage, setSelectedImage ] = useState(props.drinkImage);
    const [ open, setOpen ] = useState(false);
    const selectedImageElement = useRef();

    const handleOpen = () => {
        setOpen(true);

        setTimeout(() => {
            scrollToSelectedImage();
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectImage = (image) => {
        const newImages = images.map(item => {
            item.selected = false;
            return item;
        });

        const imageIndex = newImages.findIndex(item => item.file === image.file );

        if (imageIndex > -1) {
            newImages[imageIndex].selected = true;
            setSelectedImage(image.file);
            setImages(newImages);
        }
    };

    const handleSave = () => {
        const imageData = {
            drinkImage: selectedImage
        };

        props.onSave(imageData);
        setOpen(false);
    };

    const scrollToSelectedImage = () => {
        if (selectedImageElement && selectedImageElement.current) {
            selectedImageElement.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div>
            <div className={'drink-image-container'}>
                {
                    props.drinkImage &&
                    <img src={`${imageBaseURL}/${props.drinkImage}`} alt={'Drink vessel'} className={'drink-image'} />
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
                maxWidth={'xs'}
                fullWidth={true}
                disableBackdropClick={false}
                classes={{ paper: classes.dialogPaper }}
            >
                <DialogTitle className={classes.title}>Select Drink Image</DialogTitle>

                <DialogContent>
                    <div className={classes.content + ' ' + classes.imageList}>
                        {
                            images.map(image => {
                                return (
                                    <div
                                        key={image.file}
                                        className={classes.imageListItem + (image.selected ? ' ' + classes.selectedImage : '')}
                                        onClick={() => handleSelectImage(image)}
                                        ref={image.selected ? selectedImageElement : null}
                                    >
                                        <img
                                            src={`${imageBaseURL}/${image.file}`}
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
                    <Button onClick={handleSave} className={classes.defaultButtonColor} variant='outlined' size={'small'}>
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

export default ImageSelectorModal;
