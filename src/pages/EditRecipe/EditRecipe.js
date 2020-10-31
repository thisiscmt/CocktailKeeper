import React, {useState} from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleOutlineRoundedIcon from '@material-ui/icons/AddCircleOutlineRounded';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core';

import QtyModal from '../../components/QtyModal/QtyModal';
import ColorSelectorModal from '../../components/ColorSelectorModal/ColorSelectorModal';
import DeleteConfirmationModal from '../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import RecipeService from '../../services/RecipeService';
import SharedService from '../../services/SharedService';
import Recipe from '../../models/Recipe';
import Ingredient from '../../models/Ingredient';

const styles = makeStyles({
    topControls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '5px',
        marginBottom: '10px'
    },

    bottomControls: {
        marginTop: '10px',
        marginBottom: '10px'
    },

    addLabel: {
        marginLeft: '10px',
        marginTop: '3px',
        textTransform: 'initial'
    },

    ingredient: {
        alignItems: 'center',
        padding: 0
    },

    newIngredient: {
        padding: 0,
        paddingTop: '2px'
    },

    ingredientName: {
        marginLeft: '10px',
        marginTop: '5px',
        width: '100%'
    },

    changeBackgroundColor: {
        marginTop: '16px',
        marginBottom: '10px'
    }
});

const EditRecipe = (props) => {
    const initRecipe = (props) => {
        let recipeName = props.match.params.recipeName;

        if (recipeName) {
            return RecipeService.getRecipe(recipeName);
        } else {
            return new Recipe();
        }
    }

    const classes = styles(props);

    const [ recipe, setRecipe ] = useState(initRecipe(props));
    const [ ingredientCounter, setIngredientCounter ] = useState(recipe ? recipe.ingredients.length + 1 : 1);
    const [ validationError, setValidationError ] = useState(false);
    const [ theme, setTheme ] = useState(SharedService.buildThemeConfig(RecipeService.getRecipe(props.match.params.recipeName)));

    const mode = recipe ? 'Edit' : 'Add';

    const doNavigation = () => {
        if (mode === 'Edit') {
            props.history.push('/recipe/' +  encodeURIComponent(recipe.name));
        } else {
            props.history.push('/');
        }
    }

    const handleChangeName = (event) => {
        event.preventDefault();

        const newRecipe = recipe;
        newRecipe.name = event.target.value;

        setRecipe(newRecipe);
        setValidationError(event.target.value === '');
    };

    const handleAddIngredient = (event) => {
        event.preventDefault();

        const newRecipe = recipe;
        const ingredient = new Ingredient();
        ingredient.id = ingredientCounter;
        newRecipe.ingredients.push(ingredient);

        setRecipe(newRecipe);
        setIngredientCounter(ingredientCounter + 1);
    };

    const handleSaveIngredientQty = (qtyData) => {
        const newRecipe = recipe;
        const index = newRecipe.ingredients.findIndex(item => {
            return item.id === qtyData.id;
        })

        if (index > -1) {
            const ingredient = new Ingredient();

            ingredient.id = newRecipe.ingredients[index].id;
            ingredient.name = newRecipe.ingredients[index].name;
            ingredient.amount = qtyData.amount;
            ingredient.fractionalAmount = qtyData.fractionalAmount;
            ingredient.unit = qtyData.unit;
            ingredient.qtyDesc = qtyData.qtyDesc;

            newRecipe.ingredients[index] = ingredient;
            setRecipe(newRecipe);
        }
    }

    const handleChangeIngredientName = (id, name) => {
        const newRecipe = recipe;
        const index = newRecipe.ingredients.findIndex(item => {
            return item.id === id;
        })

        if (index > -1) {
            newRecipe.ingredients[index].name = name;
            setRecipe(newRecipe);
        }
    };

    const handleChangeDirections = (event) => {
        event.preventDefault();

        const newRecipe = recipe;
        newRecipe.directions = event.target.value;
        setRecipe(newRecipe);
    };

    const handleChangeImage = (event) => {
        event.preventDefault();

        // TODO
    };

    const handleSaveBackgroundColor = (colorData) => {
        const newRecipe = recipe;
        newRecipe.backgroundColor = colorData.colorCode;
        newRecipe.textColor = colorData.textColorCode;

        const newTheme = SharedService.buildThemeConfig(newRecipe);
        setRecipe(newRecipe);
        setTheme(newTheme);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (recipe.name === '') {
            setValidationError(true);
            return;
        }

        setValidationError(false);

        RecipeService.saveRecipe(recipe);
        doNavigation();
    };

    const handleCancel = (event) => {
        event.preventDefault();

        doNavigation();
    };

    const handleDelete = (event) => {
        event.preventDefault();

        RecipeService.deleteRecipe(recipe.name);
        props.history.push('/');
    };

    return (
        <MuiThemeProvider theme={theme}>
            <Container maxWidth='sm'>
                {
                    recipe || mode === 'Add' ?
                        <form onSubmit={handleSubmit} autoComplete={'on'}>
                            <div className={classes.topControls}>
                                <Button type='submit' variant='outlined' color='primary' size='small'>
                                    Save
                                </Button>
                                <Button variant='outlined' color='default' size='small' onClick={handleCancel}>
                                    Cancel
                                </Button>
                            </div>

                            <Divider variant='fullWidth' className={'divider'} />

                            <TextField
                                autoComplete={'recipeName'}
                                placeholder='Drink name'
                                margin='dense'
                                variant='outlined'
                                name='recipeName'
                                autoFocus
                                fullWidth= {true}
                                value={recipe.name}
                                size='small'
                                error={validationError}
                                helperText={validationError === true ? 'Name is required' : ''}
                                inputProps={{ maxLength: 50 }}
                                onChange={handleChangeName}
                            />

                            <List disablePadding={true}>
                                {
                                    recipe.ingredients.map(ingredient => {
                                        return (
                                            <ListItem key={ingredient.id} className={classes.ingredient}>
                                                <QtyModal
                                                    ingredient={ingredient}
                                                    textColor={recipe.textColor}
                                                    onSave={handleSaveIngredientQty}
                                                />

                                                <TextField
                                                    className={classes.ingredientName}
                                                    placeholder='Ingredient'
                                                    margin='dense'
                                                    variant='outlined'
                                                    name='description'
                                                    value={ingredient.name}
                                                    onChange={(event) => {
                                                        handleChangeIngredientName(ingredient.id, event.target.value);}
                                                    }
                                                />
                                            </ListItem>
                                        )
                                    })
                                }

                                <ListItem className={classes.newIngredient}>
                                    <Button className='app-link' onClick={handleAddIngredient}>
                                        <AddCircleOutlineRoundedIcon color='primary' />
                                        <span className={classes.addLabel}>Add Ingredient</span>
                                    </Button>
                                </ListItem>
                            </List>

                            <div>
                                <TextField
                                    placeholder='Directions'
                                    margin='dense'
                                    variant='outlined'
                                    name='description'
                                    fullWidth= {true}
                                    multiline={true}
                                    rows={6}
                                    value={recipe.directions}
                                    size='small'
                                    inputProps={{ maxLength: 250 }}
                                    onChange={handleChangeDirections}
                                />
                            </div>

                            <div className={'drink-image'}>
                                <img
                                    src={window.location.protocol + '//' + window.location.host + '/images/rocks.png'}
                                    alt={'Drink vessel'}
                                />
                            </div>

                            <div className={classes.changeBackgroundColor}>
                                <ColorSelectorModal
                                    linkLabel={'CHANGE BACKGROUND COLOR'}
                                    colorCode={recipe.backgroundColor}
                                    onSave={handleSaveBackgroundColor} />
                            </div>

                            {
                                mode === 'Edit' &&
                                <div>
                                    <Divider variant='fullWidth' className={'divider'} />

                                    <div className={classes.bottomControls}>
                                        <DeleteConfirmationModal onDelete={handleDelete} />
                                    </div>
                                </div>
                            }
                        </form> :
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

export default withRouter(EditRecipe);
