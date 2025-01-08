import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable';
import { Button, Card, CardContent, Container, Divider, List, ListItem, ThemeProvider } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import * as UUID from 'uuid';

import * as RecipeService from '../../services/recipeService';
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

    editButton: {
        textAlign: 'right'
    },

    recipeName: {
        fontSize: '18px'
    },

    ingredient: {
        fontSize: '14px',
        paddingBottom: 0,
        paddingLeft: '4px',
        paddingRight: '4px'
    },

    recipeDirections: {
        fontSize: '14px',
        marginBottom: '12px',
        marginTop: '16px',
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'left',
        whiteSpace: 'pre-line'
    },

    qtyDesc: {
        fontSize: '14px',
        fontStyle: 'italic',
        flex: '0 0 75px'
    }
}));

const ViewRecipe = (props) => {
    const { classes, cx } = useStyles(props);
    const navigate = useNavigate();
    const params = useParams();
    const recipeName = decodeURIComponent(params.recipeName);

    const [ recipe, setRecipe ] = useState(RecipeService.getRecipe(recipeName));
    const [ theme, setTheme ] = useState(ThemeService.buildThemeConfig(recipe));

    const imageData = RecipeService.getDrinkImageData(recipe.drinkImage)

    const swipeConfig = {
        preventDefaultTouchmoveEvent: true
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: (eventData) => handleSwipeLeft(eventData),
        onSwipedRight: (eventData) => handleSwipeRight(eventData),
        ...swipeConfig
    });

    const handleSwipeLeft = () => {
        const recipes = RecipeService.getRecipes();
        const recipeIndex = recipes.findIndex(item => item.name === recipe.name);
        let newRecipe;

        if (recipeIndex < recipes.length - 1) {
            newRecipe = recipes[recipeIndex + 1];
            setRecipe(newRecipe);
            setTheme(ThemeService.buildThemeConfig(newRecipe));

            navigate(`/recipe/${encodeURIComponent(newRecipe.name)}`, { replace: true });
        }
    };

    const handleSwipeRight = () => {
        const recipes = RecipeService.getRecipes();
        const recipeIndex = recipes.findIndex(item => item.name === recipe.name);
        let newRecipe;

        if (recipeIndex > 0) {
            newRecipe = recipes[recipeIndex - 1];
            setRecipe(newRecipe);
            setTheme(ThemeService.buildThemeConfig(newRecipe));

            navigate(`/recipe/${encodeURIComponent(newRecipe.name)}`, { replace: true });
        }
    };

    const handleCopy = () => {
        let newRecipe = RecipeService.buildRecipe(recipe);
        let newName = `${newRecipe.name} - Copy`;
        let done = false;
        let nameId = 2;

        newRecipe.id = UUID.v4();

        if (RecipeService.getRecipe(newName)) {
            while (!done) {
                if (RecipeService.getRecipe(`${newName} ${nameId.toString()}`)) {
                    nameId += 1;
                } else {
                    done = true;
                }
            }

            newName = `${newRecipe.name} - Copy ${nameId.toString()}`;
        }

        newRecipe.name = newName;
        RecipeService.saveRecipe(newRecipe, RecipeService.getRecipeIndex(recipe.name));
        newRecipe = RecipeService.getRecipe(newName);

        setRecipe(newRecipe);
        setTheme(ThemeService.buildThemeConfig(newRecipe));
        navigate(`/recipe/${encodeURIComponent(newRecipe.name)}`, { replace: true });
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth='sm' disableGutters={true} className={cx(classes.mainContainer)} data-testid='ViewRecipeMainContainer' >
                {
                    recipe ?
                        <div {...swipeHandlers}>
                            <div className={cx(classes.topControls)}>
                                <Button
                                    component={ Link }
                                    to={`/recipe/${encodeURIComponent(recipe.name)}/edit`}
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                >
                                    Edit
                                </Button>

                                <Button
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                    onClick={handleCopy}
                                >
                                    Copy
                                </Button>
                            </div>

                            <Divider variant='fullWidth' className='divider' />

                            <Card className={cx(classes.recipeName)}>
                                <CardContent>
                                    { recipe.name }
                                </CardContent>
                            </Card>

                            <List disablePadding={true}>
                                {
                                    recipe.ingredients.map(ingredient => {
                                        return (
                                            <ListItem key={ingredient.id} className={cx(classes.ingredient)}>
                                                {
                                                    ingredient.qtyDesc ?
                                                        <span className={cx(classes.qtyDesc)}>{ ingredient.qtyDesc }</span> :
                                                        ''
                                                }

                                                <span>{ ingredient.name }</span>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>

                            <Card className={cx(classes.recipeDirections)}>
                                <CardContent>
                                    { recipe.directions }
                                </CardContent>
                            </Card>

                            {
                                recipe.drinkImage &&
                                <div className='drink-image-container'>
                                    <img
                                        src={`/images/${imageData.drinkImageViewFile}`}
                                        alt='Drink vessel'
                                        className='drink-image'
                                    />
                                </div>
                            }
                        </div> :
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

export default ViewRecipe;
