class RecipeService {
    static getRecipes = () => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipes = [];

        if (recipesJSON) {
            recipes = JSON.parse(recipesJSON);
        }

        console.log('current recipe list: %o', recipes);

        return recipes;
    }

    static saveRecipe = (recipe) => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipes;

        if (recipesJSON) {
            recipes = JSON.parse(recipesJSON);

            recipeIndex = recipes.findIndex((item) => {
                return item.id === recipe.id;
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

    static getRecipe = (id) => {
        const recipesJSON = localStorage.getItem('ck.recipes');
        let recipeIndex = -1;
        let recipes;
        let recipe;

        if (recipesJSON) {
            recipes = JSON.parse(recipesJSON);

            recipeIndex = recipes.findIndex((item) => {
                return item.id === recipe.id;
            });

            recipe = recipes[recipeIndex];
        } else {
            recipe = {};
        }

        return recipe;
    };
}

export default RecipeService;
