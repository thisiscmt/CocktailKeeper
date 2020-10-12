import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import {createStyles, withStyles} from '@material-ui/core/styles';

import RecipeService from '../../services/RecipeService';

const styles = createStyles({
    root: {
        paddingTop: '5px',
    },

    mainContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    topControls: {
        display: 'flex',
        marginTop: '5px',
        marginBottom: '10px'
    },

    editButton: {
        textAlign: 'right'
    },

    recipeName: {
        fontSize: '18px',
        paddingTop: '8px',
        paddingBottom: '8px'
    },

    qtyDesc: {
        width: '64px'
    }
});

class ViewRecipe extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            recipe: RecipeService.getRecipe(props.match.params.recipeName)
        };
    }

    render() {
        const { classes } = this.props;
        const { recipe } = this.state;

        return (
            <div className={classes.root}>
                <Container maxWidth='sm'>
                    {
                        recipe ?
                        <div>
                            <div className={classes.topControls}>
                                <Button
                                    component={ Link }
                                    to={`/recipe/${encodeURIComponent(recipe.name)}/edit?origin=view`}
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                >
                                    Edit
                                </Button>
                            </div>

                            <Divider variant='fullWidth' className={classes.divider} />

                            <div className={classes.recipeName}>
                                { recipe.name }
                            </div>

                            <div>
                                <List disablePadding={true}>
                                    {
                                        recipe.ingredients.map(ingredient => {
                                            return (
                                                <ListItem key={ingredient.id} className={classes.ingredient}>
                                                    {
                                                        ingredient.qtyDesc ?
                                                        <span className={classes.qtyDesc}>{ ingredient.qtyDesc }</span> :
                                                        ''
                                                    }

                                                    <span>{ ingredient.name }</span>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </div>
                        </div> :
                        <div>
                            <p>
                                The specified recipe could not be found.
                            </p>
                        </div>
                    }

                    <Divider variant='fullWidth' className={classes.divider} />
                </Container>
            </div>
        )}
}

export default withRouter(withStyles(styles)(ViewRecipe));
