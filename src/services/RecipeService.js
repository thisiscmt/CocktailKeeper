class RecipeService {
    static getRecipes = () => {
        const recipeJSON = localStorage.getItem('ck.recipes');
        let recipeData = {
            recipes: []
        };

        if (recipeJSON) {
            recipeData = JSON.parse(recipeJSON);
        }

        return recipeData.recipes;
    }

    static saveRecipe = (recipe) => {
        const recipeJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipeData;

        if (recipeJSON) {
            recipeData = JSON.parse(recipeJSON);

            recipeIndex = recipeData.recipes.findIndex((item) => {
                return item.name === recipe.name;
            });
        } else {
            recipeData = {
                recipes: []
            };
        }

        if (recipeIndex > -1) {
            recipeData.recipes[recipeIndex] = recipe;
        } else {
            recipeData.recipes.push(recipe);
        }

        localStorage.setItem('ck.recipes', JSON.stringify(recipeData));
    };

    static getRecipe = (name) => {
        const recipeJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipeData;
        let recipe;

        if (recipeJSON) {
            recipeData = JSON.parse(recipeJSON);

            recipeIndex = recipeData.recipes.findIndex((item) => {
                return item.name === name;
            });

            if (recipeIndex > -1) {
                recipe = recipeData.recipes[recipeIndex];
            }
        }

        return recipe;
    };

    static deleteRecipe = (recipeName) => {
        const recipeJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipeData;

        if (recipeJSON) {
            recipeData = JSON.parse(recipeJSON);

            recipeIndex = recipeData.recipes.findIndex((item) => {
                return item.name === recipeName;
            });

            if (recipeIndex > -1) {
                recipeData.recipes.splice(recipeIndex, 1);
            }

            localStorage.setItem('ck.recipes', JSON.stringify(recipeData));
        }
    }

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
    }

    static getRecipeData = () => {
        return localStorage.getItem('ck.recipes');
    }

    static setRecipeData = (data) => {
        localStorage.setItem('ck.recipes', data);
    }
}

export default RecipeService;
