import React from 'react';
import {withRouter, Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core';
import {createStyles, withStyles} from '@material-ui/core/styles';

import RecipeService from '../../services/RecipeService';

const styles = createStyles({
    root: {
        paddingTop: '5px',
        paddingBottom: '16px'
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
        fontSize: '18px'
    },

    ingredient: {
        fontSize: '14px',
        paddingBottom: 0
    },

    recipeDirections: {
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

class ViewRecipe extends React.Component {
    constructor (props) {
        super(props);

        const recipe = RecipeService.getRecipe(props.match.params.recipeName);
        let theme;

        if (recipe) {
            theme = createMuiTheme({
                palette: {
                    primary: {
                        main: recipe.textColor
                    }
                },
                overrides: {
                    MuiCard: {
                        root: {
                            backgroundColor: recipe.backgroundColor,
                            border: 'none',
                            boxShadow: 'none',
                            color: recipe.textColor
                        }
                    },
                    MuiCardContent: {
                        root: {
                            '&:last-child': {
                                paddingBottom: '16px'
                            }
                        }
                    },
                    MuiList: {
                        root: {
                            color: recipe.textColor
                        }
                    },
                    MuiDivider: {
                        root: {
                            marginTop: '10px',
                            marginBottom: '10px'
                        }
                    }
                }
            });
        } else {
            theme = createMuiTheme({
                palette: {
                    type: 'light'
                },
            });
        }

        this.state = {
            recipe, theme
        };
    };

    render() {
        const { classes } = this.props;
        const { recipe, theme } = this.state;

        console.log('theme: %o', theme);

        return (
            <div className={classes.root} style={recipe.backgroundColor !== '0' ? { backgroundColor: recipe.backgroundColor} : null}>
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
                                    <img src={window.location.protocol + '//' + window.location.host + '/images/rocks.png'} />
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
            </div>
        )}
}

export default withRouter(withStyles(styles)(ViewRecipe));
