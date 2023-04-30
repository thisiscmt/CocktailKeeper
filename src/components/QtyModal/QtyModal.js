import React, { useState } from 'react';
import {Button, Dialog, DialogTitle, DialogContent, FormControl, Select, MenuItem, MuiThemeProvider, DialogActions} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Ingredient from '../../models/Ingredient';
import SharedService from '../../services/sharedService';

const styles = makeStyles({
    title: {
        paddingBottom: '8px',
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    selector: {
        color: 'black',
        width: '150px'
    },

    qtyDesc: {
        fontSize: '14px',
        fontStyle: 'italic',
        width: '75px'
    },

    qtyDescValue: {
        border: 0,
        padding: 0
    },

    dialogActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px'
    },

    defaultButtonColor: {
        color: 'black'
    },

    deleteButton: {
        color: '#DC143C',
        fontSize: '12px'
    }
});

const QtyModal = (props) => {
    const classes = styles(props);
    const theme = SharedService.buildThemeConfig();
    const [ open, setOpen ] = useState(false);
    const [ ingredient, setIngredient ] = useState(props.ingredient);
    const [ qtyDesc, setQtyDesc ] = useState(props.ingredient.qtyDesc);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
            setOpen(false);
        }
    };

    const handleSave = () => {
        props.onSave(ingredient);

        setQtyDesc(ingredient.qtyDesc);
        setOpen(false);
    };

    const handleDelete = () => {
        props.onDelete(ingredient.id);

        setOpen(false);
    };

    const handleAmountChange = (event) => {
        const updatedIngredient = new Ingredient();

        updatedIngredient.id = ingredient.id;
        updatedIngredient.name = ingredient.name;
        updatedIngredient.amount = event.target.value;
        updatedIngredient.fractionalAmount = ingredient.fractionalAmount;
        updatedIngredient.unit = ingredient.unit;
        updatedIngredient.updateQtyDescription();

        setIngredient(updatedIngredient);
    };

    const handleFractionalAmountChange = (event) => {
        const updatedIngredient = new Ingredient();

        updatedIngredient.id = ingredient.id;
        updatedIngredient.name = ingredient.name;
        updatedIngredient.amount = ingredient.amount;
        updatedIngredient.fractionalAmount = event.target.value;
        updatedIngredient.unit = ingredient.unit;
        updatedIngredient.updateQtyDescription();

        setIngredient(updatedIngredient);
    };

    const handleUnitChange = (event) => {
        const updatedIngredient = new Ingredient();

        updatedIngredient.id = ingredient.id;
        updatedIngredient.name = ingredient.name;
        updatedIngredient.amount = ingredient.amount;
        updatedIngredient.fractionalAmount = ingredient.fractionalAmount;
        updatedIngredient.unit = event.target.value;
        updatedIngredient.updateQtyDescription();

        setIngredient(updatedIngredient);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <div>
                <Button
                    onClick={handleOpen}
                    className={ ingredient.qtyDesc ? classes.qtyDesc + ' ' + classes.qtyDescValue : classes.qtyDesc  }
                    style={{ color: props.textColor }}
                    variant='outlined'
                    color='default'
                    size='medium'
                >
                    { qtyDesc ? qtyDesc : 'Qty' }
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth={'xs'}
                    fullWidth={true}
                >
                    <DialogTitle className={classes.title}>Quantity</DialogTitle>

                    <DialogContent className={classes.content}>
                        <FormControl>
                            <Select value={ingredient.amount} onChange={handleAmountChange} className={classes.selector}>
                                <MenuItem value='0'>- Select amount -</MenuItem>
                                <MenuItem value={'1'}>1</MenuItem>
                                <MenuItem value={'2'}>2</MenuItem>
                                <MenuItem value={'3'}>3</MenuItem>
                                <MenuItem value={'4'}>4</MenuItem>
                                <MenuItem value={'5'}>5</MenuItem>
                                <MenuItem value={'6'}>6</MenuItem>
                                <MenuItem value={'7'}>7</MenuItem>
                                <MenuItem value={'8'}>8</MenuItem>
                                <MenuItem value={'9'}>9</MenuItem>
                                <MenuItem value={'10'}>10</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogContent className={classes.content}>
                        <FormControl>
                            <Select value={ingredient.fractionalAmount} onChange={handleFractionalAmountChange} className={classes.selector}>
                                <MenuItem value={'0'}>- Select fraction -</MenuItem>
                                <MenuItem value={'1/8'}>1/8</MenuItem>
                                <MenuItem value={'1/4'}>1/4</MenuItem>
                                <MenuItem value={'3/8'}>3/8</MenuItem>
                                <MenuItem value={'1/2'}>1/2</MenuItem>
                                <MenuItem value={'5/8'}>5/8</MenuItem>
                                <MenuItem value={'3/4'}>3/4</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogContent className={classes.content}>
                        <FormControl>
                            <Select value={ingredient.unit} onChange={handleUnitChange} className={classes.selector}>
                                <MenuItem value={'0'}>- Select unit -</MenuItem>
                                <MenuItem value={'oz'}>oz</MenuItem>
                                <MenuItem value={'ml'}>ml</MenuItem>
                                <MenuItem value={'dash'}>dash</MenuItem>
                                <MenuItem value={'tsp'}>tsp</MenuItem>
                                <MenuItem value={'tbsp'}>tbsp</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions className={classes.dialogActions}>
                        <Button
                            onClick={handleSave}
                            className={classes.defaultButtonColor}
                            variant='outlined'
                            size={'small'}
                        >
                            Save
                        </Button>

                        <Button
                            onClick={handleDelete}
                            variant={'text'}
                            className={classes.deleteButton}
                            size='small'
                        >
                            Delete
                        </Button>

                        <Button
                            onClick={handleClose}
                            className={classes.defaultButtonColor}
                            variant='outlined'
                            size='small'
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </MuiThemeProvider>
    );
}

export default QtyModal;
