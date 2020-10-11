import React from 'react';
import {withRouter} from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// import Link from "@material-ui/core/Link";
// import Select from "@material-ui/core/Select";
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {createStyles, withStyles} from '@material-ui/core/styles';

import RecipeService from "../../services/RecipeService";
// import Card from "@material-ui/core/Card";
// import CardContent from "@material-ui/core/CardContent";
// import Fade from "@material-ui/core/Fade";
// import MenuItem from "@material-ui/core/MenuItem";
import QtyModal from "../../components/QtyModal/QtyModal";

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
        marginLeft: '10px',
        marginTop: '3px',
        textTransform: "initial"
    },

    ingredient: {
        alignItems: 'center',
//        flexWrap: 'wrap',
        padding: 0
    },

    newIngredient: {
        padding: 0,
        paddingTop: '2px'
    },

    // amountSelector: {
    //     minWidth: 'unset'
    // },

    // ingredientQty: {
    //     borderBottom: '1px solid gray',
    //     borderRight: '1px solid gray'
    // },

    ingredientName: {
        marginLeft: '10px',
        marginTop: '5px',
        width: '100%'
    },

    // amountSelectors: {
    //     flexBasis: '100%',
    //     height: 0,
    //     margin: 0,
    //     border: 0
    // }
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
            amount: '',
            fractionalAmount: '',
            unit: ''
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
                            <TextField
                                className={`${classes.textStyle}`}
                                placeholder="Drink name"
                                margin="dense"
                                variant="outlined"
                                name="recipeName"
                                fullWidth= {true}
                                value={recipe.name}
                                size='small'
                                inputProps={{ maxLength: 50 }}
                            />
                        </div>

                        <div>
                            <List disablePadding={true}>
                                {
                                    recipe.ingredients.map(ingredient => {
                                        return (
                                            <ListItem key={ingredient.id} className={classes.ingredient}>
                                                <QtyModal ingredient={ingredient} />

                                                <TextField
                                                        className={classes.ingredientName}
                                                        placeholder="Ingredient"
                                                        margin="dense"
                                                        variant="outlined"
                                                        name="description">
                                                    {ingredient.name}
                                                </TextField>
                                            </ListItem>
                                        )
                                    })
                                }
                                {
                                    <ListItem className={classes.newIngredient}>
                                        <Button className='app-link' onClick={() => { this.handleAddIngredient(); }}>
                                            <AddCircleOutlineRoundedIcon color='primary' />
                                            <span className={classes.addLabel}>Add Ingredient</span>
                                        </Button>
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
