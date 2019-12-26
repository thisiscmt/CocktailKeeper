import React from 'react';
import {withRouter, Link} from "react-router-dom"
import Button from "@material-ui/core/Button";
import {createStyles, withStyles} from "@material-ui/styles";

import RecipeService from "../../services/RecipeService";

const styles = createStyles({
    mainContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    editButton: {
        textAlign: 'right'
    }
});

class ViewRecipe extends React.Component {
    constructor (props) {
        super(props);

        let id = props.match.params.id;

        this.state = {
            recipe: RecipeService.getRecipe(id)
        };
    }

    render() {
        const { classes } = this.props;
        const { recipe } = this.state;

        return (
            <div className={classes.mainContainer}>




                <div className={classes.editButton}>
                    <Button component={ Link } to={`recipe/edit/${recipe.id}`} variant='outlined' color='primary' size='medium'>
                        Edit
                    </Button>
                </div>
            </div>
        )}
}

export default withRouter(withStyles(styles)(ViewRecipe));
