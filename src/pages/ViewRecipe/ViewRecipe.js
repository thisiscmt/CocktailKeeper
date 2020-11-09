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
import clone from 'lodash/clone';
import * as UUID from 'uuid';

import RecipeService from '../../services/RecipeService';
import SharedService from '../../services/SharedService';

const styles = makeStyles({
    mainContainer: {
        display: 'flex',
        justifyContent: 'space-between'
    },

    topControls: {
        display: 'flex',
        justifyContent: 'space-between',
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
        paddingBottom: 0,
        paddingLeft: '4px',
        paddingRight: '4px'
    },

    recipeDirections: {
        fontSize: '14px',
        marginBottom: '12px',
        marginTop: '16px',
        paddingLeft: 0,
        paddingRight: 0,
        textAlign: 'left',
        whiteSpace: 'pre-line'
    },

    qtyDesc: {
        fontSize: '14px',
        fontStyle: 'italic',
        flex: '0 0 75px'
    }
});

const ViewRecipe = (props) => {
    const classes = styles(props);
    const theme = SharedService.buildThemeConfig(RecipeService.getRecipe(props.match.params.recipeName));
    const [ recipe, ] = useState(RecipeService.getRecipe(props.match.params.recipeName));

    const handleCopy = () => {
        const newRecipe = clone(recipe);
        let newName = newRecipe.name + ' - Copy';
        let done = false;
        let nameId = 2;

        newRecipe.id = UUID.v4();

        if (RecipeService.getRecipe(newName)) {
            while (!done) {
                if (RecipeService.getRecipe(newName + ' ' + nameId.toString())) {
                    nameId += 1;
                } else {
                    done = true;
                }
            }

            newName = newRecipe.name + ' - Copy ' + nameId.toString();
        }

        newRecipe.name = newName;
        RecipeService.saveRecipe(newRecipe);
    };

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

                                <Button
                                    variant='outlined'
                                    color='primary'
                                    size='small'
                                    onClick={handleCopy}
                                >
                                    Copy
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

                            <div className={'drink-image-container'}>
                                <img
                                    src={window.location.protocol + '//' + window.location.host + '/images/' + recipe.drinkImage}
                                    alt={'Drink vessel'}
                                    className={'drink-image'}
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
