import React from 'react';
import {withRouter} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Link from "@material-ui/core/Link";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {createStyles, withStyles} from "@material-ui/styles";

import RecipeService from "../../services/RecipeService";

const styles = createStyles({
    root: {
        paddingTop: '5px',
    },

    divider: {
        marginBottom: '5px',
        marginTop: '10px'
    },

    topControls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '5px',
        marginBottom: '10px'
    },

    bottomControls: {
        marginTop: '10px',
        marginBottom: '10px'
    },

    addLabel: {
        marginLeft: '10px'
    },

    newIngredient: {
        borderBottom: '1px solid gray',
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 0
    },

    ingredientQty: {
        borderBottom: '1px solid gray',
        borderRight: '1px solid gray'
    },

    ingredientName: {
        borderBottom: '1px solid gray',
        borderLeft: '1px solid gray'
    }
});

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        let id = props.match.params.id;

        this.state = {
            recipe: {
                ingredients: []
            },
            ingredientCounter: 1
        };

        if (id) {
            this.state.recipe = RecipeService.getRecipe(id)
        }
    }

    handleAddIngredient = () => {
        const recipe = this.state.recipe;

        recipe.ingredients.push({
            id: this.state.ingredientCounter,
            name: '',
            amount: ''
        });

        this.setState({ recipe, ingredientCounter: this.state.ingredientCounter + 1 });
    };

    handleSubmit = (event) => {
        console.log('saving recipe');

//        RecipeService.saveRecipe(this.state.recipe);

        event.preventDefault();
    };

    render() {
        const { classes } = this.props;
        const { recipe } = this.state;

        return (
            <div className={classes.root}>
                <Container maxWidth='sm'>
                    <form onSubmit={this.handleSubmit}>
                        <div className={classes.topControls}>
                            <Button type='submit' variant='outlined' color='primary' size='small'>
                                Save
                            </Button>
                            <Button variant='outlined' color='default' size='small'>
                                Cancel
                            </Button>
                        </div>

                        <Divider variant="fullWidth" className={classes.divider} />

                        <div>
                            <TextField className={`${classes.textStyle}`}
                                       placeholder="Name"
                                       margin="dense"
                                       variant="outlined"
                                       name="recipeName"
                                       fullWidth= {true}
                                       value={recipe.name}
                                       size='small'
                                       inputProps={{ maxLength: 50 }}/>
                        </div>

                        <div>
                            <List disablePadding={true}>
                                {
                                    recipe.ingredients.map(row => {
                                        return (
                                            <ListItem key={row.id}>
                                                <ExpansionPanel>
                                                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} ria-controls="panel1a-content">
                                                        {row.amount} ? {row.amount} : 'Qty'
                                                    </ExpansionPanelSummary>
                                                    <ExpansionPanelDetails>
                                                        Add the dials here
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                                <TextField className={classes.ingredientName}>{row.name}</TextField>
                                            </ListItem>
                                        )
                                    })
                                }
                                {
                                    <ListItem className={classes.newIngredient}>
                                        <Link className='app-link' onClick={() => {
                                            this.handleAddIngredient();
                                        }}>
                                            <AddCircleOutlineRoundedIcon color='primary' />
                                        </Link>
                                        <Link className='app-link' onClick={() => {
                                            this.handleAddIngredient();
                                        }}>
                                            <span className={classes.addLabel}>Add Ingredient</span>
                                        </Link>
                                    </ListItem>
                                }
                            </List>
                        </div>

                        <div>
                            <TextField className={`${classes.textStyle}`}
                                       placeholder="Directions"
                                       margin="dense"
                                       variant="outlined"
                                       name="description"
                                       fullWidth= {true}
                                       multiline={true}
                                       rows={4}
                                       value={recipe.description}
                                       size='small'
                                       inputProps={{ maxLength: 250 }}/>
                        </div>


                        <div>
                            Drink image
                        </div>

                        <div>
                            Background color
                        </div>

                        <div className={classes.bottomControls}>
                            <Button variant='outlined' color='default' size='small'>
                                Delete Recipe
                            </Button>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(EditRecipe));
