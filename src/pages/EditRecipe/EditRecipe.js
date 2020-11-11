import React from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { createStyles, withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';

import QtyModal from '../../components/QtyModal/QtyModal';
import ColorSelectorModal from '../../components/ColorSelectorModal/ColorSelectorModal';
import ImageSelectorModal from '../../components/ImageSelectorModal/ImageSelectorModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import RecipeService from '../../services/RecipeService';
import SharedService from '../../services/SharedService';
import Recipe from '../../models/Recipe';
import Ingredient from '../../models/Ingredient';

const styles = createStyles({
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

    editImage: {
        marginBottom: '10px'
    },

    changeBackgroundColor: {
        marginTop: '10px',
        marginBottom: '10px'
    }
});

class EditRecipe extends React.Component {
    constructor(props) {
        super(props);

        let recipeName = props.match.params.recipeName;
        let recipe;
        let theme;

        if (recipeName) {
            recipe = RecipeService.getRecipe(recipeName);
        }

        theme = SharedService.buildThemeConfig(recipe);

        if (recipe) {
            this.state = {
                recipe,
                ingredientCounter: recipe.ingredients.length + 1,
                mode: 'Edit',
                theme,
                validationError: false,
                validationMsg: ''
            }
        } else {
            recipe = new Recipe();

            this.state = {
                recipe,
                ingredientCounter: 1,
                mode: 'Add',
                theme,
                validationError: false,
                validationMsg: ''
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
        const settings = SharedService.getSettings();

        ingredient.id = this.state.ingredientCounter;
        ingredient.unit = settings.defaultUnit;
        recipe.ingredients.push(ingredient);

        this.setState({ recipe, ingredientCounter: this.state.ingredientCounter + 1 });
    };

    handleSaveIngredientQty = (qtyData) => {
        const index = this.state.recipe.ingredients.findIndex(item => {
            return item.id === qtyData.id;
        });

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
    };

    handleChangeIngredientName = (id, name) => {
        const index = this.state.recipe.ingredients.findIndex(item => {
            return item.id === id;
        });

        if (index > -1) {
            const recipe = this.state.recipe;

            recipe.ingredients[index].name = name;
            this.setState({ recipe });
        }
    };

    handleDeleteIngredient = (ingredient) => {
        const index = this.state.recipe.ingredients.findIndex(item => {
            return item.id === ingredient.id;
        });

        if (index > -1) {
            const recipe = this.state.recipe;

            recipe.ingredients.splice(index, 1);
            this.setState({ recipe });
        }

    };

    handleChangeDirections = (event) => {
        event.preventDefault();

        const recipe = this.state.recipe;
        recipe.directions = event.target.value;

        this.setState({ recipe });
    };

    handleSaveBackgroundColor = (colorData) => {
        const recipe = this.state.recipe;
        recipe.backgroundColor = colorData.colorCode;
        recipe.textColor = colorData.textColorCode;

        const theme = SharedService.buildThemeConfig(recipe);
        this.setState({ recipe, theme });
    }

    handleSaveImage = (imageData) => {
        const recipe = this.state.recipe;
        recipe.drinkImage = imageData.drinkImage;
        recipe.drinkImageFileName = imageData.drinkImageFileName;

        this.setState({ recipe });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.recipe.name === '') {
            this.setState({ validationMsg: 'Name is required', validationError: true });
            return;
        }

        const recipe = RecipeService.getRecipe(this.state.recipe.name);

        if (recipe && recipe.id !== this.state.recipe.id) {
            this.setState({ validationMsg: 'Name is already in use', validationError: true });
            return;
        }

        this.setState({ validationError: false });

        RecipeService.saveRecipe(this.state.recipe);
        this.doNavigation('Save');
    };

    handleCancel = (event) => {
        event.preventDefault();

        this.doNavigation('Cancel');
    };

    handleDelete = (event) => {
        event.preventDefault();

        RecipeService.deleteRecipe(this.state.recipe.id);
        this.props.history.push('/');
    };

    doNavigation = (action) => {
        if (this.state.mode === 'Edit') {
            if (action === 'Save') {
                this.props.history.push('/recipe/' +  encodeURIComponent(this.state.recipe.name));
            } else {
                this.props.history.push('/recipe/' +  encodeURIComponent(this.props.match.params.recipeName));
            }
        } else {
            this.props.history.push('/');
        }
    };

    render() {
        const { classes } = this.props;
        const { recipe, validationError, validationMsg, mode, theme } = this.state;

        return (
            <MuiThemeProvider theme={theme}>
                <Container maxWidth='sm'>
                    {
                        recipe || mode === 'Add' ?
                            <form onSubmit={this.handleSubmit} autoComplete={'on'}>
                                <div className={classes.topControls}>
                                    <Button type='submit' variant='outlined' color='primary' size='small'>
                                        Save
                                    </Button>
                                    <Button variant='outlined' color='primary' size='small' onClick={this.handleCancel}>
                                        Cancel
                                    </Button>
                                </div>

                                <Divider variant='fullWidth' className={'divider'} />

                                <TextField
                                    autoComplete={'recipeName'}
                                    placeholder='Drink name'
                                    margin='dense'
                                    variant='outlined'
                                    name='recipeName'
                                    fullWidth= {true}
                                    value={recipe.name}
                                    size='small'
                                    error={validationError}
                                    helperText={validationError === true ? validationMsg : ''}
                                    inputProps={{ maxLength: 50 }}
                                    onChange={this.handleChangeName}
                                />

                                <List disablePadding={true}>
                                    {
                                        recipe.ingredients.map(ingredient => {
                                            return (
                                                <ListItem key={ingredient.id} className={classes.ingredient}>
                                                    <QtyModal
                                                        ingredient={ingredient}
                                                        textColor={recipe.textColor}
                                                        onSave={this.handleSaveIngredientQty}
                                                        onDelete={this.handleDeleteIngredient}
                                                    />

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

                                <div className={classes.editImage}>
                                    <ImageSelectorModal
                                        drinkImage={recipe.drinkImage}
                                        drinkImageFileName={recipe.drinkImageFileName}
                                        onSave={this.handleSaveImage}
                                    />
                                </div>

                                <Divider variant='fullWidth' className={'divider'} />

                                <div className={classes.changeBackgroundColor}>
                                    <ColorSelectorModal colorCode={recipe.backgroundColor} onSave={this.handleSaveBackgroundColor} />
                                </div>

                                {
                                    mode === 'Edit' &&
                                    <div>
                                        <Divider variant='fullWidth' className={'divider'} />

                                        <div className={classes.bottomControls}>
                                            <DeleteConfirmationModal onDelete={this.handleDelete} />
                                        </div>
                                    </div>
                                }
                            </form> :
                            <div>
                                <p>
                                    The specified recipe could not be found.
                                </p>
                            </div>
                    }
                </Container>
            </MuiThemeProvider>
        )
    }
}

export default withRouter(withStyles(styles)(EditRecipe));
