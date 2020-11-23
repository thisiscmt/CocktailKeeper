import Recipe from '../models/Recipe';
import Ingredient from '../models/Ingredient';

const imageLibrary = require('../data/images.json');

class RecipeService {
    static getRecipes = () => {
        const recipeJSON = localStorage.getItem('ck.recipes');
        let recipeData;
        let recipes = [];

        if (recipeJSON) {
            recipeData = JSON.parse(recipeJSON);

            recipes = recipeData.recipes.map((item) => {
                return this.buildRecipe(item);
            });
        }

        return recipes;
    };

    static saveRecipe = (recipe) => {
        const recipeJSON = localStorage.getItem('ck.recipes');
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
        delete recipe.drinkImageFileName;

        if (recipeIndex > -1) {
            recipeData.recipes[recipeIndex] = recipe;
        } else {
            recipeData.recipes.push(recipe);
        }

        localStorage.setItem('ck.recipes', JSON.stringify(recipeData));
    };

    static getRecipe = (name) => {
        const recipeJSON = localStorage.getItem('ck.recipes');
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
                recipe = RecipeService.buildRecipe(recipeData.recipes[recipeIndex]);
            }
        }

        return recipe;
    };

    static deleteRecipe = (id) => {
        const recipeJSON = localStorage.getItem('ck.recipes');
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

            localStorage.setItem('ck.recipes', JSON.stringify(recipeData));
        }
    };

    static saveRecipes = (recipes) => {
        const recipeJSON = localStorage.getItem('ck.recipes');
        let recipeData;

        if (recipeJSON) {
            recipeData = JSON.parse(recipeJSON);

        } else {
            recipeData = {};
        }

        recipeData.recipes = recipes;
        localStorage.setItem('ck.recipes', JSON.stringify(recipeData));
    };

    static getRecipeData = () => {
        return localStorage.getItem('ck.recipes');
    };

    static setRecipeData = (data) => {
        localStorage.setItem('ck.recipes', data);
    };

    static buildRecipe = (data) => {
        const recipe = new Recipe();
        let ingredient;

        recipe.id = data.id;
        recipe.name = data.name;
        recipe.directions = data.directions;
        recipe.drinkImage = data.drinkImage;
        recipe.backgroundColor = data.backgroundColor;
        recipe.textColor = data.textColor;

        recipe.drinkImageFileName = RecipeService.getDrinkImageFileName(data.drinkImage);

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

    static getDrinkImageFileName = (drinkImage) => {
        let imageFileName = '';

        if (drinkImage) {
            const imageIndex = imageLibrary.images.findIndex(image => image.name === drinkImage);

            if (imageIndex > -1) {
                imageFileName = imageLibrary.images[imageIndex].file;
            }
        }

        return imageFileName
    }
}

export default RecipeService;
