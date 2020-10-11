import React from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import RecipeService from "../../services/RecipeService";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import {createStyles, withStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {Label} from "@material-ui/icons";

const styles = createStyles({
    // amountSelectors: {
    //     flexBasis: '100%',
    //     height: 0,
    //     margin: 0,
    //     border: 0
    // }

    title: {
        textAlign: 'center'
    },

    content: {
        textAlign: 'center'
    },

    formControl: {
        minWidth: 100
    }
});

class QtyModal extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            open: false,
            amount: this.props.ingredient.amount || '',
            fractionalAmount: this.props.ingredient.fractionalAmount || '',
            unit: this.props.ingredient.unit || ''
        };
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleAmountChange = (event) => {
        this.setState( { amount: event.target.value})
    };

    handleFractionalAmountChange = (event) => {
        this.setState( { fractionalAmount: event.target.value})
    };

    handleUnitChange = (event) => {
        this.setState( { unit: event.target.value})
    };

    handleSave = () => {
        console.log('saving qty info')
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const { open, amount, fractionalAmount, unit } = this.state;

        console.log('amount: %o', amount)
        console.log('fractionalAmount: %o', fractionalAmount)
        console.log('unit: %o', unit)

        return (
            <div>
                <Button
                        onClick={this.handleOpen}
                        className={classes.amountSelector}
                        variant='outlined'
                        color='default'
                        size='medium'>
                    Qty
                </Button>

                <Dialog
                        open={open}
                        onClose={this.handleClose}
                        maxWidth={'xs'}
                        fullWidth={true}
                        disableBackdropClick={true}
                >
                    {/*<DialogTitle className={classes.title}>Qty</DialogTitle>*/}

                    <DialogContent className={classes.content}>
                        <FormControl className={classes.formControl}>
                            <Select value={amount} onChange={this.handleAmountChange}>
                                <MenuItem value=''>- Select amount -</MenuItem>
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
                            <Select value={fractionalAmount} onChange={this.handleFractionalAmountChange}>
                                <MenuItem value={''}>- Select fraction -</MenuItem>
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
                            <Select value={unit} onChange={this.handleUnitChange}>
                                <MenuItem value={''}>- Select unit -</MenuItem>
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
