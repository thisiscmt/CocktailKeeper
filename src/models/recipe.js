class Recipe {
    constructor() {
        this._name = '';
        this._ingredients = [];
        this._directions = '';
        this._backgroundColor = '';
        this._drinkImage = '';
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get ingredients() {
        return this._ingredients;
    }

    set ingredients(value) {
        this._ingredients = value;
    }

    get directions() {
        return this._directions;
    }

    set directions(value) {
        this._directions = value;
    }

    get backgroundColor() {
        return this._backgroundColor;
    }

    set backgroundColor(value) {
        this._backgroundColor = value;
    }

    get drinkImage() {
        return this._drinkImage;
    }

    set drinkImage(value) {
        this._drinkImage = value;
    }
}

export default Recipe
