import React, {useState} from 'react';
import { withRouter, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';

import RecipeService from '../../services/RecipeService';
import SharedService from '../../services/SharedService';

const styles = makeStyles({
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
        fontSize: '18px'
    },

    ingredient: {
        fontSize: '14px',
        paddingBottom: 0
    },

    recipeDirections: {
        fontSize: '14px',
        marginTop: '16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        textAlign: 'left',
        whiteSpace: 'pre-line'
    },

    qtyDesc: {
        fontSize: '14px',
        fontStyle: 'italic',
        width: '64px'
    }
});

const ViewRecipe = (props) => {
    const classes = styles(props);
    const theme = SharedService.buildThemeConfig(RecipeService.getRecipe(props.match.params.recipeName));
    const [ recipe, ] = useState(RecipeService.getRecipe(props.match.params.recipeName));

    return (
        <MuiThemeProvider theme={theme}>
            <Container maxWidth='sm'>
                {
                    recipe ?
                        <div>
                            <div className={classes.topControls}>
                                <Button
                                    component={ Link }
                                    to={`/recipe/${encodeURIComponent(recipe.name)}/edit`}
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                >
                                    Edit
                                </Button>
                            </div>

                            <Divider variant='fullWidth' className={'divider'} />

                            <Card className={classes.recipeName}>
                                <CardContent>
                                    { recipe.name }
                                </CardContent>
                            </Card>

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

                            <Card className={classes.recipeDirections}>
                                <CardContent>
                                    { recipe.directions }
                                </CardContent>
                            </Card>

                            <div className={'drink-image'}>
                                <img
                                    src={window.location.protocol + '//' + window.location.host + '/images/rocks.png'}
                                    alt={'Drink vessel'}
                                />
                            </div>
                        </div> :
                        <div>
                            <p>
                                The specified recipe could not be found.
                            </p>
                        </div>
                }
            </Container>
        </MuiThemeProvider>
    )
}

export default withRouter(ViewRecipe);
