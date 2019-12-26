import React from 'react';
import {withRouter} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {createStyles, withStyles} from "@material-ui/styles";

import RecipeService from "../../services/RecipeService";
import Link from "@material-ui/core/Link";

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

    ingredient: {
        paddingLeft: 0,
        paddingRight: 0
    }

});

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        let id = props.match.params.id;

        this.state = {
            recipe: {
                ingredients: []
            }
        };

        if (id) {
            this.state.recipe = RecipeService.getRecipe(id)
        }
    }

    handleAddIngredient = () => {
        const recipe = this.state.recipe;
        recipe.ingredients.push({
            name: '',
            amount: ''
        });

        this.setState({ recipe });
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
                                            <ListItem>
                                                <span>{row.amount}</span>
                                                <span>{row.name}</span>
                                            </ListItem>
                                        )
                                    })
                                }
                                {
                                    <ListItem className={classes.ingredient}>
                                        <Link className='app-link'>
                                            <AddCircleOutlineRoundedIcon color='primary' />
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
