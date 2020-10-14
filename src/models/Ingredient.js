class Ingredient {
    constructor() {
        this._id = 0;
        this._name = '';
        this._amount = '0';
        this._fractionalamount = '0';
        this._unit = '0';
        this._qtyDesc = '';
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get amount() {
        return this._amount;
    }

    set amount(value) {
        this._amount = value;
    }

    get fractionalamount() {
        return this._fractionalamount;
    }

    set fractionalamount(value) {
        this._fractionalamount = value;
    }

    get unit() {
        return this._unit;
    }

    set unit(value) {
        this._unit = value;
    }

    get qtyDesc() {
        return this._qtyDesc;
    }

    set qtyDesc(value) {
        this._qtyDesc = value;
    }
}

export default Ingredient
