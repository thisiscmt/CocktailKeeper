import React from 'react';
import Button from "@material-ui/core/Button";

import RecipeService from "../../services/RecipeService";
import Card from "@material-ui/core/Card";

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: RecipeService.getRecipes()
        };
    };

    handleViewRecipe = (recipe) => {
        this.props.history.push('/recipe/' + recipe.id);
    };

    render() {
        const { recipes } = this.state;

        return (
            <section>
                {
                    recipes.length === 0 ?
                        <div>
                            <p>Welcome to the cocktail keeper.</p>
                            <p>Click the add recipe button in the upper-right to get started.</p>
                        </div> :
                        recipes.map(recipe => {
                            return (
                                <Card key={recipe.id}>
                                    { recipe.name }

                                    {/*<Button*/}
                                    {/*    onClick={this.handleViewRecipe(recipe)}*/}
                                    {/*    variant='outlined'*/}
                                    {/*    color='default'*/}
                                    {/*    size='medium'*/}
                                    {/*>*/}
                                    {/*    { recipe.name }*/}
                                    {/*</Button>*/}
                                </Card>
                            )
                        })
                }
            </section>
        );
    };
}

export default Home;
