import React, {useEffect, useState} from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';

import QtyModal from '../../components/QtyModal/QtyModal';
import ColorSelectorModal from '../../components/ColorSelectorModal/ColorSelectorModal';
import ImageSelectorModal from '../../components/ImageSelectorModal/ImageSelectorModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import RecipeService from '../../services/RecipeService';
import SharedService from '../../services/SharedService';
import Recipe from '../../models/Recipe';
import Ingredient from '../../models/Ingredient';

const styles = makeStyles({
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

const EditRecipe = (props) => {
    const classes = styles(props);
    const history = useHistory();
    const recipeName = props.match.params.recipeName ? decodeURIComponent(props.match.params.recipeName) : '';

    const initRecipe = (recipeName) => {
        let recipe;

        if (recipeName) {
            recipe = RecipeService.getRecipe(recipeName);
        } else {
            recipe = new Recipe();
        }

        return recipe;
    }

    const initIngredientCount = (recipe) => {
        let ingredientCounter = 1;

        if (recipe && recipe.name) {
            ingredientCounter = recipe.ingredients.length + 1;
        }

        return ingredientCounter;
    }

    const initMode = (recipe) => {
        let mode = 'Add';

        if (recipe && recipe.name) {
            mode = 'Edit';
        }

        return mode;
    }

    const initTheme = (recipe) => {
        return SharedService.buildThemeConfig(recipe);
    }

    const [ recipe, setRecipe ] = useState(initRecipe(recipeName));
    const [ ingredientCounter, setIngredientCounter ] = useState(initIngredientCount(recipe));
    const [ mode, setMode] = useState(initMode(recipe));
    const [ theme, setTheme ] = useState(initTheme(recipe));

    const [ validationError, setValidationError ] = useState(false);
    const [ validationMsg, setValidationMsg ] = useState('');

    // We need to perform a final render in case the user clicked the Add Recipe button while on the edit page for another recipe, in order to
    // properly initialize the new state
    useEffect(() => {
        const newRecipe = initRecipe(recipeName);

        setRecipe(newRecipe);
        setIngredientCounter(initIngredientCount(newRecipe));
        setMode(initMode(newRecipe));
        setTheme(initTheme(newRecipe));

    }, [recipeName]);

    const handleChangeName = (event) => {
        const newRecipe = cloneDeep(recipe);
        newRecipe.name = event.target.value;

        setRecipe(newRecipe)
        setValidationError(event.target.value === '')
    };

    const handleAddIngredient = (event) => {
        const newRecipe = cloneDeep(recipe);
        const ingredient = new Ingredient();
        const settings = SharedService.getSettings();

        ingredient.id = ingredientCounter;
        ingredient.unit = settings.defaultUnit;
        newRecipe.ingredients.push(ingredient);

        setRecipe(newRecipe);
        setIngredientCounter(ingredientCounter + 1);
    };

    const handleSaveIngredientQty = (qtyData) => {
        const newRecipe = cloneDeep(recipe);
        const ingredientIndex = newRecipe.ingredients.findIndex(item => {
            return item.id === qtyData.id;
        });

        if (ingredientIndex > -1) {
            const ingredient = new Ingredient();

            ingredient.id = newRecipe.ingredients[ingredientIndex].id;
            ingredient.name = newRecipe.ingredients[ingredientIndex].name;
            ingredient.amount = qtyData.amount;
            ingredient.fractionalAmount = qtyData.fractionalAmount;
            ingredient.unit = qtyData.unit;
            ingredient.qtyDesc = qtyData.qtyDesc;

            newRecipe.ingredients[ingredientIndex] = ingredient;
            setRecipe(newRecipe);
        }
    };

    const handleChangeIngredientName = (id, name) => {
        const newRecipe = cloneDeep(recipe);
        const ingredientIndex = newRecipe.ingredients.findIndex(item => {
            return item.id === id;
        });

        if (ingredientIndex > -1) {
            newRecipe.ingredients[ingredientIndex].name = name;
            setRecipe(newRecipe);
        }
    };

    const handleDeleteIngredient = (ingredientId) => {
        const newRecipe = cloneDeep(recipe);
        const ingredientIndex = newRecipe.ingredients.findIndex(item => {
            return item.id === ingredientId;
        });

        if (ingredientIndex > -1) {
            newRecipe.ingredients.splice(ingredientIndex, 1);
            setRecipe(newRecipe);
        }
    };

    const handleChangeDirections = (event) => {
        const newRecipe = cloneDeep(recipe);

        newRecipe.directions = event.target.value;
        setRecipe(newRecipe);
    };

    const handleSaveBackgroundColor = (colorData) => {
        const newRecipe = cloneDeep(recipe);
        newRecipe.backgroundColor = colorData.colorCode;
        newRecipe.textColor = colorData.textColorCode;

        const newTheme = SharedService.buildThemeConfig(newRecipe);

        setRecipe(newRecipe);
        setTheme(newTheme);
    }

    const handleSaveImage = (imageData) => {
        const newRecipe = cloneDeep(recipe);

        newRecipe.drinkImage = imageData.drinkImage;
        newRecipe.drinkImageViewFile = imageData.drinkImageViewFile;
        newRecipe.drinkImageSelectionFile = imageData.drinkImageSelectionFile;
        setRecipe(newRecipe);
    }

    const handleSubmit = (event) => {
        if (recipe.name === '') {
            setValidationMsg('Name is required');
            setValidationError(true);
            event.preventDefault();
            return;
        }

        const existingRecipe = RecipeService.getRecipe(recipe.name);

        if (existingRecipe && existingRecipe.id !== recipe.id) {
            setValidationMsg('Name is already in use');
            setValidationError(true);
            event.preventDefault();
            return;
        }

        setValidationError(false);
        RecipeService.saveRecipe(recipe);
        doNavigation('Save');
    };

    const handleCancel = (event) => {
        doNavigation('Cancel');
    };

    const handleDelete = (event) => {
        RecipeService.deleteRecipe(recipe.id);
        history.push('/');
    };

    const doNavigation = (action) => {
        if (mode === 'Edit') {
            if (action === 'Save') {
                history.push('/recipe/' +  encodeURIComponent(recipe.name));
            } else {
                history.push('/recipe/' +  encodeURIComponent(recipeName));
            }
        } else {
            history.push('/');
        }
    };

    return (
        <MuiThemeProvider theme={theme}>
            <Container maxWidth='sm'>
                {
                    recipe ?
                        <form onSubmit={handleSubmit} autoComplete={'on'}>
                            <div className={classes.topControls}>
                                <Button type='submit' variant='outlined' color='primary' size='small'>
                                    Save
                                </Button>
                                <Button variant='outlined' color='primary' size='small' onClick={handleCancel}>
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
                                onChange={handleChangeName}
                            />

                            <List disablePadding={true}>
                                {
                                    recipe.ingredients.map(ingredient => {
                                        return (
                                            <ListItem key={ingredient.id} className={classes.ingredient}>
                                                <QtyModal
                                                    ingredient={ingredient}
                                                    textColor={recipe.textColor}
                                                    onSave={handleSaveIngredientQty}
                                                    onDelete={handleDeleteIngredient}
                                                />

                                                <TextField
                                                    className={classes.ingredientName}
                                                    placeholder='Ingredient'
                                                    margin='dense'
                                                    variant='outlined'
                                                    name='description'
                                                    value={ingredient.name}
                                                    onChange={(event) => {
                                                        handleChangeIngredientName(ingredient.id, event.target.value);}
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    })
                                }

                                <ListItem className={classes.newIngredient}>
                                    <Button className='app-link' onClick={handleAddIngredient}>
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
                                    rows={8}
                                    value={recipe.directions}
                                    size='small'
                                    inputProps={{ maxLength: 2000 }}
                                    onChange={handleChangeDirections}
                                />
                            </div>

                            <div className={classes.editImage}>
                                <ImageSelectorModal
                                    drinkImage={recipe.drinkImage}
                                    drinkImageViewFile={recipe.drinkImageViewFile}
                                    drinkImageSelectionFile={recipe.drinkImageSelectionFile}
                                    onSave={handleSaveImage}
                                />
                            </div>

                            <Divider variant='fullWidth' className={'divider'} />

                            <div className={classes.changeBackgroundColor}>
                                <ColorSelectorModal colorCode={recipe.backgroundColor} onSave={handleSaveBackgroundColor} />
                            </div>

                            {
                                mode === 'Edit' &&
                                <div>
                                    <Divider variant='fullWidth' className={'divider'} />

                                    <div className={classes.bottomControls}>
                                        <DeleteConfirmationModal onDelete={handleDelete} />
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

export default withRouter(EditRecipe);
