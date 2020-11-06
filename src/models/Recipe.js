import * as UUID from 'uuid'

class Recipe {
    constructor() {
        this.id = UUID.v4();
        this.name = '';
        this.ingredients = [];
        this.directions = '';
        this.drinkImage = '';
        this.backgroundColor = '#FFFFFF';
        this.textColor = '#000000';
    }
}

export default Recipe
