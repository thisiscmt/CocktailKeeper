import React, { useContext, useState } from 'react';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';

import { Context } from '../../contexts/mainContext.js';
import { AlertSeverity } from '../../enums/AlertSeverity';
import * as RecipeService from '../../services/recipeService';

const useStyles = makeStyles()(() => ({
    mainContainer: {
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '16px',
        paddingTop: '16px'
    },

    section: {
        marginTop: '16px'
    },

    saveIndicator: {
        marginLeft: '8px'
    }
}));

const Clean = (props) => {
    const { classes, cx } = useStyles(props);
    const [ loading, setLoading ] = useState(false);
    const [ , dispatch ] = useContext(Context);
    let recipes = [];

    try {
        recipes = RecipeService.getRecipes();
    } catch (error) {
        dispatch({ type: 'SET_BANNER_MESSAGE', payload: { message: `Error getting cocktail data: ${error}`, severity: AlertSeverity.Error } });
    }

    const lastChangeTimestamp = RecipeService.getFormattedLastChangedTimestamp();
    const infoMsg = recipes.length === 0 ? 'No recipes found' : `Data retrieved contains ${recipes.length} recipes and was last updated ${lastChangeTimestamp}.`

    const handleSubmit = () => {
        const newRecipes = [];

        try {
            setLoading(true);

            recipes.forEach((recipe) => {
                const newRecipe = {
                    id: recipe.id,
                    name: recipe.name,
                    directions: recipe.directions,
                    drinkImage: recipe.drinkImage,
                    ingredients: [...recipe.ingredients],
                    backgroundColor: recipe.backgroundColor,
                    textColor: recipe.textColor
                };

                newRecipes.push(newRecipe);
            });

            RecipeService.saveRecipes(newRecipes);
            dispatch({ type: 'SET_BANNER_MESSAGE', payload: {message: 'Cocktail data cleaned successfully', severity: AlertSeverity.Success} });
        } catch (error) {
            dispatch({ type: 'SET_BANNER_MESSAGE', payload: { message: `Error cleaning data: ${error}`, severity: AlertSeverity.Error } });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box className={cx(classes.mainContainer)}>
            <Box>
                <Typography>{infoMsg}</Typography>
            </Box>

            <Box className={cx(classes.section)}>
                <Typography>Clean this data and re-save?</Typography>
            </Box>

            <Box className={cx(classes.section)}>
                <Button variant='outlined' color='primary' size='small' onClick={handleSubmit} disabled={loading || recipes.length === 0}>
                    Submit
                    {loading && (
                        <CircularProgress size={20} className={cx(classes.saveIndicator)} />
                    )}

                </Button>
            </Box>
        </Box>
    )
}

export default Clean;
