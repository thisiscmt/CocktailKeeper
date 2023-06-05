import React, { useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable';
import {Button, Card, CardContent, Container, Divider, List, ListItem, MuiThemeProvider} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cloneDeep from 'lodash/cloneDeep';
import * as UUID from 'uuid';

import * as RecipeService from '../../services/recipeService';
import * as ThemeService from '../../services/themeService';

const useStyles = makeStyles({
    mainContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    topControls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '5px',
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
});

const ViewRecipe = (props) => {
    const classes = useStyles(props);
    const history = useHistory();
    const params = useParams();
    const recipeName = decodeURIComponent(params.recipeName);

    const [ recipe, setRecipe ] = useState(RecipeService.getRecipe(recipeName));
    const [ theme, setTheme ] = useState(ThemeService.buildThemeConfig(recipe));

    const swipeConfig = {
        preventDefaultTouchmoveEvent: true
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: (eventData) => handleSwipeLeft(eventData),
        onSwipedRight: (eventData) => handleSwipeRight(eventData),
        ...swipeConfig
    });


    const handleSwipeLeft = (eventData) => {
        const recipes = RecipeService.getRecipes();
        const recipeIndex = recipes.findIndex(item => item.name === recipe.name);
        let newRecipe;

        if (recipeIndex < recipes.length - 1) {
            newRecipe = recipes[recipeIndex + 1];
            setRecipe(newRecipe);
            setTheme(ThemeService.buildThemeConfig(newRecipe));

            history.replace({ pathname: '/recipe/' +  encodeURIComponent(newRecipe.name) });
        }
    };

    const handleSwipeRight = (eventData) => {
        const recipes = RecipeService.getRecipes();
        const recipeIndex = recipes.findIndex(item => item.name === recipe.name);
        let newRecipe;

        if (recipeIndex > 0) {
            newRecipe = recipes[recipeIndex - 1];
            setRecipe(newRecipe);
            setTheme(ThemeService.buildThemeConfig(newRecipe));

            history.replace({ pathname: '/recipe/' +  encodeURIComponent(newRecipe.name) });
        }
    };

    const handleCopy = () => {
        let newRecipe = cloneDeep(recipe);
        let newName = newRecipe.name + ' - Copy';
        let done = false;
        let nameId = 2;

        newRecipe.id = UUID.v4();

        if (RecipeService.getRecipe(newName)) {
            while (!done) {
                if (RecipeService.getRecipe(newName + ' ' + nameId.toString())) {
                    nameId += 1;
                } else {
                    done = true;
                }
            }

            newName = newRecipe.name + ' - Copy ' + nameId.toString();
        }

        newRecipe.name = newName;
        RecipeService.saveRecipe(newRecipe, true);
        newRecipe = RecipeService.getRecipe(newName);

        setRecipe(newRecipe);
        setTheme(ThemeService.buildThemeConfig(newRecipe));
        history.replace({ pathname: '/recipe/' +  encodeURIComponent(newRecipe.name) });
    };

    return (
        <MuiThemeProvider theme={theme}>
            <Container maxWidth='sm' data-testid='ViewRecipeMainContainer'>
                {
                    recipe ?
                        <div {...swipeHandlers}>
                            <div className={classes.topControls}>
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

                            <Card className={classes.recipeName}>
                                <CardContent>
                                    { recipe.name }
                                </CardContent>
                            </Card>

                            <List disablePadding={true}>
                                {
                                    recipe.ingredients.map(ingredient => {
                                        return (
                                            <ListItem key={ingredient.id} className={classes.ingredient}>
                                                {
                                                    ingredient.qtyDesc ?
                                                        <span className={classes.qtyDesc}>{ ingredient.qtyDesc }</span> :
                                                        ''
                                                }

                                                <span>{ ingredient.name }</span>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>

                            <Card className={classes.recipeDirections}>
                                <CardContent>
                                    { recipe.directions }
                                </CardContent>
                            </Card>

                            {
                                recipe.drinkImageViewFile &&
                                <div className='drink-image-container'>
                                    <img
                                        src={window.location.protocol + '//' + window.location.host + '/images/' + recipe.drinkImageViewFile}
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
        </MuiThemeProvider>
    )
}

export default ViewRecipe;
