class Ship {
    size = null;
    direction = null;
    killed = false;
    x = null;
    y = null;

    // спрашивает расположен ли корабль или нет
    get placed(){
        return (this.x !== null && this.y !== null);
    }

    constructor(size, direction){
        this.size = size;
        this.direction = direction;
    }
}