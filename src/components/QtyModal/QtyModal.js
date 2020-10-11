import React from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {createStyles, withStyles} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = createStyles({
    title: {
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    selector: {
        width: '150px'
    },

    ingredientQty: {
        border: 0,
        padding: 0,
        fontSize: '12px'
    }
});

class QtyModal extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false,
            ingredient: this.props.ingredient
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleSave = () => {
        const ingredient = this.state.ingredient;
        let qtyDesc = '';

        if (ingredient.amount !== '0') {
            qtyDesc = ingredient.amount;
        }

        if (ingredient.fractionalAmount !== '0') {
            if (qtyDesc) {
                qtyDesc += ' ' + ingredient.fractionalAmount;
            } else {
                qtyDesc = ingredient.fractionalAmount;
            }
        }

        if (ingredient.unit !== '0' && qtyDesc) {
            qtyDesc += ' ' + ingredient.unit;
        }

        ingredient.qtyDesc = qtyDesc;
        this.props.onSave(ingredient)
        this.setState({ open: false });
    };

    handleAmountChange = (event) => {
        this.setState( {
            ingredient: {
                id: this.state.ingredient.id,
                amount: event.target.value,
                fractionalAmount: this.state.ingredient.fractionalAmount,
                unit: this.state.ingredient.unit
            }
        });
    };

    handleFractionalAmountChange = (event) => {
        this.setState( {
            ingredient: {
                id: this.state.ingredient.id,
                amount: this.state.ingredient.amount,
                fractionalAmount: event.target.value,
                unit: this.state.ingredient.unit
            }
        });
    };

    handleUnitChange = (event) => {
        this.setState( {
            ingredient: {
                id: this.state.ingredient.id,
                amount: this.state.ingredient.amount,
                fractionalAmount: this.state.ingredient.fractionalAmount,
                unit: event.target.value
            }
        });
    };

    render() {
        const { classes } = this.props;
        const { open, ingredient } = this.state;

        return (
            <div>
                <Button
                    onClick={this.handleOpen}
                    className={ ingredient.qtyDesc ? classes.ingredientQty : null }
                    variant='outlined'
                    color='default'
                    size='medium'
                >
                    { ingredient.qtyDesc ? ingredient.qtyDesc : 'Qty' }
                </Button>

                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    maxWidth={'xs'}
                    fullWidth={true}
                    disableBackdropClick={false}
                >
                    <DialogTitle className={classes.title}>Qty</DialogTitle>

                    <DialogContent className={classes.content}>
                        <FormControl className={classes.formControl}>
                            <Select value={ingredient.amount} onChange={this.handleAmountChange} className={classes.selector}>
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
                        <FormControl className={classes.formControl}>
                            <Select value={ingredient.fractionalAmount} onChange={this.handleFractionalAmountChange} className={classes.selector}>
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
                        <FormControl className={classes.formControl}>
                            <Select value={ingredient.unit} onChange={this.handleUnitChange} className={classes.selector}>
                                <MenuItem value={'0'}>- Select unit -</MenuItem>
                                <MenuItem value={'oz'}>oz</MenuItem>
                                <MenuItem value={'ml'}>ml</MenuItem>
                                <MenuItem value={'dash'}>dash</MenuItem>
                                <MenuItem value={'tsp'}>tsp</MenuItem>
                                <MenuItem value={'tbsp'}>tbsp</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>

                    <DialogActions className={classes.content}>
                        <Button onClick={this.handleSave}>Save</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(QtyModal);
