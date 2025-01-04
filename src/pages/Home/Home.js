import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { arrayMoveImmutable } from 'array-move';

import * as RecipeService from '../../services/recipeService';
import { Colors } from '../../services/themeService';

const useStyles = makeStyles()(() => ({
    mainContainer: {
        backgroundColor: Colors.backgroundGray,
        flex: 1
    },

    recipeList: {
        padding: '8px'
    },

    recipeLink: {
        padding: '10px'
    }
}));

const Home = (props) => {
    const { classes, cx } = useStyles(props);
    const [ recipes, setRecipes] = useState(RecipeService.getRecipes());

    useEffect(() => {
        document.title = 'Cocktail Keeper';
    });

    const handleDragEnd = (result) => {
        if (result && result.destination && result.destination.index > -1) {
            const recipesToUpdate = arrayMoveImmutable(recipes, result.source.index, result.destination.index);

            setRecipes(recipesToUpdate);
            RecipeService.saveRecipes(recipesToUpdate);
        }
    }

    return (
        <Box className={cx(classes.mainContainer)} data-testid='HomeMainContainer'>
            {
                  recipes.length === 0
                    ?
                        <Box>
                            <p>Welcome to the Cocktail Keeper.</p>
                            <p>Select the add recipe button in the upper-right to get started.</p>
                        </Box>
                    :
                        <Box className={cx(classes.recipeList)}>
                            <DragDropContext onDragEnd={handleDragEnd}>
                                <Droppable droppableId='droppable'>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef} {...provided.droppableProps}>
                                            {
                                                recipes.map((recipe, index) => {
                                                    return (
                                                        <Draggable
                                                            key={recipe.name}
                                                            index={index}
                                                            draggableId={recipe.name}
                                                            shouldRespectForcePress={true}
                                                        >
                                                            {(provided, snapshot) => {
                                                                const recipeStyles = {
                                                                    opacity: snapshot.isDragging ? 0.5 : 1,
                                                                    margin: (index === recipes.length - 1) ? 0 : '0 0 8px 0'
                                                                };

                                                                const otherProps = {
                                                                    ...provided.draggableProps,
                                                                    ...provided.dragHandleProps,
                                                                    style: {
                                                                        ...provided.draggableProps.style,
                                                                        ...recipeStyles,
                                                                    },
                                                                };

                                                                return (
                                                                    <>
                                                                        <div key={recipe.name}
                                                                             ref={provided.innerRef}
                                                                             {...otherProps}
                                                                        >
                                                                            <Button
                                                                                component={Link}
                                                                                to={`/recipe/${encodeURIComponent(recipe.name)}`}
                                                                                style={
                                                                                    recipe.backgroundColor ?
                                                                                        {
                                                                                            backgroundColor: recipe.backgroundColor,
                                                                                            color: recipe.textColor,
                                                                                            borderColor: recipe.backgroundColor
                                                                                        } :
                                                                                        null
                                                                                }
                                                                                className={cx(classes.recipeLink)}
                                                                                variant='outlined'
                                                                                color='secondary'
                                                                                fullWidth={true}
                                                                            >
                                                                                {recipe.name}
                                                                            </Button>
                                                                        </div>
                                                                        {provided.placeholder}
                                                                    </>
                                                                );
                                                            }}
                                                        </Draggable>
                                                    )
                                                })
                                            }

                                            { provided.placeholder }
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Box>
            }
        </Box>
    );
}

export default Home;
