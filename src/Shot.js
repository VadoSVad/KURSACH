class Shot {
    x = null;
    y = null;
    variant = null; //варианты - крестик или когда промахунлись

    constructor(x, y, variant = "miss") {
        Object.assign(this, { x, y, variant });
    }

    setVariant(variant) {
        this.variant = variant;
    }
}