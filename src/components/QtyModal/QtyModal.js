import React, { useState } from 'react';
import {Button, Dialog, DialogTitle, DialogContent, FormControl, Select, MenuItem, ThemeProvider, DialogActions, Box} from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import Ingredient from '../../models/Ingredient';
import * as ThemeService from '../../services/themeService';

const useStyles = makeStyles()(() => ({
    title: {
        paddingBottom: '8px',
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    contentRow: {
        marginBottom: '16px'
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
        padding: '3px 2px 2px 2px',
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
}));

const QtyModal = (props) => {
    const { classes, cx } = useStyles(props);
    const theme = ThemeService.buildThemeConfig(props.recipe);
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
        <ThemeProvider theme={theme}>
            <div>
                <Button
                    onClick={handleOpen}
                    className={ ingredient.qtyDesc ? `${cx(classes.qtyDesc)} ${cx(classes.qtyDescValue)}` : cx(classes.qtyDesc) }
                    sx={{
                        color: props.textColor,
                        borderColor: props.textColor,

                        '&:hover': {
                            borderColor: props.textColor
                        }
                    }}
                    style={{  }}
                    variant='outlined'
                    size='medium'
                >
                    { qtyDesc ? qtyDesc : 'Qty' }
                </Button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth='xs'
                    fullWidth={true}
                >
                    <DialogTitle className={cx(classes.title)}>Quantity</DialogTitle>

                    <DialogContent className={cx(classes.content)}>
                        <Box className={cx(classes.contentRow)}>
                            <FormControl>
                                <Select value={ingredient.amount} variant='standard' onChange={handleAmountChange} className={cx(classes.selector)}>
                                    <MenuItem value='0'>- Select amount -</MenuItem>
                                    <MenuItem value='1'>1</MenuItem>
                                    <MenuItem value='2'>2</MenuItem>
                                    <MenuItem value='3'>3</MenuItem>
                                    <MenuItem value='4'>4</MenuItem>
                                    <MenuItem value='5'>5</MenuItem>
                                    <MenuItem value='6'>6</MenuItem>
                                    <MenuItem value='7'>7</MenuItem>
                                    <MenuItem value='8'>8</MenuItem>
                                    <MenuItem value='9'>9</MenuItem>
                                    <MenuItem value='10'>10</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box className={cx(classes.contentRow)}>
                            <FormControl>
                                <Select value={ingredient.fractionalAmount} variant='standard' onChange={handleFractionalAmountChange} className={cx(classes.selector)}>
                                    <MenuItem value='0'>- Select fraction -</MenuItem>
                                    <MenuItem value='1/8'>1/8</MenuItem>
                                    <MenuItem value='1/4'>1/4</MenuItem>
                                    <MenuItem value='3/8'>3/8</MenuItem>
                                    <MenuItem value='1/2'>1/2</MenuItem>
                                    <MenuItem value='5/8'>5/8</MenuItem>
                                    <MenuItem value='3/4'>3/4</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box>
                            <FormControl>
                                <Select value={ingredient.unit} variant='standard' onChange={handleUnitChange} className={cx(classes.selector)}>
                                    <MenuItem value='0'>- Select unit -</MenuItem>
                                    <MenuItem value='oz'>oz</MenuItem>
                                    <MenuItem value='ml'>ml</MenuItem>
                                    <MenuItem value='dash'>dash</MenuItem>
                                    <MenuItem value='tsp'>tsp</MenuItem>
                                    <MenuItem value='tbsp'>tbsp</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>

                    <DialogActions className={cx(classes.dialogActions)}>
                        <Button
                            onClick={handleSave}
                            className={cx(classes.defaultButtonColor)}
                            variant='outlined'
                            size='small'
                        >
                            Save
                        </Button>

                        <Button
                            onClick={handleDelete}
                            variant='text'
                            className={cx(classes.deleteButton)}
                            size='small'
                        >
                            Delete
                        </Button>

                        <Button
                            onClick={() => handleClose({}, 'cancel')}
                            className={cx(classes.defaultButtonColor)}
                            variant='outlined'
                            size='small'
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </ThemeProvider>
    );
}

export default QtyModal;
