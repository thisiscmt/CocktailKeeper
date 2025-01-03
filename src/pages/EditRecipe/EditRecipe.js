import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Divider, List, ListItem, ThemeProvider, TextField } from '@mui/material';
import { AddCircleOutlineRounded } from '@mui/icons-material';
import { makeStyles } from 'tss-react/mui';
import cloneDeep from 'lodash/cloneDeep';

import QtyModal from '../../components/QtyModal/QtyModal';
import ColorSelectorModal from '../../components/ColorSelectorModal/ColorSelectorModal';
import ImageSelectorModal from '../../components/ImageSelectorModal/ImageSelectorModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import Recipe from '../../models/Recipe';
import Ingredient from '../../models/Ingredient';
import * as RecipeService from '../../services/recipeService';
import * as SharedService from '../../services/sharedService';
import * as ThemeService from '../../services/themeService';

const useStyles = makeStyles()(() => ({
    mainContainer: {
        flex: 1,
        padding: '16px'
    },

    topControls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },

    bottomControls: {
        marginTop: '12px'
    },

    addLabel: {
        marginLeft: '10px',
        marginTop: '3px',
        textTransform: 'initial'
    },

    ingredient: {
        alignItems: 'center',
        gap: '10px',
        padding: 0
    },

    ingredientName: {
        flexGrow: 2,
        marginTop: '5px'
    },

    newIngredient: {
        padding: 0,
        paddingTop: '2px'
    },

    editImage: {
        marginBottom: '12px'
    },

    changeBackgroundColor: {
        marginTop: '12px',
        marginBottom: '12px'
    }
}));

const EditRecipe = (props) => {
    const { classes, cx } = useStyles(props);
    const navigate = useNavigate();
    const params = useParams();
    const recipeName = params.recipeName ? decodeURIComponent(params.recipeName) : '';

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
        return ThemeService.buildThemeConfig(recipe);
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

    const handleAddIngredient = () => {
        const newRecipe = cloneDeep(recipe);
        const ingredient = new Ingredient();
        const settings = SharedService.getPreferences();

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

        const newTheme = ThemeService.buildThemeConfig(newRecipe);

        setRecipe(newRecipe);
        setTheme(newTheme);
    }

    const handleSaveImage = (imageData) => {
        const newRecipe = cloneDeep(recipe);

        newRecipe.drinkImage = imageData.drinkImage;
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

    const handleCancel = () => {
        doNavigation('Cancel');
    };

    const handleDelete = () => {
        RecipeService.deleteRecipe(recipe.id);
        navigate('/');
    };

    const doNavigation = (action) => {
        if (mode === 'Edit') {
            if (action === 'Save') {
                navigate(`/recipe/${encodeURIComponent(recipe.name)}`);
            } else {
                navigate(`/recipe/${encodeURIComponent(recipeName)}`);
            }
        } else {
            navigate('/');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='sm' disableGutters={true} className={cx(classes.mainContainer)} data-testid='EditRecipeMainContainer'>
                {
                    recipe ?
                        <form onSubmit={handleSubmit} autoComplete='on'>
                            <div className={cx(classes.topControls)}>
                                <Button type='submit' variant='outlined' color='primary' size='small'>
                                    Save
                                </Button>
                                <Button variant='outlined' color='primary' size='small' onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>

                            <Divider variant='fullWidth' className='divider' />

                            <TextField
                                autoComplete='recipeName'
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
                                data-testid='EditRecipeDrinkNameInput'
                            />

                            <List disablePadding={true}>
                                {
                                    recipe.ingredients.map((ingredient) => {
                                        return (
                                            <ListItem key={ingredient.id} className={cx(classes.ingredient)}>
                                                <QtyModal
                                                    ingredient={ingredient}
                                                    textColor={recipe.textColor}
                                                    onSave={handleSaveIngredientQty}
                                                    onDelete={handleDeleteIngredient}
                                                />

                                                <TextField
                                                    className={cx(classes.ingredientName)}
                                                    placeholder='Ingredient'
                                                    margin='dense'
                                                    variant='outlined'
                                                    name='description'
                                                    value={ingredient.name}
                                                    size='small'
                                                    onChange={(event) => {
                                                        handleChangeIngredientName(ingredient.id, event.target.value);}
                                                    }
                                                />
                                            </ListItem>
                                        );
                                    })
                                }

                                <ListItem className={cx(classes.newIngredient)}>
                                    <Button className='app-link' onClick={handleAddIngredient}>
                                        <AddCircleOutlineRounded color='primary' />
                                        <span className={cx(classes.addLabel)}>Add Ingredient</span>
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

                            <div className={cx(classes.editImage)}>
                                <ImageSelectorModal
                                    drinkImage={recipe.drinkImage}
                                    textColor={recipe.textColor}
                                    onSave={handleSaveImage}
                                />
                            </div>

                            <Divider variant='fullWidth' />

                            <div className={cx(classes.changeBackgroundColor)}>
                                <ColorSelectorModal colorCode={recipe.backgroundColor} onSave={handleSaveBackgroundColor} textColor={recipe.textColor} />
                            </div>

                            {
                                mode === 'Edit' &&
                                <div>
                                    <Divider variant='fullWidth' className='divider' />

                                    <div className={cx(classes.bottomControls)}>
                                        <DeleteConfirmationModal onDelete={handleDelete} textColor={recipe.textColor} />
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
        </ThemeProvider>
    )
}

export default EditRecipe;
