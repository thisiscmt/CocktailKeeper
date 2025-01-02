import Recipe from '../models/Recipe';
import Ingredient from '../models/Ingredient';
import * as Constants from '../constants/constants';

const imageLibrary = require('../data/images.json');

export const buildRecipe = (data, recipeIndex) => {
    const recipe = new Recipe();
    let ingredient;

    recipe.id = data.id;
    recipe.name = data.name;
    recipe.index = recipeIndex;
    recipe.directions = data.directions;
    recipe.drinkImage = data.drinkImage;
    recipe.backgroundColor = data.backgroundColor;
    recipe.textColor = data.textColor;

    recipe.ingredients = data.ingredients.map(item => {
        ingredient = new Ingredient();
        ingredient.id = item.id;
        ingredient.name = item.name;
        ingredient.amount = item.amount;
        ingredient.fractionalAmount = item.fractionalAmount;
        ingredient.unit = item.unit;
        ingredient.qtyDesc = item.qtyDesc;

        return ingredient;
    });

    return recipe;
};

export const getRecipeData = () => {
    return localStorage.getItem(Constants.STORAGE_RECIPES);
};

export const setRecipeData = (recipeData) => {
    localStorage.setItem(Constants.STORAGE_RECIPES, JSON.stringify(recipeData));
    localStorage.setItem(Constants.STORAGE_LAST_CHANGE_TIMESTAMP, new Date().getTime().toString());
};

export const getRecipes = () => {
    const recipeJSON = localStorage.getItem(Constants.STORAGE_RECIPES);
    let recipeData;
    let recipes = [];

    if (recipeJSON) {
        recipeData = JSON.parse(recipeJSON);

        recipes = recipeData.recipes.map((item) => {
            return buildRecipe(item);
        });
    }

    return recipes;
};

export const saveRecipe = (recipe, copied) => {
    const recipeJSON = localStorage.getItem(Constants.STORAGE_RECIPES);
    let recipeIndex = -1;
    let recipeData;

    if (recipeJSON) {
        recipeData = JSON.parse(recipeJSON);

        recipeIndex = recipeData.recipes.findIndex((item) => {
            return item.id === recipe.id;
        });
    } else {
        recipeData = {
            recipes: []
        };
    }

    if (recipeIndex > -1) {
        recipeData.recipes[recipeIndex] = recipe;
    } else {
        if (copied) {
            recipeData.recipes.splice(recipe.index + 1, 0, recipe)
        } else {
            recipeData.recipes.push(recipe);
        }
    }

    localStorage.setItem(Constants.STORAGE_RECIPES, JSON.stringify(recipeData));
    localStorage.setItem(Constants.STORAGE_LAST_CHANGE_TIMESTAMP, new Date().getTime().toString());
};

export const getRecipe = (name) => {
    const recipeJSON = localStorage.getItem(Constants.STORAGE_RECIPES);
    const nameForCompare = name ? name.toLowerCase() : '';
    let recipeIndex = -1;
    let recipeData;
    let recipe;

    if (recipeJSON) {
        recipeData = JSON.parse(recipeJSON);

        recipeIndex = recipeData.recipes.findIndex((item) => {
            return item.name.toLowerCase() === nameForCompare;
        });

        if (recipeIndex > -1) {
            recipe = buildRecipe(recipeData.recipes[recipeIndex], recipeIndex);
        }
    }

    return recipe;
};

export const deleteRecipe = (id) => {
    const recipeJSON = localStorage.getItem(Constants.STORAGE_RECIPES);
    let recipeIndex = -1;
    let recipeData;

    if (recipeJSON) {
        recipeData = JSON.parse(recipeJSON);

        recipeIndex = recipeData.recipes.findIndex((item) => {
            return item.id === id;
        });

        if (recipeIndex > -1) {
            recipeData.recipes.splice(recipeIndex, 1);
        }

        localStorage.setItem(Constants.STORAGE_RECIPES, JSON.stringify(recipeData));
    }
};

export const saveRecipes = (recipes) => {
    const recipeJSON = localStorage.getItem(Constants.STORAGE_RECIPES);
    let recipeData;

    if (recipeJSON) {
        recipeData = JSON.parse(recipeJSON);
    } else {
        recipeData = {};
    }

    recipeData.recipes = recipes;
    localStorage.setItem(Constants.STORAGE_RECIPES, JSON.stringify(recipeData));
};

export const getDrinkImageData = (drinkImage) => {
    let imageData = {
        drinkImageFileName: '',
        drinkImageSelectionFile: ''
    };

    if (drinkImage) {
        const imageIndex = imageLibrary.images.findIndex(image => image.name === drinkImage);

        if (imageIndex > -1) {
            imageData.drinkImageViewFile = imageLibrary.images[imageIndex].view;
            imageData.drinkImageSelectionFile = imageLibrary.images[imageIndex].selection;

        }
    }

    return imageData
};

export const getRecipeCount = () => {
    const recipeJSON = localStorage.getItem(Constants.STORAGE_RECIPES);
    let recipeData;
    let count = 0;

    if (recipeJSON) {
        recipeData = JSON.parse(recipeJSON);
        count = recipeData.recipes.length;
    }

    return count;
};

export const getFormattedLastChangedTimestamp = () => {
    const lastChangeTimestamp = localStorage.getItem(Constants.STORAGE_LAST_CHANGE_TIMESTAMP);
    let lastChangeTimestampFormatted = '';

    if (lastChangeTimestamp) {
        const now = new Date(Number(lastChangeTimestamp));

        const dateOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        const timeOptions = {
            timeZoneName: 'short',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        lastChangeTimestampFormatted = `${new Intl.DateTimeFormat(undefined, dateOptions).format(now)} at ${new Intl.DateTimeFormat(undefined, timeOptions).format(now)}`;
    }

    return lastChangeTimestampFormatted;
};
