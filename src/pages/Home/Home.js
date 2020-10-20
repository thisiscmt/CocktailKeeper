import React from 'react';
import Button from '@material-ui/core/Button';
import {DndProvider, useDrag, useDrop} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import {createStyles, withStyles} from '@material-ui/core/styles';

import RecipeService from '../../services/RecipeService';

const styles = createStyles({
    recipe: {
        margin: '8px'
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);

        let hasTouchSupport = false;

        // Set a flag to determine which backend provider should be used with react-dnd, since there isn't a single one that can handle both
        // types of input effectively (see https://react-dnd.github.io/react-dnd/docs/backends/touch)
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            hasTouchSupport = true;
        }

        // const [{isDragging}, drag] = useDrag({
        //     item: { type: 'recipe', name: 'recipeName' },
        //     end: (item, monitor) => {
        //         const dropResult = monitor.getDropResult();
        //
        //         if (item && dropResult) {
        //             alert(`You dropped ${item.name} into ${dropResult.name}!`);
        //         }
        //     },
        //     collect: monitor => ({
        //         isDragging: !!monitor.isDragging(),
        //     }),
        // })
        //
        // const [{ canDrop, isOver }, drop] = useDrop({
        //     accept: 'recipe',
        //     drop: () => ({ name: 'Dustbin' }),
        //     collect: (monitor) => ({
        //         isOver: monitor.isOver(),
        //         canDrop: monitor.canDrop(),
        //     }),
        // });
        //
        // const opacity = isDragging ? 0.4 : 1;

        this.state = {
            recipes: RecipeService.getRecipes(),
            hasTouchSupport
            // drag,
            // drop,
            // opacity
        };
    };

    handleViewRecipe = (recipe) => {
        this.props.history.push('/recipe/' + encodeURIComponent(recipe.name));
    };

    render() {
        const { classes } = this.props;
        const { recipes, hasTouchSupport, drag, drop, opacity } = this.state;

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
