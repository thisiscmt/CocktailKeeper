import React, { useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom'
import { useSwipeable } from 'react-swipeable';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';
import * as UUID from 'uuid';

import RecipeService from '../../services/RecipeService';
import SharedService from '../../services/SharedService';

const styles = makeStyles({
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
    const classes = styles(props);
    const history = useHistory();
    const params = useParams();
    const recipeName = decodeURIComponent(params.recipeName);

    const [ recipe, setRecipe ] = useState(RecipeService.getRecipe(recipeName));
    const [ theme, setTheme ] = useState(SharedService.buildThemeConfig(recipe));

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
            setTheme(SharedService.buildThemeConfig(newRecipe));

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
            setTheme(SharedService.buildThemeConfig(newRecipe));

            history.replace({ pathname: '/recipe/' +  encodeURIComponent(newRecipe.name) });
        }
    };

    const handleCopy = () => {
        const newRecipe = cloneDeep(recipe);
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
        RecipeService.saveRecipe(newRecipe);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <Container maxWidth='sm'>
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

                            <Divider variant='fullWidth' className={'divider'} />

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
                                <div className={'drink-image-container'}>
                                    <img
                                        src={window.location.protocol + '//' + window.location.host + '/images/' + recipe.drinkImageViewFile}
                                        alt={'Drink vessel'}
                                        className={'drink-image'}
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
