import React, { useState } from 'react';
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

    dialogPaper: {
        height : '426px'
    },

    title: {
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    drinkImage: {
        marginBottom: '10px'
    },

    selectedImage: {
        border: '1px solid Gray',
        borderRadius: '5px'
    },

    imageList: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    imageListItem: {
        padding: '8px',
        marginBottom: '10px'
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

    const [ selectedImage, setSelectedImage ] = useState(props.drinkImage);
    const [ open, setOpen ] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    // const handleSelectColor = (event) => {
    //     const selectedColor = event.target.dataset.colorCode;
    //
    //     const selectedColorIndex = colors.findIndex(color => {
    //         return color.colorCode === selectedColor;
    //     })
    //
    //     colors.forEach(color => {
    //         color.selected = false;
    //     })
    //
    //     colors[selectedColorIndex].selected = true
    //     setColors(colors);
    //     setSelectedColor(selectedColor);
    //     setSelectedTextColor(colors[selectedColorIndex].textColorCode);
    // };

    const handleSelectImage = (event) => {
        const imageNameIndex = event.target.src.lastIndexOf('/');
        setSelectedImage(event.target.src.substr(imageNameIndex + 1));
    };

    const handleSave = () => {
        const imageData = {
            drinkImage: selectedImage
        }

        props.onSave(imageData);
        setOpen(false);
    };

    return (
        <div>
            <div className={classes.drinkImage}>
                <img src={`${imageBaseURL}/${props.drinkImage}`} alt={'Drink vessel'} />
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

                <DialogContent className={classes.content + ' ' + classes.imageList}>
                    <img
                        src={`${imageBaseURL}/rocks.png`}
                        alt={'Rocks glass'}
                        className={classes.imageListItem + (selectedImage === 'rocks.png' ? ' ' + classes.selectedImage : '')}
                        onClick={handleSelectImage}
                    />

                    <img
                        src={`${imageBaseURL}/cocktail.png`}
                        alt={'Cocktail glass'}
                        className={classes.imageListItem + (selectedImage === 'cocktail.png' ? ' ' + classes.selectedImage : '')}
                        onClick={handleSelectImage}
                    />

                    <img
                        src={`${imageBaseURL}/coupe.png`}
                        alt={'Coupe glass'}
                        className={classes.imageListItem + (selectedImage === 'coupe.png' ? ' ' + classes.selectedImage : '')}
                        onClick={handleSelectImage}
                    />

                    <img
                        src={`${imageBaseURL}/collins.png`}
                        alt={'Collins glass'}
                        className={classes.imageListItem + (selectedImage === 'collins.png' ? ' ' + classes.selectedImage : '')}
                        onClick={handleSelectImage}
                    />

                    <img
                        src={`${imageBaseURL}/flute.png`}
                        alt={'Champagne flute'}
                        className={classes.imageListItem + (selectedImage === 'flute.png' ? ' ' + classes.selectedImage : '')}
                        onClick={handleSelectImage}
                    />

                    <img
                        src={`${imageBaseURL}/highball.png`}
                        alt={'Highball glass'}
                        className={classes.imageListItem + (selectedImage === 'highball.png' ? ' ' + classes.selectedImage : '')}
                        onClick={handleSelectImage}
                    />

                    <img
                        src={`${imageBaseURL}/irish_coffee.png`}
                        alt={'Irish coffee mug'}
                        className={classes.imageListItem + (selectedImage === 'irish_coffee.png' ? ' ' + classes.selectedImage : '')}
                        onClick={handleSelectImage}
                    />
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
