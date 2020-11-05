import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import {SortableContainer, SortableElement } from 'react-sortable-hoc';
import ArrayMove from 'array-move';

import RecipeService from '../../services/RecipeService';

const styles = makeStyles({
    recipe: {
        margin: '0 0 8px 0'
    },

    recipeList: {
        backgroundColor: '#f1f1f1',
        padding: '8px',
        '&:last-child': {
            paddingBottom: 0
        }
    },

    recipeLink: {
        paddingTop: '10px',
        paddingBottom: '10px'
    }
});

const RecipeItem = SortableElement(({recipe, classes}) => {
    return (
        <div>
            <div key={recipe.name} className={classes.recipe}>
                <Button
                    component={Link}
                    to={`/recipe/${encodeURIComponent(recipe.name)}`}
                    style={
                        recipe.backgroundColor ?
                            {backgroundColor: recipe.backgroundColor, color: recipe.textColor} :
                            null}
                    className={classes.recipeLink}
                    variant='outlined'
                    color='default'
                    fullWidth={true}
                    disableRipple={true}
                >
                    {recipe.name}
                </Button>
            </div>
        </div>
    );
})

const RecipeList = SortableContainer(({recipes, classes}) => {
    return (
        <div className={classes.recipeList}>
            {
                recipes.map((recipe, index) => {
                    return (
                        <RecipeItem key={`${recipe.name}` + index} index={index} recipe={ recipe } classes={ classes } />
                    )
                })
            }
        </div>
    );
});

const Home = (props) => {
    const classes = styles(props);
    const [ recipes, setRecipes ] = useState(RecipeService.getRecipes());

    const handleSortEnd = ({oldIndex, newIndex}) => {
        const recipesToUpdate = ArrayMove(recipes, oldIndex, newIndex)

        setRecipes(recipesToUpdate);
        RecipeService.saveRecipes(recipesToUpdate);
    }

    return(
        <section>
            {
                recipes.length === 0 ?
                    <div>
                        <p>Welcome to the cocktail keeper.</p>
                        <p>Select the add recipe button in the upper-right to get started.</p>
                    </div> :
                    <div>
                        <RecipeList pressDelay={200} recipes={recipes} classes={classes} onSortEnd={handleSortEnd} />
                    </div>
            }
        </section>
    );
}

export default Home;
