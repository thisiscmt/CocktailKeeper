import React from 'react';
import {withRouter, Link} from "react-router-dom"
import Button from "@material-ui/core/Button";
import {createStyles, withStyles} from '@material-ui/core/styles';

import RecipeService from "../../services/RecipeService";
import Container from "@material-ui/core/Container";
import Divider from "@material-ui/core/Divider";

const styles = createStyles({
    mainContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    topControls: {
        display: 'flex',
        justifyContent: 'right',
        marginTop: '5px',
        marginBottom: '10px'
    },

    editButton: {
        textAlign: 'right'
    }
});

class ViewRecipe extends React.Component {
    constructor (props) {
        super(props);

        const id = props.match.params.id;

        this.state = {
            recipe: RecipeService.getRecipe(id)
        };
    }

    render() {
        const { classes } = this.props;
        const { recipe } = this.state;

        return (
            <div className={classes.root}>
                <Container maxWidth='sm'>
                    <div className={classes.topControls}>
                        <Button component={ Link } to={`recipe/edit/${recipe.id}`} variant='outlined' color='primary' size='medium'>
                            Edit
                        </Button>
                    </div>

                    <Divider variant="fullWidth" className={classes.divider} />
                </Container>
            </div>
        )}
}

export default withRouter(withStyles(styles)(ViewRecipe));
