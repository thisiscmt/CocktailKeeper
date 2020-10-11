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
        padding: 0
    },

    newIngredient: {
        padding: 0,
        paddingTop: '2px'
    },

    ingredientName: {
        marginLeft: '10px',
        marginTop: '5px',
        width: '100%'
    },
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
            amount: '0',
            fractionalAmount: '0',
            unit: '0',
            qtyDesc: ''
        });

        this.setState({ recipe, ingredientCounter: this.state.ingredientCounter + 1 });
    };

    handleSaveIngredient = (newData) => {
        const index = this.state.recipe.ingredients.findIndex(item => {
            return item.id === newData.id;
        })

        if (index > -1) {
            const recipe = this.state.recipe;

            recipe.ingredients[index] = newData;
            this.setState({ recipe });
        }
    }

    handleSubmit = (event) => {
        console.log('saving recipe');

//        RecipeService.saveRecipe(this.state.recipe);
//        this.props.history.push('/');

        event.preventDefault();
    };

    handleCancel = (event) => {
        this.props.history.push('/');
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
                            <Button variant='outlined' color='default' size='small' onClick={this.handleCancel}>
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
                                                <QtyModal ingredient={ingredient} onSave={this.handleSaveIngredient} />

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
