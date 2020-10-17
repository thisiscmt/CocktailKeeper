class RecipeService {
    static getRecipes = () => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeData = {
            recipes: []
        };

        if (recipesJSON) {
            recipeData = JSON.parse(recipesJSON);
        }

        return recipeData.recipes;
    }

    static saveRecipe = (recipe) => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipeData;

        if (recipesJSON) {
            recipeData = JSON.parse(recipesJSON);

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
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipeData;
        let recipe;

        if (recipesJSON) {
            recipeData = JSON.parse(recipesJSON);

            recipeIndex = recipeData.recipes.findIndex((item) => {
                return item.name === name;
            });

            if (recipeIndex > -1) {
                recipe = recipeData.recipes[recipeIndex];
            }
        } else {
            recipe = {};
        }

        return recipe;
    };

    static deleteRecipe = (recipeName) => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipeData;

        if (recipesJSON) {
            recipeData = JSON.parse(recipesJSON);

            recipeIndex = recipeData.recipes.findIndex((item) => {
                return item.name === recipeName;
            });

            if (recipeIndex > -1) {
                recipeData.recipes.splice(recipeIndex, 1);
            }

            localStorage.setItem('ck.recipes', JSON.stringify(recipeData));
        }
    }

    static getRecipeData = () => {
        return localStorage.getItem('ck.recipes');
    }
}

export default RecipeService;
