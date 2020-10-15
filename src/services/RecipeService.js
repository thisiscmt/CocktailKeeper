class RecipeService {
    static getRecipes = () => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipes = [];

        if (recipesJSON) {
            recipes = JSON.parse(recipesJSON);
        }

        console.log('recipes: %o', recipes);

        return recipes;
    }

    static saveRecipe = (recipe) => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipes;

        if (recipesJSON) {
            recipes = JSON.parse(recipesJSON);

            recipeIndex = recipes.findIndex((item) => {
                return item.name === recipe.name;
            });
        } else {
            recipes = [];
        }

        if (recipeIndex > -1) {
            recipes[recipeIndex] = recipe;
        } else {
            recipes.push(recipe);
        }

        localStorage.setItem('ck.recipes', JSON.stringify(recipes));
    };

    static getRecipe = (name) => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipes;
        let recipe;

        if (recipesJSON) {
            recipes = JSON.parse(recipesJSON);

            recipeIndex = recipes.findIndex((item) => {
                return item.name === name;
            });

            recipe = recipes[recipeIndex];
        } else {
            recipe = {};
        }

        return recipe;
    };

    static deleteRecipe = (recipeName) => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipes;

        if (recipesJSON) {
            recipes = JSON.parse(recipesJSON);

            recipeIndex = recipes.findIndex((item) => {
                return item.name === recipeName;
            });

            if (recipeIndex > -1) {
                recipes.splice(recipeIndex, 1);
            }

            localStorage.setItem('ck.recipes', JSON.stringify(recipes));
        }
    }

    static getRecipeData = () => {
        return localStorage.getItem('ck.recipes');
    }
}

export default RecipeService;
