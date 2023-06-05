import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import arrayMove from 'array-move';

import * as RecipeService from '../../services/recipeService';

const useStyles = makeStyles({
    recipeList: {
        backgroundColor: '#f0f0f0',
        padding: '8px'
    },

    recipeLink: {
        padding: '10px'
    }
});

const Home = (props) => {
    const classes = useStyles(props);
    const [ recipes, setRecipes] = useState(RecipeService.getRecipes());

    useEffect(() => {
        document.title = 'Cocktail Keeper';
    });

    const handleDragEnd = (result) => {
        if (result && result.destination && result.destination.index > -1) {
            const recipesToUpdate = arrayMove(recipes, result.source.index, result.destination.index);

            setRecipes(recipesToUpdate);
            RecipeService.saveRecipes(recipesToUpdate);
        }
    }

    return(
        <Box data-testid='HomeMainContainer'>
            {
                recipes.length === 0 ?
                <section>
                    <p>Welcome to the cocktail keeper.</p>
                    <p>Select the add recipe button in the upper-right to get started.</p>
                </section> :
                <section className={classes.recipeList}>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="droppable">
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
                                                            <div key={recipe.name}
                                                                 ref={provided.innerRef}
                                                                 {...otherProps}
                                                            >
                                                                <Button
                                                                    component={Link}
                                                                    to={`/recipe/${encodeURIComponent(recipe.name)}`}
                                                                    style={
                                                                        recipe.backgroundColor ?
                                                                        {backgroundColor: recipe.backgroundColor, color: recipe.textColor} :
                                                                        null
                                                                    }
                                                                    className={classes.recipeLink}
                                                                    variant='outlined'
                                                                    color='default'
                                                                    fullWidth={true}
                                                                >
                                                                    {recipe.name}
                                                                </Button>
                                                            </div>
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
                </section>
            }
        </Box>
    );
}

export default Home;
