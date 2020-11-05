class Ingredient {
    constructor() {
        this.id = 0;
        this.name = '';
        this.amount = '0';
        this.fractionalAmount = '0';
        this.unit = '0';
        this.qtyDesc = '';
    }

    updateQtyDescription = () => {
        let updatedQtyDesc = '';

        if (this.amount !== '0') {
            updatedQtyDesc = this.amount;
        }

        if (this.fractionalAmount !== '0') {
            if (updatedQtyDesc) {
                updatedQtyDesc += ' ' + this.fractionalAmount;
            } else {
                updatedQtyDesc = this.fractionalAmount;
            }
        }

        if (this.unit !== '0' && updatedQtyDesc) {
            const numericalAmount = parseInt(this.amount);

            if (this.unit === 'dash' && (numericalAmount > 1  || (numericalAmount === 1 && this.fractionalAmount !== '0'))) {
                updatedQtyDesc += ' dashes';
            } else {
                updatedQtyDesc += ' ' + this.unit;
            }
        }

        this.qtyDesc = updatedQtyDesc;
    }
}

export default Ingredient
