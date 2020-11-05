import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';

import Ingredient from '../../models/Ingredient';
import SharedService from '../../services/SharedService';

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
        justifyContent: 'space-between'
    },

    defaultButtonColor: {
        color: 'black'
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
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        props.onSave(ingredient)

        setQtyDesc(ingredient.qtyDesc);
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
                    disableBackdropClick={false}
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
                                <MenuItem value={'1/3'}>1/3</MenuItem>
                                <MenuItem value={'1/2'}>1/2</MenuItem>
                                <MenuItem value={'2/3'}>2/3</MenuItem>
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
                        <Button onClick={handleSave} className={classes.defaultButtonColor} variant='outlined' size={'small'}>
                            Save
                        </Button>
                        <Button onClick={handleClose} className={classes.defaultButtonColor} variant='outlined' color='default' size='small'>
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </MuiThemeProvider>
    );
}

export default QtyModal;
