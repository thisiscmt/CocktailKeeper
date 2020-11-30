import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDrag, useDrop } from 'react-dnd';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import RecipeService from '../../services/RecipeService';
// import Recipe from '../../models/Recipe';

const styles = makeStyles({
    recipe: {
        margin: '0 0 8px 0'
    },

    recipeList: {
        backgroundColor: '#f0f0f0',
        padding: '8px'
    },

    recipeLink: {
        paddingTop: '10px',
        paddingBottom: '10px'
    }
});

const Home = (props) => {
    const classes = styles(props);
    const [ recipes, setRecipes ] = useState(RecipeService.getRecipes());

    const [{ isDragging }, drag] = useDrag({
        item: { type: 'Recipe', name: 'Recipe' },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();

            if (item && dropResult) {
                console.log(`You dropped ${item} into ${dropResult}`);
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    });

    const [, drop] = useDrop({
        accept: 'Recipe',
        drop: () => ({ name: 'RecipeList' }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    });

    const recipeContainerStyles = {
        opacity: isDragging ? 0.4 : 1,
        border: isDragging ? '1px dashed #d3d3d3' : 'inherit',
        borderRadius: isDragging ? '4px': '0'
    }

    return(
        <section>
            {
                recipes.length === 0 ?
                    <div>
                        <p>Welcome to the cocktail keeper.</p>
                        <p>Select the add recipe button in the upper-right to get started.</p>
                    </div> :
                    <div ref={drop}>
                        {
                            recipes.map(recipe => {
                                return (
                                    <div key={recipe.name}
                                         className={classes.recipe}
                                         ref={drag}
                                         style={ recipe.lastInList ?
                                             { ...recipeContainerStyles, marginBottom: 0 } :
                                             { ...recipeContainerStyles, marginBottom: '8px'}
                                         }
                                    >
                                        <Button
                                            component={Link}
                                            to={`/recipe/${encodeURIComponent(recipe.name)}`}
                                            style={recipe.backgroundColor ? {backgroundColor: recipe.backgroundColor, color: recipe.textColor} : null}
                                            className={classes.recipeLink}
                                            variant='outlined'
                                            color='default'
                                            fullWidth={true}
                                            disableRipple={true}
                                        >
                                            {recipe.name}
                                        </Button>
                                    </div>
                                )
                            })
                        }
                    </div>
            }
        </section>
    );
}

export default Home;
