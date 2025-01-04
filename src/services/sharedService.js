import Recipe from '../models/Recipe';
import Ingredient from '../models/Ingredient';
import * as Constants from '../constants/constants';

export const cloneRecipe = (recipe) => {
    const newRecipe = new Recipe();

    newRecipe.id = recipe.id;
    newRecipe.name = recipe.name;
    newRecipe.index = recipe.index;
    newRecipe.ingredients = [];
    newRecipe.directions = recipe.directions;
    newRecipe.drinkImage = recipe.drinkImage;
    newRecipe.backgroundColor = recipe.backgroundColor;
    newRecipe.textColor = recipe.textColor;

    recipe.ingredients.forEach((ingredient) => {
        const newIngredient = new Ingredient();

        newIngredient.id = ingredient.id;
        newIngredient.name = ingredient.name;
        newIngredient.amount = ingredient.amount;
        newIngredient.fractionalAmount = ingredient.fractionalAmount;
        newIngredient.unit = ingredient.unit;
        newIngredient.qtyDesc = ingredient.qtyDesc;

        newRecipe.ingredients.push(newIngredient);
    });


    return newRecipe;
};

export const getPreferences = () => {
    const preferencesJSON = localStorage.getItem(Constants.STORAGE_PREFERENCES);
    let preferences = {};

    if (preferencesJSON) {
        preferences = JSON.parse(preferencesJSON);
    } else {
        preferences.defaultUnit = '0';
    }

    return preferences;
}

export const getErrorMessage = (error) => {
    let msg = '';

    if (error) {
        if (error.response && typeof error.response.data && typeof error.response.data === 'string') {
            msg = error.response.data;
        } else if (error.response && error.response.statusText) {
            msg = error.response.statusText;
        } else {
            if (error.message) {
                msg = error.message;
            }
            else if (typeof error === 'string') {
                msg = error;
            }
            else {
                msg = 'An unexpected error occurred';
            }
        }
    }

    return msg;
};
