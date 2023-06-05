import Recipe from '../models/Recipe';
import Ingredient from '../models/Ingredient';
import {STORAGE_RECIPES} from '../constants/constants';

const imageLibrary = require('../data/images.json');

export const buildRecipe = (data, recipeIndex) => {
    const recipe = new Recipe();
    const imageFileNames = getDrinkImageFileNames(data.drinkImage);
    let ingredient;

    recipe.id = data.id;
    recipe.name = data.name;
    recipe.index = recipeIndex;
    recipe.directions = data.directions;
    recipe.drinkImage = data.drinkImage;
    recipe.backgroundColor = data.backgroundColor;
    recipe.textColor = data.textColor;
    recipe.drinkImageViewFile = imageFileNames.drinkImageViewFile;
    recipe.drinkImageSelectionFile = imageFileNames.drinkImageSelectionFile;

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

export const getRecipes = () => {
    const recipeJSON = localStorage.getItem(STORAGE_RECIPES);
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
    const recipeJSON = localStorage.getItem(STORAGE_RECIPES);
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

    // We don't need to store the drink image file name since we're storing the name of the image itself. The idea is not to store any file
    // names since they could change at some point (e.g. a new format could be chosen).
    delete recipe.drinkImageViewFile;
    delete recipe.drinkImageSelectionFile;

    if (recipeIndex > -1) {
        recipeData.recipes[recipeIndex] = recipe;
    } else {
        if (copied) {
            recipeData.recipes.splice(recipe.index + 1, 0, recipe)
        } else {
            recipeData.recipes.push(recipe);
        }
    }

    localStorage.setItem(STORAGE_RECIPES, JSON.stringify(recipeData));
};

export const getRecipe = (name) => {
    const recipeJSON = localStorage.getItem(STORAGE_RECIPES);
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
    const recipeJSON = localStorage.getItem(STORAGE_RECIPES);
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

        localStorage.setItem(STORAGE_RECIPES, JSON.stringify(recipeData));
    }
};

export const saveRecipes = (recipes) => {
    const recipeJSON = localStorage.getItem(STORAGE_RECIPES);
    let recipeData;

    if (recipeJSON) {
        recipeData = JSON.parse(recipeJSON);

    } else {
        recipeData = {};
    }

    recipeData.recipes = recipes;
    localStorage.setItem(STORAGE_RECIPES, JSON.stringify(recipeData));
};

export const getRecipeData = () => {
    return localStorage.getItem(STORAGE_RECIPES);
};

export const setRecipeData = (recipeData) => {
    localStorage.setItem(STORAGE_RECIPES, JSON.stringify(recipeData));
};

export const getDrinkImageFileNames = (drinkImage) => {
    let imageFileNames = {};

    if (drinkImage) {
        const imageIndex = imageLibrary.images.findIndex(image => image.name === drinkImage);

        if (imageIndex > -1) {
            imageFileNames.drinkImageViewFile = imageLibrary.images[imageIndex].view;
            imageFileNames.drinkImageSelectionFile = imageLibrary.images[imageIndex].selection;
        }
    }

    return imageFileNames
};
