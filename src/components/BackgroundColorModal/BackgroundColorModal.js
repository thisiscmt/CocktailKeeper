import {createStyles, withStyles} from '@material-ui/core/styles';
import React from 'react';
import Ingredient from '../../models/Ingredient';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import DialogActions from '@material-ui/core/DialogActions';

const styles = createStyles({
    title: {
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    }

});

class ColorSelectorModal extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false,
            color: this.props.color
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
        const ingredient = new Ingredient();

        ingredient.id = this.state.ingredient.id;
        ingredient.name = this.state.ingredient.name;
        ingredient.amount = event.target.value;
        ingredient.fractionalAmount = this.state.ingredient.fractionalAmount;
        ingredient.unit = this.state.ingredient.unit;

        this.setState({ ingredient });
    };

    handleFractionalAmountChange = (event) => {
        const ingredient = new Ingredient();

        ingredient.id = this.state.ingredient.id;
        ingredient.name = this.state.ingredient.name;
        ingredient.amount = this.state.ingredient.amount;
        ingredient.fractionalAmount = event.target.value;
        ingredient.unit = this.state.ingredient.unit;

        this.setState({ ingredient });
    };

    handleUnitChange = (event) => {
        const ingredient = new Ingredient();

        ingredient.id = this.state.ingredient.id;
        ingredient.name = this.state.ingredient.name;
        ingredient.amount = this.state.ingredient.amount;
        ingredient.fractionalAmount = this.state.ingredient.fractionalAmount;
        ingredient.unit = event.target.value;

        this.setState({ ingredient });
    };

    render() {
        const { classes } = this.props;
        const { open, ingredient } = this.state;

        return (
            <div>
                <Button
                    onClick={this.handleOpen}
                    className={ ingredient.qtyDesc ? classes.qtyDesc : null }
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
                    <DialogTitle className={classes.title}>Quantity</DialogTitle>

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
        );
    };
}

export default withStyles(styles)(ColorSelectorModal);
