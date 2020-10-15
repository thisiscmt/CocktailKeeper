import React from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {createStyles, withStyles} from '@material-ui/core/styles';

import QtyModal from '../../components/QtyModal/QtyModal';
import RecipeService from '../../services/RecipeService';
import Recipe from '../../models/Recipe';
import Ingredient from '../../models/Ingredient';
import ColorSelectorModal from '../../components/ColorSelectorModal/ColorSelectorModal';

const styles = createStyles({
    root: {
        paddingTop: '5px',
        paddingBottom: '6px'
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
        textTransform: 'initial'
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
        marginTop: '16px',
        marginBottom: '10px'
    }
});

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        let recipeName = props.match.params.recipeName;

        if (recipeName) {
            const recipe = RecipeService.getRecipe(recipeName);

            this.state = {
                recipe,
                ingredientCounter: recipe.ingredients.length + 1,
                mode: 'Edit'
            }
        } else {
            this.state = {
                recipe: new Recipe(),
                ingredientCounter: 1,
                mode: 'Add',
            };
        }

        this.state.validationError = false;
    }

    handleChangeName = (event) => {
        event.preventDefault();

        const validationError = event.target.value === '';
        const recipe = this.state.recipe;

        recipe.name = event.target.value;
        this.setState({ recipe, validationError });
    };

    handleAddIngredient = (event) => {
        event.preventDefault();

        const recipe = this.state.recipe;
        const ingredient = new Ingredient();

        ingredient.id = this.state.ingredientCounter;
        recipe.ingredients.push(ingredient);

        this.setState({ recipe, ingredientCounter: this.state.ingredientCounter + 1 });
    };

    handleSaveIngredientQty = (qtyData) => {
        const index = this.state.recipe.ingredients.findIndex(item => {
            return item.id === qtyData.id;
        })

        if (index > -1) {
            const recipe = this.state.recipe;
            const ingredient = new Ingredient();

            ingredient.id = recipe.ingredients[index].id;
            ingredient.name = recipe.ingredients[index].name;
            ingredient.amount = qtyData.amount;
            ingredient.fractionalAmount = qtyData.fractionalAmount;
            ingredient.unit = qtyData.unit;
            ingredient.qtyDesc = qtyData.qtyDesc;

            recipe.ingredients[index] = ingredient;
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

        // TODO
    };

    handleSaveBackgroundColor = (colorData) => {
        const recipe = this.state.recipe;

        recipe.backgroundColor = colorData.colorCode;
        recipe.textColor = colorData.textColorCode;

        this.setState({ recipe });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.recipe.name === '') {
            this.setState({ validationError: true });
            return;
        }

        this.setState({ validationError: false });

        RecipeService.saveRecipe(this.state.recipe);
        this.doNavigation();
    };

    handleCancel = (event) => {
        event.preventDefault();

        this.doNavigation();
    };

    handleDelete = (event) => {
        event.preventDefault();

        // TODO: Add a confirmation prompt

        RecipeService.deleteRecipe(this.state.recipe.name);
        this.props.history.push('/');
    };

    doNavigation = () => {
        if (this.state.mode === 'Edit') {
            this.props.history.push('/recipe/' +  encodeURIComponent(this.state.recipe.name));
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        const { classes } = this.props;
        const { recipe, validationError, mode } = this.state;

        return (
            <div
                className={classes.root}
                style={recipe.backgroundColor ? { backgroundColor: recipe.backgroundColor, color: recipe.textColor} : null}
            >
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

                        <Divider variant='fullWidth' className={classes.divider} />

                        <div>
                            <TextField
                                placeholder='Drink name'
                                margin='dense'
                                variant='outlined'
                                name='recipeName'
                                autoFocus
                                fullWidth= {true}
                                value={recipe.name}
                                size='small'
                                error={validationError}
                                helperText={validationError === true ? 'Name is required' : ''}
                                inputProps={{ maxLength: 50 }}
                                onChange={this.handleChangeName}
                            />
                        </div>

                        <List disablePadding={true}>
                            {
                                recipe.ingredients.map(ingredient => {
                                    return (
                                        <ListItem key={ingredient.id} className={classes.ingredient}>
                                            <QtyModal ingredient={ingredient} onSave={this.handleSaveIngredientQty} />

                                            <TextField
                                                className={classes.ingredientName}
                                                placeholder='Ingredient'
                                                margin='dense'
                                                variant='outlined'
                                                name='description'
                                                value={ingredient.name}
                                                onChange={(event) => {
                                                    this.handleChangeIngredientName(ingredient.id, event.target.value);}
                                                }
                                            />
                                        </ListItem>
                                    )
                                })
                            }

                            <ListItem className={classes.newIngredient}>
                                <Button className='app-link' onClick={this.handleAddIngredient}>
                                    <AddCircleOutlineRoundedIcon color='primary' />
                                    <span className={classes.addLabel}>Add Ingredient</span>
                                </Button>
                            </ListItem>
                        </List>

                        <div>
                            <TextField
                                placeholder='Directions'
                                margin='dense'
                                variant='outlined'
                                name='description'
                                fullWidth= {true}
                                multiline={true}
                                rows={6}
                                value={recipe.directions}
                                size='small'
                                inputProps={{ maxLength: 250 }}
                                onChange={this.handleChangeDirections}
                            />
                        </div>

                        <div className={'drink-image'}>
                            <img href={window.location.protocol + '//' + window.location.host + '/images/rocks.png'} alt={'Vessel image'} />
                        </div>

                        <div className={classes.changeBackgroundColor}>
                            <ColorSelectorModal
                                linkLabel={'CHANGE BACKGROUND COLOR'}
                                colorCode={'#FF0000'}
                                onSave={this.handleSaveBackgroundColor} />
                        </div>

                        {
                            mode === 'Edit' &&
                            <div>
                                <Divider variant='fullWidth' className={classes.divider} />

                                <div className={classes.bottomControls}>
                                    <Button variant='outlined' color='default' size='small' onClick={this.handleDelete}>
                                        Delete Recipe
                                    </Button>
                                </div>
                            </div>
                        }
                    </form>
                </Container>
            </div>
        )
    }
}

export default withRouter(withStyles(styles)(EditRecipe));
