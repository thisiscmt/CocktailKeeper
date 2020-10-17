import React from 'react';
import Button from '@material-ui/core/Button';

import RecipeService from '../../services/RecipeService';
import {createStyles, withStyles} from '@material-ui/core/styles';

const styles = createStyles({
    recipeContainer: {
        paddingBottom: '8px'
    },

    recipe: {
        paddingLeft: '8px',
        paddingTop: '8px',
        paddingRight: '8px'
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: RecipeService.getRecipes()
        };
    };

    handleViewRecipe = (recipe) => {
        this.props.history.push('/recipe/' + encodeURIComponent(recipe.name));
    };

    render() {
        const { classes } = this.props;
        const { recipes } = this.state;

        return (
            <section>
                {
                    recipes.length === 0 ?
                        <div>
                            <p>Welcome to the cocktail keeper.</p>
                            <p>Click the add recipe button in the upper-right to get started.</p>
                        </div> :
                        <div className={classes.recipeContainer}>
                            {
                                recipes.map(recipe => {
                                    return (
                                        <div key={recipe.name} className={classes.recipe}>
                                            <Button
                                                style={
                                                    recipe.backgroundColor ?
                                                        { backgroundColor: recipe.backgroundColor, color: recipe.textColor } :
                                                        null}
                                                onClick={() => {this.handleViewRecipe(recipe)}}
                                                variant='outlined'
                                                color='default'
                                                fullWidth={true}
                                            >
                                                { recipe.name }
                                            </Button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </section>
        );
    };
}

export default withStyles(styles)(Home);
