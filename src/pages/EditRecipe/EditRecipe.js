import React from 'react';
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from "@material-ui/core/Divider";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {createStyles, withStyles} from '@material-ui/core/styles';
import * as UUID from 'uuid';

import RecipeService from "../../services/RecipeService";
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

    changeBackgroundColor: {
        fontSize: '14px'
    }
});

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        let id = props.match.params.id;

        if (id) {
            this.state.recipe = RecipeService.getRecipe(id)
        } else {
            this.state = {
                recipe: {
                    id: UUID.v4(),
                    name: '',
                    ingredients: [],
                    directions: '',
                    backgroundColor: ''
                },
                ingredientCounter: 1
            };
        }
    }

    handleChangeName = (event) => {
        event.preventDefault();

        const recipe = this.state.recipe;
        recipe.name = event.target.value;

        this.setState({ recipe });
    };

    handleAddIngredient = (event) => {
        event.preventDefault();

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

    handleSaveIngredientQty = (qtyData) => {
        const index = this.state.recipe.ingredients.findIndex(item => {
            return item.id === qtyData.id;
        })

        if (index > -1) {
            const recipe = this.state.recipe;

            recipe.ingredients[index] = { ...qtyData, name: this.state.recipe.ingredients[index].name };
            this.setState({ recipe });
        }
    }

    handleChangeIngredientName = (id, name) => {
        const index = this.state.recipe.ingredients.findIndex(item => {
            return item.id === id;
        })

        if (index > -1) {
            const recipe = this.state.recipe;

            recipe.ingredients[index].name = name;
            this.setState({ recipe });
        }
    };

    handleChangeDirections = (event) => {
        event.preventDefault();

        const recipe = this.state.recipe;
        recipe.directions = event.target.value;

        this.setState({ recipe });
    };

    handleChangeImage = (event) => {
        event.preventDefault();

        console.log('changing image');
    };

    handleChangeBackgroundColor = (event) => {
        event.preventDefault();

        console.log('changing background color');
    };


    handleSubmit = (event) => {
        RecipeService.saveRecipe(this.state.recipe);
        this.props.history.push('/');

        event.preventDefault();
    };

    handleCancel = (event) => {
        event.preventDefault();
        this.props.history.push('/');
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
                                placeholder="Drink name"
                                margin="dense"
                                variant="outlined"
                                name="recipeName"
                                required
                                fullWidth= {true}
                                value={recipe.name}
                                size='small'
                                inputProps={{ maxLength: 50 }}
                                onChange={this.handleChangeName}
                            />
                        </div>

                        <div>
                            <List disablePadding={true}>
                                {
                                    recipe.ingredients.map(ingredient => {
                                        return (
                                            <ListItem key={ingredient.id} className={classes.ingredient}>
                                                <QtyModal ingredient={ingredient} onSave={this.handleSaveIngredientQty} />

                                                <TextField
                                                    className={classes.ingredientName}
                                                    placeholder="Ingredient"
                                                    margin="dense"
                                                    variant="outlined"
                                                    name="description"
                                                    value={ingredient.name}
                                                    onChange={(event) => {
                                                        this.handleChangeIngredientName(ingredient.id, event.target.value);}
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    })
                                }
                                {
                                    <ListItem className={classes.newIngredient}>
                                        <Button className='app-link' onClick={this.handleAddIngredient}>
                                            <AddCircleOutlineRoundedIcon color='primary' />
                                            <span className={classes.addLabel}>Add Ingredient</span>
                                        </Button>
                                    </ListItem>
                                }
                            </List>
                        </div>

                        <div>
                            <TextField
                                placeholder="Directions"
                                margin="dense"
                                variant="outlined"
                                name="description"
                                fullWidth= {true}
                                multiline={true}
                                rows={4}
                                value={recipe.directions}
                                size='small'
                                inputProps={{ maxLength: 250 }}
                                onChange={this.handleChangeDirections}
                            />
                        </div>


                        <div>
                            Drink image
                        </div>

                        <div>
                            <Link component="button" className={classes.changeBackgroundColor} onClick={this.handleChangeBackgroundColor}>
                                Change background color
                            </Link>

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
